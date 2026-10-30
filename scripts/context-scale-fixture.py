"""Prepare/verify an isolated 1,205-post Jekyll integration fixture, never a publication."""
import argparse
import importlib.util
import json
from pathlib import Path
import sys
import time
from urllib.parse import urlsplit

ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'_context_scale_source'
SITE=ROOT/'_context_scale_site'
COUNT=1205

def prepare():
    for relative in ['_layouts','_research','_drafts','context']:(SOURCE/relative).mkdir(parents=True,exist_ok=True)
    (SOURCE/'_config.yml').write_text('''url: https://example.test
baseurl: ""
timezone: Asia/Seoul
future: false
markdown: kramdown
kramdown:
  input: GFM
collections:
  projects:
    output: true
    permalink: /projects/:name/
  notes:
    output: true
    permalink: /notes/:name/
  research:
    output: true
    permalink: /research/:name/
''',encoding='utf-8')
    (SOURCE/'_layouts/research.html').write_text('<article><div class="prose">{{ content }}</div></article>',encoding='utf-8')
    (SOURCE/'context/index.json').write_bytes((ROOT/'context/index.json').read_bytes())
    for i in range(COUNT):
        ctx={'reviewed_on':'2020-01-01','summary':f'Scale fixture {i}: artifact produced; target unverified.',
             'findings':['Synthetic regression evidence.'],'limits':['Not a real research result.'],'followups':[],
             'keywords':['scale',f'unique-{i:04d}'],'related':[]}
        text='---\nlayout: research\ntitle: "Scale '+str(i)+'"\ndate: 2020-01-01 00:00:00 +0900\ntags: [Research, Scale]\ncontext: '+json.dumps(ctx)+'\n---\n\n'
        text+='## Evidence\n\nSynthetic article '+str(i)+'.\n\n| Case | Result |\n| --- | --- |\n| Output | Unverified |\n\n```python\nrun('+str(i)+')\n```\n'
        if i==0:
            text+='\n<section data-context-appendix="prompts">\n'+''.join('<details><summary>Prompt '+str(n)+'</summary><pre><code>[Positive]\nSynthetic prompt '+str(n)+'</code></pre></details>\n' for n in range(27))+'</section>\n'
        (SOURCE/f'_research/scale-{i:04d}.md').write_text(text,encoding='utf-8')
    for name,extra in [('unpublished','published: false\n'),('future','date: 2099-01-01 00:00:00 +0900\n')]:
        text='---\nlayout: research\ntitle: Excluded\n'+extra+'---\nMust not be exported.\n'
        (SOURCE/f'_research/{name}.md').write_text(text,encoding='utf-8')
    (SOURCE/'_drafts/draft.md').write_text('---\ntitle: Draft\n---\nExcluded draft.',encoding='utf-8')
    print(f'Prepared {COUNT} published fixture articles plus unpublished/future/draft exclusions.')

def verify(commit):
    spec=importlib.util.spec_from_file_location('context_export',ROOT/'scripts/export-context.py')
    module=importlib.util.module_from_spec(spec);sys.modules[spec.name]=module;spec.loader.exec_module(module)
    started=time.perf_counter();index=module.export(SITE,commit)
    assert index['document_count']==COUNT
    url=index['catalogs'][0]['first_page'];docs=[]
    while url:
        page=json.loads((SITE/urlsplit(url).path.lstrip('/')).read_text(encoding='utf-8'))
        assert page['source_commit']==commit and len(page['items'])<=25
        docs.extend(page['items']);url=page['next']
    assert len(docs)==COUNT==len({x['id'] for x in docs})
    assert all('scale-' in x['source_path'] for x in docs)
    assert next(x for x in docs if x['id']=='research-scale-0000')['appendices'][0]['disclosures']==27
    assert any('unique-1204' in x['keywords'] for x in docs)
    assert all(p.stat().st_size<=65536 for p in (SITE/'context').rglob('*.json'))
    for d in docs:
        text=(SITE/'context/posts'/f'{d["id"]}.md').read_text(encoding='utf-8')
        assert module.sha256(text)==d['content_sha256']
    print(json.dumps({'jekyll_scale_documents':COUNT,'root_bytes':(SITE/'context/index.json').stat().st_size,
                      'all_catalog_pages':index['catalogs'][0]['page_count'],'prompt_disclosures':27,
                      'unpublished_future_draft_excluded':True,'export_and_verify_seconds':round(time.perf_counter()-started,3)},sort_keys=True))

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--prepare',action='store_true');parser.add_argument('--sha')
    args=parser.parse_args()
    if args.prepare:prepare()
    elif args.sha:verify(args.sha)
    else:parser.error('Use --prepare or --sha <commit>')
