const roles=[['Farm Owner','Register farms and pigs, report health concerns and apply for movement or shipping permits.','farm-owner'],['Field Technician','Receive MAO assignments, record field observations and document sample collection or referrals.','technician'],['MAO Officer','Verify farm registrations, coordinate field monitoring and review municipal reports.','mao'],['OPV Executive','Monitor province-wide swine supply, disease reports, forecasting and ASF zoning.','opv'],['Slaughterhouse','Check incoming QR tags and permits, record inspection findings and issue Meat Inspection Certificates.','slaughterhouse']];
const tasks=[['Farm & animal registration','Health concern reporting','Movement applications'],['Field monitoring','Inspection observations','Samples & referrals'],['Farm verification','Field assignments','Municipal reporting'],['Provincial monitoring','Shipping permit review','Disease analysis'],['QR & permit checks','Meat inspection','Inspection certificates']];
document.getElementById('roles').innerHTML=roles.map(([name,description],i)=>`<article class="role role-info"><span class="role-number">0${i+1}</span><div><h3>${name}</h3><p>${description}</p></div><ul>${tasks[i].map(t=>`<li>${t}</li>`).join('')}</ul></article>`).join('');
const dialog=document.getElementById('portal-access'),options=document.getElementById('portal-options'),next=document.getElementById('portal-next');let opener;
function reset(){options.hidden=false;next.hidden=true;}
options.innerHTML=roles.map(([name],i)=>`<button type="button" class="portal-option" data-role="${i}">${name}<span aria-hidden="true">→</span></button>`).join('');
document.querySelectorAll('[data-portal-open]').forEach(link=>link.addEventListener('click',e=>{e.preventDefault();opener=link;reset();dialog.showModal();}));
options.addEventListener('click',e=>{const b=e.target.closest('[data-role]');if(!b)return;const [name,description,route]=roles[Number(b.dataset.role)];document.getElementById('selected-role').textContent=name;document.getElementById('selected-description').textContent=description;document.getElementById('portal-login').href=`https://swinetrack-2-0.vercel.app/${route}/login`;document.getElementById('portal-register').href=`https://swinetrack-2-0.vercel.app/${route}/register`;options.hidden=true;next.hidden=false;document.getElementById('portal-login').focus();});
dialog.querySelector('.portal-close').onclick=()=>dialog.close();dialog.querySelector('.portal-back').onclick=()=>{reset();options.querySelector('button').focus();};dialog.addEventListener('close',()=>opener?.focus());dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});

const menuToggle=document.querySelector('.menu-toggle');
const mainNavigation=document.getElementById('main-navigation');
function closeNavigation(restoreFocus=false){
 const wasOpen=menuToggle.getAttribute('aria-expanded')==='true';
 menuToggle.setAttribute('aria-expanded','false');
 menuToggle.setAttribute('aria-label','Open navigation');
 mainNavigation.classList.remove('is-open');
 if(restoreFocus&&wasOpen)menuToggle.focus();
}
menuToggle.addEventListener('click',()=>{
 const open=menuToggle.getAttribute('aria-expanded')!=='true';
 menuToggle.setAttribute('aria-expanded',String(open));
 menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');
 mainNavigation.classList.toggle('is-open',open);
});
mainNavigation.addEventListener('click',event=>{
 const link=event.target.closest('a');
 if(!link)return;
 if(link.hasAttribute('data-portal-open')){opener=menuToggle;closeNavigation();}
 else closeNavigation(true);
});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&menuToggle.getAttribute('aria-expanded')==='true')closeNavigation(true);
});
document.addEventListener('click',event=>{
 if(!event.target.closest('header'))closeNavigation();
});
matchMedia('(max-width:700px)').addEventListener('change',()=>closeNavigation());

