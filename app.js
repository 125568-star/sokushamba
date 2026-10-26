const $=s=>document.querySelector(s);
const search=$('#query');
if(search&&location.pathname.endsWith('buy.html')){
 const params=new URLSearchParams(location.search);search.value=params.get('q')||'';
 const filter=()=>{const q=search.value.trim().toLowerCase();let count=0;document.querySelectorAll('#products .card').forEach(card=>{card.hidden=!card.dataset.search.includes(q);if(!card.hidden)count++});$('#empty').hidden=count>0;$('#result-title').textContent=q?'Search Results ('+count+')':'All Listings'};
 search.addEventListener('input',filter);filter();
}
let drafts=[];
try{const saved=JSON.parse(localStorage.getItem('sokushamba-drafts')||'[]');if(Array.isArray(saved))drafts=saved.filter(p=>p&&typeof p.name==='string'&&typeof p.county==='string'&&typeof p.category==='string'&&Number.isFinite(Number(p.price))&&Number(p.price)>0)}catch{}
const form=$('#sell-form');
if(form)form.addEventListener('submit',event=>{
 event.preventDefault();const data=new FormData(form);const draft={name:data.get('name').trim(),category:data.get('category'),price:Number(data.get('price')),unit:data.get('unit').trim(),county:data.get('county').trim()};
 if(!draft.name||!draft.unit||!draft.county||!Number.isFinite(draft.price)||draft.price<=0)return;
 try{localStorage.setItem('sokushamba-drafts',JSON.stringify([...drafts,draft]));drafts.push(draft);$('#save-status').textContent='Draft saved in this browser. Open View my saved drafts below to review it. Your listing has not been published.';form.reset()}catch{$('#save-status').textContent='Could not save this draft. Check your browser storage settings and try again.'}
});
const draftGrid=$('#drafts');
if(draftGrid){$('#drafts-empty').hidden=drafts.length>0;for(const draft of drafts){const card=document.createElement('article');card.className='card draft-card';const image=document.createElement('div');image.className='draft-image';image.textContent='🌱';const body=document.createElement('div');body.className='card-body';for(const [tag,text,cls] of [['h2',draft.name,''],['p','KSh '+Number(draft.price).toLocaleString('en-KE')+(draft.unit?' / '+draft.unit:''),'price'],['p',draft.county,'county'],['span',draft.category,'tag']]){const el=document.createElement(tag);el.className=cls;el.textContent=text;body.append(el)}const note=document.createElement('p');note.textContent='Local draft · Not published';note.className='draft-note';body.append(note);card.append(image,body);draftGrid.append(card)}}
