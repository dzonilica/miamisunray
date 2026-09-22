const fs=require('fs');
const dec=s=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ');
let out='';
for(const f of fs.readdirSync('html').filter(x=>x.endsWith('.html'))){
  const h=fs.readFileSync('html/'+f,'utf8');
  out+='\n===== '+f+' =====\n';
  const t=h.match(/<title>([^<]*)<\/title>/i); out+='TITLE: '+(t?dec(t[1]):'-')+'\n';
  const d=h.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)
        || h.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i);
  out+='DESCRIPTION: '+(d?dec(d[1]):'(none)')+'\n';
  for(const p of ['og:title','og:description','og:image','og:url','keywords','robots']){
    const re=new RegExp('<meta[^>]+(?:property|name)="'+p+'"[^>]+content="([^"]*)"','i');
    const m=h.match(re); if(m)out+=p.toUpperCase()+': '+dec(m[1])+'\n';
  }
  const canon=h.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  if(canon)out+='CANONICAL: '+canon[1]+'\n';
  // images with alt
  const imgs=[...h.matchAll(/<img[^>]*>/gi)].map(m=>m[0]);
  const seen=new Set();
  out+='--- IMAGES ---\n';
  for(const tag of imgs){
    const src=(tag.match(/src="([^"]*)"/)||[])[1]||'';
    const alt=(tag.match(/alt="([^"]*)"/)||[])[1]||'';
    const id=(src.match(/media\/([A-Za-z0-9~_]+\.(?:jpg|jpeg|png|gif|webp|svg))/)||[])[1];
    if(!id||seen.has(id))continue; seen.add(id);
    out+='  '+id+'  | alt: '+(dec(alt)||'(empty)')+'\n';
  }
}
fs.writeFileSync('docs/SEO_META.txt',out);
console.log(out);
