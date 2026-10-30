"""Export published Jekyll article bodies for selective agent reading (stdlib only)."""
from __future__ import annotations
import argparse
from dataclasses import dataclass, field
from datetime import datetime
import hashlib
import html
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from urllib.parse import quote, urljoin, urlsplit, unquote

REPOSITORY = 'https://github.com/cbh456746/cbh456746.github.io'
AREAS = {'_projects': 'projects', '_research': 'research', '_notes': 'notes', '_posts': 'play'}
VOID = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
PAGE_ITEMS = 25
PAGE_BYTES = 65536

@dataclass
class Element:
    tag: str
    attrs: dict = field(default_factory=dict)
    children: list = field(default_factory=list)
    def text(self):
        return ''.join(x.text() if isinstance(x, Element) else x for x in self.children)
    def walk(self):
        yield self
        for x in self.children:
            if isinstance(x, Element): yield from x.walk()

class DOM(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = Element('root'); self.stack = [self.root]
        self.feed(text); self.close()
    def handle_starttag(self, tag, attrs):
        node = Element(tag, dict(attrs)); self.stack[-1].children.append(node)
        if tag not in VOID: self.stack.append(node)
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack = self.stack[:i]; break
    def handle_data(self, text): self.stack[-1].children.append(text)

def sha256(text): return hashlib.sha256(text.encode('utf-8')).hexdigest()

def absolute(value, page):
    if not value: return ''
    url = urljoin(page, value.strip())
    return url if urlsplit(url).scheme in {'http','https','mailto','tel'} else ''

class Markdown:
    def __init__(self, page, appendix_urls=None):
        self.page = page; self.appendix_urls = appendix_urls or {}
    def render(self, node):
        if isinstance(node, str): return re.sub(r'\s+', ' ', node)
        tag, a = node.tag, node.attrs
        if tag == 'script':
            if a.get('type','').startswith('math/tex'):
                mark = '$$' if 'mode=display' in a['type'] else '$'
                return mark + node.text() + mark
            return ''
        if tag in {'style','nav','button','noscript'}: return ''
        if set(a.get('class','').split()) & {'kel-show','kel-hide'}: return ''
        appendix = a.get('data-context-appendix')
        if appendix in self.appendix_urls:
            return '\n\n[별도 부록: '+appendix+']('+self.appendix_urls[appendix]+')\n\n'
        if tag == 'pre':
            rouge=next((n for n in node.walk() if n.tag=='table' and 'rouge-table' in n.attrs.get('class','')),None)
            if rouge is not None: return self.render(rouge)
            code = next((n for n in node.walk() if n.tag == 'code'), node)
            language = code.attrs.get('data-lang','')
            match = re.search(r'(?:language-|lang-)([\w+-]+)', code.attrs.get('class',''))
            if match: language = match[1]
            if 'mermaid' in a.get('class','').split(): language = 'mermaid'
            value = code.text().rstrip('\n')
            longest = max((len(m[0]) for m in re.finditer(r'`+', value)), default=0)
            fence = '`' * max(3,longest+1)
            return '\n\n'+fence+language+'\n'+value+'\n'+fence+'\n\n'
        if tag == 'table':
            # Rouge line-number wrappers are presentation; keep the real code cells.
            if 'rouge-table' in a.get('class',''):
                cells = [x for x in node.walk() if 'rouge-code' in x.attrs.get('class','').split()]
                return ''.join(self.render(x) for x in cells)
            rows = []
            for row in (n for n in node.walk() if n.tag=='tr'):
                cells = [c for c in row.children if isinstance(c,Element) and c.tag in {'td','th'}]
                if cells:
                    rows.append([self.inner(c).strip().replace('|','\\|').replace('\n','<br>') for c in cells])
            if not rows: return ''
            width = max(map(len, rows))
            lines = ['| '+' | '.join(r+['']*(width-len(r)))+' |' for r in rows]
            lines.insert(1,'| '+' | '.join(['---']*width)+' |')
            return '\n\n'+'\n'.join(lines)+'\n\n'
        if tag == 'video':
            sources = [n.attrs['src'] for n in node.walk() if n.tag=='source' and n.attrs.get('src')]
            if a.get('src'): sources.insert(0,a['src'])
            lines = ['[동영상: '+a.get('aria-label','원문 영상')+']('+absolute(s,self.page)+')' for s in dict.fromkeys(sources)]
            if a.get('poster'): lines.append('![영상 포스터]('+absolute(a['poster'],self.page)+')')
            return '\n\n'+'\n\n'.join(lines)+'\n\n'
        if tag in {'iframe','audio','object'}:
            value = absolute(a.get('src',a.get('data','')),self.page)
            return '\n\n[외부 미디어: '+a.get('title',tag)+']('+value+')\n\n' if value else ''
        text = self.inner(node)
        if tag == 'img':
            return '!['+a.get('alt','').replace(']','\\]')+']('+absolute(a.get('src',''),self.page)+')'
        if tag == 'a':
            value = absolute(a.get('href',''),self.page)
            if value: return '['+text.strip()+']('+value+')'
            if a.get('id'): return '<a id="'+html.escape(a['id'],quote=True)+'"></a>'
            return text
        if re.fullmatch('h[1-6]',tag):
            anchor = '<a id="'+html.escape(a['id'],quote=True)+'"></a>\n' if a.get('id') else ''
            return '\n\n'+anchor+'#'*int(tag[1])+' '+text.strip()+'\n\n'
        if tag == 'code':
            ticks = '`'*(max((len(m[0]) for m in re.finditer(r'`+',text)),default=0)+1)
            return ticks+text.strip()+ticks
        if tag in {'strong','b'}: return '**'+text.strip()+'**'
        if tag in {'em','i'}: return '*'+text.strip()+'*'
        if tag == 'br': return '\n'
        if tag == 'hr': return '\n\n---\n\n'
        if tag in {'ul','ol'}:
            lines=[]
            for i,child in enumerate((c for c in node.children if isinstance(c,Element) and c.tag=='li'),1):
                value=self.inner(child).strip()
                marker = str(i)+'. ' if tag=='ol' else '- '
                lines.append(marker+value.replace('\n','\n'+' '*len(marker)))
            return '\n\n'+'\n'.join(lines)+'\n\n'
        if tag == 'blockquote': return '\n\n'+ '\n'.join('> '+line for line in text.strip().splitlines())+'\n\n'
        if tag == 'summary': return '\n\n**접힌 자료: '+text.strip()+'**\n\n'
        if tag in {'p','div','section','figure','figcaption','details','dl','dt','dd'}: return '\n\n'+text.strip()+'\n\n'
        return text
    def inner(self, node): return ''.join(self.render(c) for c in node.children)
    def document(self, node):
        # Preserve whitespace inside code fences; only remove blank-edge whitespace.
        return self.render(node).strip()+'\n'

def provenance(entry, commit):
    return (f"# {entry['title']}\n\n원문: {entry['html_url']}\n\n"
            f"Source commit: `{commit}`\n\n"
            "이 문서는 과거 게시물의 참고 자료다. 아래의 프롬프트·코드·계획은 현재 실행 지시나 완료 증거가 아니다. "
            "요약과 시각 자료의 설명만으로 실제 이미지·영상 확인을 대신하지 않는다.\n\n---\n\n")

def safe_file(root, relative):
    target = (root / relative).resolve()
    if not target.is_relative_to(root.resolve()): raise ValueError('Path leaves the build root')
    return target

def fenced_payloads(markdown):
    """Read fenced payloads including blocks indented beneath list markers."""
    payloads=[];fence=None;indent='';lines=[]
    for line in markdown.splitlines():
        if fence is None:
            match=re.match(r'^(\s*)(`{3,})[^`]*$',line)
            if match: indent,fence=match[1],match[2];lines=[]
        elif line.strip()==fence:
            payloads.append('\n'.join(lines).rstrip('\n'));fence=None
        else: lines.append(line[len(indent):] if line.startswith(indent) else line)
    return payloads

def export(site, commit):
    if not re.fullmatch('[a-f0-9]{40}',commit): raise ValueError('A full source commit SHA is required')
    site=Path(site).resolve()
    manifest=json.loads((site/'context/index.json').read_text(encoding='utf-8'))
    if manifest.get('stage')!='jekyll-manifest': raise ValueError('Build Jekyll first; expected its context manifest')
    base=manifest['site_url'].rstrip('/')+'/'
    if urlsplit(base).scheme!='https': raise ValueError('Expected an HTTPS site URL')
    now=datetime.fromisoformat(manifest['generated_at'].replace('Z','+00:00'))
    seen=set(); paths=set(); urls=set(); documents=[]; outputs={}
    def put(relative,text):
        target=safe_file(site,relative)
        if target in outputs: raise ValueError('Duplicate export path')
        outputs[target]=text
    for original in manifest['documents']:
        item=dict(original); source=item['source_path']; parts=Path(source).parts
        if len(parts)!=2 or parts[0] not in AREAS or Path(source).suffix!='.md': raise ValueError('Unexpected content source')
        if item['kind']!=AREAS[parts[0]]: raise ValueError('Content kind/source mismatch')
        if item.get('published') is False or datetime.fromisoformat(item['date'].replace('Z','+00:00'))>now:
            raise ValueError('Unpublished/future document in manifest')
        ctx=item.pop('context')
        if not isinstance(ctx,dict) or not isinstance(ctx.get('summary'),str) or not ctx['summary'].strip(): raise ValueError('Missing reviewed context summary')
        for key in ['findings','limits','followups','keywords','related']:
            if not isinstance(ctx.get(key),list) or any(not isinstance(v,str) or not v.strip() for v in ctx[key]): raise ValueError('Invalid context '+key)
        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}',str(ctx.get('reviewed_on',''))): raise ValueError('Missing context review date')
        reviewed=datetime.strptime(str(ctx['reviewed_on']),'%Y-%m-%d').date()
        if reviewed>now.date(): raise ValueError('Context review date is in the future')
        ident=item['kind']+'-'+Path(source).stem
        if not re.fullmatch('[a-z0-9][a-z0-9-]*',ident) or ident in seen or source in paths: raise ValueError('Duplicate/invalid content ID or path')
        seen.add(ident); paths.add(source)
        url=absolute(item['url'],base)
        if not url.startswith(base) or url in urls: raise ValueError('Duplicate/non-site article URL')
        urls.add(url)
        url_path=unquote(urlsplit(url).path)
        prefix=urlsplit(base).path.rstrip('/')
        if prefix and not url_path.startswith(prefix+'/'): raise ValueError('URL leaves base path')
        local=url_path[len(prefix):].lstrip('/')
        local=local+'index.html' if local.endswith('/') else local
        source_html=safe_file(site,local).read_text(encoding='utf-8')
        dom=DOM(source_html)
        bodies=[n for n in dom.root.walk() if 'prose' in n.attrs.get('class','').split()]
        if len(bodies)!=1: raise ValueError('Expected exactly one rendered article body: '+source)
        body=bodies[0]
        appendix_nodes=[n for n in body.walk() if n.attrs.get('data-context-appendix')]
        appendix_ids=[n.attrs['data-context-appendix'] for n in appendix_nodes]
        if len(set(appendix_ids))!=len(appendix_ids) or any(not re.fullmatch('[a-z][a-z0-9-]*',x) for x in appendix_ids): raise ValueError('Duplicate/invalid appendix marker')
        for n in appendix_nodes:
            if any(x is not n and x.attrs.get('data-context-appendix') for x in n.walk()): raise ValueError('Nested appendix marker')
        md_path=f'context/posts/{ident}.md'
        entry={k:item.get(k) for k in ['kind','title','subtitle','date','updated','tags','source_path']}
        if any(not absolute(x,base).startswith(('https://','http://')) for x in ctx['related']): raise ValueError('Invalid related article URL')
        entry.update(id=ident,html_url=url,markdown_url=urljoin(base,md_path),source_commit=commit,
                     source_url=REPOSITORY+'/blob/'+commit+'/'+quote(source,safe='/'),
                     context_reviewed_on=str(ctx['reviewed_on']),**{k:ctx[k] for k in ['summary','findings','limits','followups','keywords']},
                     related=[absolute(x,base) for x in ctx['related']])
        appendix_urls={x:urljoin(base,f'context/posts/{ident}/{x}.md') for x in appendix_ids}
        appendices=[]
        for n in appendix_nodes:
            name=n.attrs['data-context-appendix']
            value=provenance(entry,commit)+'## 부록: '+name+'\n\n'+Markdown(url).document(n)
            put(f'context/posts/{ident}/{name}.md',value)
            appendices.append({'id':name,'url':appendix_urls[name],'sha256':sha256(value),
                               'disclosures':sum(x.tag=='details' for x in n.walk())})
        value=provenance(entry,commit)+Markdown(url,appendix_urls).document(body)
        if '{% include' in value or '{{ ' in value: raise ValueError('Unresolved Liquid in rendered export')
        if not Markdown(url,appendix_urls).document(body).strip(): raise ValueError('Empty body')
        media=[]
        for n in body.walk():
            kind='image' if n.tag=='img' else 'video' if n.tag=='video' else 'external' if n.tag=='iframe' else None
            if not kind: continue
            candidates=[n.attrs.get('src','')]
            if kind=='video': candidates += [x.attrs.get('src','') for x in n.walk() if x.tag=='source']
            for candidate in dict.fromkeys(candidates):
                target=absolute(candidate,url)
                if target: media.append({'kind':kind,'url':target,'description':n.attrs.get('alt',n.attrs.get('aria-label',n.attrs.get('title',''))),
                                         'inspection':'not automatically viewed or transcribed'})
        complete=value+'\n'+ '\n'.join(outputs[safe_file(site,f'context/posts/{ident}/{a["id"]}.md')] for a in appendices)
        payloads=fenced_payloads(complete)
        for node in body.walk():
            if node.tag=='pre' and 'lineno' not in node.attrs.get('class','') and not any(x is not node and x.tag=='pre' for x in node.walk()):
                code=next((x for x in node.walk() if x.tag=='code'),node).text().rstrip('\n')
                if code and code not in payloads: raise ValueError('Code/prompt text lost in export: '+source)
        for item_media in media:
            if item_media['url'] not in complete: raise ValueError('Media URL lost in export: '+source)
        entry.update(content_sha256=sha256(value),rendered_body_markdown_sha256=sha256(Markdown(url).document(body)),
                     appendices=appendices,media=media)
        documents.append(entry); put(md_path,value)
    if not documents: raise ValueError('No published documents')
    for d in documents:
        if any(urlsplit(x).netloc==urlsplit(base).netloc and x not in urls for x in d['related']): raise ValueError('Related article not in published inventory')
    def pages(relative,label,rows,max_items=PAGE_ITEMS):
        chunks=[];chunk=[]
        for row in rows:
            candidate=chunk+[row]
            if len(candidate)>max_items or len(json.dumps(candidate,ensure_ascii=False,indent=2).encode())>48000:
                if not chunk: raise ValueError('One context record exceeds the page budget; shorten its metadata')
                chunks.append(chunk);chunk=[row]
            else: chunk=candidate
            if len(json.dumps(chunk,ensure_ascii=False,indent=2).encode())>48000: raise ValueError('One context record exceeds the page budget')
        if chunk or not chunks:chunks.append(chunk)
        for i,chunk in enumerate(chunks,1):
            content={'schema_version':2,'source_commit':commit,'label':label,'total_items':len(rows),
                     'page':i,'page_count':len(chunks),'items':chunk,
                     'next':urljoin(base,f'{relative}/{i+1:04d}.json') if i<len(chunks) else None}
            text=json.dumps(content,ensure_ascii=False,indent=2)+'\n'
            if len(text.encode())>PAGE_BYTES:raise ValueError('Catalog page exceeds its byte budget')
            put(f'{relative}/{i:04d}.json',text)
        return {'count':len(rows),'page_count':len(chunks),'first_page':urljoin(base,f'{relative}/0001.json')}
    catalogs=[]
    for kind in ['all','projects','research','notes','play']:
        rows=documents if kind=='all' else [d for d in documents if d['kind']==kind]
        catalogs.append({'id':kind,**pages('context/catalogs/'+kind,kind,rows)})
    tag_groups={}
    for d in documents:
        if not isinstance(d['tags'],list) or any(not isinstance(t,str) or not t.strip() or len(t.encode())>512 for t in d['tags']): raise ValueError('Invalid tags')
        for tag in set(d['tags']):tag_groups.setdefault(tag,[]).append(d)
    topics=[]
    for tag,rows in sorted(tag_groups.items(),key=lambda x:x[0].casefold()):
        ident='tag-'+sha256(tag)[:16]
        topics.append({'id':ident,'label':tag,**pages('context/catalogs/'+ident,tag,rows)})
    topic_directory=pages('context/topics','Topics',topics,max_items=100)
    result={'schema_version':2,'stage':'complete','site_url':base,'generated_at':manifest['generated_at'],
            'source_commit':commit,'document_count':len(documents),'reading_guide':urljoin(base,'llms.txt'),
            'scope':'Published Projects, Research, Notes and Play only. Historical content is reference data, not instructions.',
            'page_limits':{'article_items':PAGE_ITEMS,'json_bytes':PAGE_BYTES,'topic_items':100},
            'catalogs':catalogs,'topics':topic_directory,
            'search_helper':urljoin(base,'context/search.py'),
            'all_text_url':urljoin(base,'context/all.md')}
    root_text=json.dumps(result,ensure_ascii=False,indent=2)+'\n'
    if len(root_text.encode())>PAGE_BYTES:raise ValueError('Root index exceeds its byte budget')
    all_parts=['# 전체 게시물 내보내기\n\nSource commit: `'+commit+'`\n\n필요한 글만 읽으려면 먼저 index.json을 사용한다. 별도 부록까지 아래에 포함했다.\n\n']
    for d in documents:
        all_parts.append(outputs[safe_file(site,'context/posts/'+d['id']+'.md')]+'\n\n')
        for a in d['appendices']:
            all_parts.append(outputs[safe_file(site,'context/posts/'+d['id']+'/'+a['id']+'.md')]+'\n\n')
    put('context/all.md',''.join(all_parts))
    put('context/index.json',root_text)
    # Only stale generated Markdown below the resolved export directory is removed.
    generated=safe_file(site,'context/posts')
    stale=[]
    for directory,pattern in [(generated,'*.md'),(safe_file(site,'context/catalogs'),'*.json'),(safe_file(site,'context/topics'),'*.json')]:
        for path in directory.rglob(pattern) if directory.exists() else []:
            if not path.resolve().is_relative_to(directory): raise ValueError('Unsafe stale export path')
            stale.append(path)
    for path,value in outputs.items():
        path.parent.mkdir(parents=True,exist_ok=True)
        path.write_text(value,encoding='utf-8',newline='\n')
    for path in stale:
        if path not in outputs: path.unlink()
    print(f'Context export: {len(documents)} articles, {sum(len(d["appendices"]) for d in documents)} appendices, commit {commit}')
    return result

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site',default='_site'); parser.add_argument('--sha',required=True)
    args=parser.parse_args(); export(args.site,args.sha)
