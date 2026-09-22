const fs=require('fs'),path=require('path');
const dir='html';
for(const f of fs.readdirSync(dir)){
  if(!f.endsWith('.html'))continue;
  let h=fs.readFileSync(path.join(dir,f),'utf8');
  // isolate the rendered body (drop scripts/styles/svg)
  h=h.replace(/<script[\s\S]*?<\/script>/gi,' ')
     .replace(/<style[\s\S]*?<\/style>/gi,' ')
     .replace(/<svg[\s\S]*?<\/svg>/gi,' ')
     .replace(/<noscript[\s\S]*?<\/noscript>/gi,' ')
     .replace(/<head[\s\S]*?<\/head>/gi,' ');
  h=h.replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li|tr|section|header|footer|nav)>/gi,'\n')
     .replace(/<br\s*\/?>/gi,'\n');
  h=h.replace(/<[^>]+>/g,' ');
  h=h.replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"')
     .replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>')
     .replace(/&#x27;/g,"'").replace(/&hellip;/g,'...').replace(/&[a-z]+;/gi,' ');
  h=h.split('\n').map(l=>l.replace(/[ \t]+/g,' ').trim()).filter(l=>l.length>0);
  const out=[];let prev='';
  for(const l of h){ if(l!==prev)out.push(l); prev=l; }
  fs.writeFileSync('docs/TEXT_'+f.replace('.html','.txt'),out.join('\n'));
  console.log(f.padEnd(24),out.length,'lines');
}
