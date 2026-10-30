"""Search paged blog metadata locally; no model/API key and no article-body preload."""
import argparse
import json
import sys
from urllib.parse import urlsplit
from urllib.request import Request, urlopen

DEFAULT_INDEX='https://cbh456746.github.io/context/index.json'
MAX_BYTES=65536

def load_json(url):
    req=Request(url,headers={'User-Agent':'BH-CHOI-context-search/2','DNT':'1'})
    with urlopen(req,timeout=25) as response:
        data=response.read(MAX_BYTES+1)
    if len(data)>MAX_BYTES:raise ValueError('Reference JSON exceeds its declared page budget')
    return json.loads(data)

def page_items(first,index,load):
    current=first;seen=set();origin=urlsplit(index['site_url'])
    while current:
        target=urlsplit(current)
        if target.scheme!='https' or target.netloc!=origin.netloc or not target.path.startswith(origin.path.rstrip('/')+'/context/'):
            raise ValueError('Reference page leaves the expected site/context path')
        if current in seen or len(seen)>=10000:raise ValueError('Invalid reference pagination chain')
        seen.add(current);page=load(current)
        if page.get('source_commit')!=index['source_commit']:raise ValueError('Deployment changed while reading; reload the root index and retry')
        yield from page['items'];current=page.get('next')

def search(index,query,load=load_json,kind='all',tag=None,limit=5):
    if index.get('schema_version')!=2 or index.get('stage')!='complete':raise ValueError('Expected a complete v2 reference index')
    if not 1<=limit<=20 or not query.strip():raise ValueError('Use a nonempty query and limit 1..20')
    catalog=next((c for c in index['catalogs'] if c['id']==kind),None)
    if catalog is None:raise ValueError('Unknown content kind')
    if tag:
        catalog=next((t for t in page_items(index['topics']['first_page'],index,load) if t['label'].casefold()==tag.casefold()),None)
        if catalog is None:return {'source_commit':index['source_commit'],'matched':0,'results':[]}
    terms=query.casefold().split();matches=[]
    for item in page_items(catalog['first_page'],index,load):
        if kind!='all' and item['kind']!=kind:continue
        fields={k:item.get(k,[]) if k!='title' else item['title'] for k in ['title','summary','findings','limits','keywords']}
        text=json.dumps(fields,ensure_ascii=False).casefold()
        if not all(t in text for t in terms):continue
        score=sum(3*(t in item['title'].casefold())+2*(t in ' '.join(item['keywords']).casefold())+1 for t in terms)
        matches.append((score,item))
    matches.sort(key=lambda x:(-x[0],x[1]['id']))
    return {'source_commit':index['source_commit'],'query':query,'kind':kind,'tag':tag,'matched':len(matches),
            'method':'Case-insensitive literal terms in reviewed metadata; not semantic/full-body search.',
            'results':[{k:x[k] for k in ['id','title','summary','limits','markdown_url','html_url','appendices','related']} for score,x in matches[:limit]]}

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--query',required=True);parser.add_argument('--kind',default='all',choices=['all','projects','research','notes','play'])
    parser.add_argument('--tag');parser.add_argument('--limit',type=int,default=5);parser.add_argument('--index',default=DEFAULT_INDEX)
    args=parser.parse_args()
    print(json.dumps(search(load_json(args.index),args.query,kind=args.kind,tag=args.tag,limit=args.limit),ensure_ascii=False,indent=2))
