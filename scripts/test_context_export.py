"""Contract tests for omissions, provenance, visibility and generated-file ownership."""
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest

spec=importlib.util.spec_from_file_location('context_export',Path(__file__).with_name('export-context.py'))
module=importlib.util.module_from_spec(spec);sys.modules[spec.name]=module;spec.loader.exec_module(module)
COMMIT='a'*40

class ContextExportTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory();self.site=Path(self.tmp.name)
        (self.site/'context').mkdir()
        self.item={'source_path':'_research/example.md','kind':'research','url':'/research/example/',
                   'title':'Example','subtitle':'A rendered article','date':'2026-10-01T00:00:00+09:00',
                   'updated':None,'published':True,'tags':['Research'],
                   'context':{'reviewed_on':'2026-10-30','summary':'A documented failed target.',
                              'findings':['A result exists.'],'limits':['Quality is unverified.'],
                              'followups':[],'keywords':['CFG'],'related':[]}}
        self.body='<div class="prose"><h2 id="result">Result</h2><p>A result, not a success claim.</p></div>'
        self.write()
    def tearDown(self): self.tmp.cleanup()
    def write(self,items=None,body=None):
        data={'stage':'jekyll-manifest','site_url':'https://example.test/',
              'generated_at':'2026-10-30T10:00:00+09:00','documents':items if items is not None else [self.item]}
        (self.site/'context/index.json').write_text(json.dumps(data),encoding='utf-8')
        path=self.site/'research/example/index.html';path.parent.mkdir(parents=True,exist_ok=True)
        path.write_text('<nav>Private UI noise</nav>'+(body or self.body)+'<footer>Footer</footer>',encoding='utf-8')
    def run_export(self): return module.export(self.site,COMMIT)
    def test_source_provenance_and_body_only(self):
        result=self.run_export();entry=result['documents'][0]
        text=(self.site/'context/posts/research-example.md').read_text(encoding='utf-8')
        self.assertIn(COMMIT,text);self.assertIn('Result',text)
        self.assertNotIn('Private UI noise',text);self.assertNotIn('Footer',text)
        self.assertEqual(entry['content_sha256'],module.sha256(text))
        self.assertEqual(entry['updated'],None)
    def test_all_27_prompt_disclosures_and_exact_code_survive(self):
        original='A < B & C\nline 2\n```literal fence```'
        import html
        appendix='<section data-context-appendix="prompts">'+''.join('<details><summary>P'+str(i)+'</summary><pre><code>'+html.escape(original)+'</code></pre></details>' for i in range(27))+'</section>'
        self.write(body='<div class="prose"><p>Method</p>'+appendix+'</div>')
        result=self.run_export();entry=result['documents'][0]
        main=(self.site/'context/posts/research-example.md').read_text(encoding='utf-8')
        prompt=(self.site/'context/posts/research-example/prompts.md').read_text(encoding='utf-8')
        self.assertNotIn('literal fence',main);self.assertIn('prompts.md',main)
        self.assertEqual(entry['appendices'][0]['disclosures'],27)
        self.assertEqual(prompt.count(original),27)
        self.assertIn(original,(self.site/'context/all.md').read_text(encoding='utf-8'))
    def test_tables_media_math_and_absolute_urls(self):
        self.write(body='''<div class="prose"><table><tr><th>A</th><th>B</th></tr><tr><td>left|right</td><td>value</td></tr></table>
        <figure><img src="/img/a.png" alt="Figure"><figcaption>00:42 comparison</figcaption></figure>
        <video poster="/img/p.png"><source src="/assets/v.mp4"></video>
        <a href="/notes/other/#x">Other</a><script type="math/tex; mode=display">x_1 + x_2</script></div>''')
        result=self.run_export();text=(self.site/'context/posts/research-example.md').read_text(encoding='utf-8')
        for expected in ['| A | B |','left\\|right','https://example.test/img/a.png','00:42 comparison','https://example.test/assets/v.mp4','https://example.test/notes/other/#x','$$x_1 + x_2$$']:
            self.assertIn(expected,text)
        self.assertEqual([x['kind'] for x in result['documents'][0]['media']],['image','video'])
    def test_expands_details_but_drops_ui_and_scripts(self):
        self.write(body='<div class="prose"><details><summary>Settings<span class="kel-show">SHOW</span><span class="kel-hide">HIDE</span></summary><p>value</p></details><style>BAD CSS</style><script>BAD JS</script></div>')
        self.run_export();text=(self.site/'context/posts/research-example.md').read_text(encoding='utf-8')
        self.assertIn('Settings',text);self.assertIn('value',text)
        for bad in ['SHOW','HIDE','BAD CSS','BAD JS']: self.assertNotIn(bad,text)
    def test_future_and_unpublished_documents_rejected(self):
        for change in [{'published':False},{'date':'2027-01-01T00:00:00+09:00'}]:
            with self.subTest(change=change):
                self.write(items=[self.item|change])
                with self.assertRaises(ValueError):self.run_export()
    def test_drafts_operations_and_path_escape_rejected(self):
        for source in ['_drafts/x.md','docs/PRIVATE.md','_research/../../secret.md']:
            with self.subTest(source=source):
                self.write(items=[self.item|{'source_path':source}])
                with self.assertRaises(ValueError):self.run_export()
    def test_duplicate_documents_and_urls_rejected(self):
        for second in [self.item,self.item|{'source_path':'_research/other.md'}]:
            self.write(items=[self.item,second])
            with self.assertRaises(ValueError):self.run_export()
    def test_missing_summary_and_broken_related_reference_rejected(self):
        for ctx in [self.item['context']|{'summary':''}, self.item['context']|{'related':['/research/missing/']}]:
            self.write(items=[self.item|{'context':ctx}])
            with self.assertRaises(ValueError):self.run_export()
    def test_missing_or_ambiguous_body_rejected(self):
        for body in ['<main>Missing</main>',self.body+self.body]:
            self.write(body=body)
            with self.assertRaises(ValueError):self.run_export()
    def test_duplicate_appendix_marker_rejected(self):
        self.write(body='<div class="prose"><section data-context-appendix="prompts">A</section><section data-context-appendix="prompts">B</section></div>')
        with self.assertRaises(ValueError):self.run_export()
    def test_stale_generated_files_removed_but_other_files_preserved(self):
        self.run_export()
        stale=self.site/'context/posts/old.md';stale.write_text('old')
        other=self.site/'context/posts/notes.txt';other.write_text('keep')
        self.write();self.run_export()
        self.assertFalse(stale.exists());self.assertTrue(other.exists())
    def test_content_change_updates_hash(self):
        first=self.run_export()['documents'][0]['content_sha256']
        self.write(body='<div class="prose"><p>New evidence</p></div>')
        second=self.run_export()['documents'][0]['content_sha256']
        self.assertNotEqual(first,second)
    def test_full_commit_required(self):
        with self.assertRaises(ValueError):module.export(self.site,'main')
    def test_rouge_line_numbers_and_nested_list_code(self):
        self.write(body='<div class="prose"><ol><li>Install<pre class="highlight"><code><table class="rouge-table"><tr><td class="rouge-gutter"><pre class="lineno">1\n2\n</pre></td><td class="rouge-code"><pre>run()\n  indented()</pre></td></tr></table></code></pre></li></ol></div>')
        self.run_export();text=(self.site/'context/posts/research-example.md').read_text(encoding='utf-8')
        self.assertIn('run()\n  indented()',module.fenced_payloads(text))
        self.assertNotIn('1\n2\n',text)

if __name__=='__main__': unittest.main()
