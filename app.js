(function(){
var $=function(s){return document.querySelector(s)},A=function(s){return[].slice.call(document.querySelectorAll(s))};
var N=[['index.html','Anasayfa','Home'],['about.html','Hakkımda','About'],['projects.html','Projeler','Projects'],['gallery.html','Galeri','Gallery'],['blog.html','Blog','Blog'],['contact.html','İletişim','Contact']];
var cur=(location.pathname.split('/').pop()||'index').replace('.html','');
document.body.insertAdjacentHTML('afterbegin','<a class="skip" href="#main" data-en="Skip to content">İçeriğe geç</a><header><div class="wrap bar"><a class="logo" href="index.html" aria-label="İsmail Hakkı Öngen"><img src="img/logo.png" alt="" width="42" height="42"></a><nav id="nv">'+N.map(function(n){return'<a href="'+n[0]+'"'+(n[0].replace('.html','')==cur?' class="on" aria-current="page"':'')+' data-en="'+n[2]+'">'+n[1]+'</a>'}).join('')+'</nav><span><button class="lang" id="lg"></button> <button class="burger" id="bg" aria-label="Menu">☰</button></span></div></header>');
document.body.insertAdjacentHTML('beforeend','<footer><div class="wrap"><span>© 2026 İsmail Hakkı Öngen</span><span data-en="Akdeniz University, Computer Programming">Akdeniz Üniversitesi, Bilgisayar Programcılığı</span></div></footer>');
function lang(l){document.documentElement.lang=l;try{localStorage.setItem('lang',l)}catch(e){}
A('[data-en]').forEach(function(n){if(n.dataset.tr==null)n.dataset.tr=n.textContent;n.textContent=l=='en'?n.dataset.en:n.dataset.tr});
$('#lg').textContent=l=='en'?'TR':'EN';$('#lg').setAttribute('aria-label',l=='en'?'Türkçe':'English')}
var s=null;try{s=localStorage.getItem('lang')}catch(e){}
var L=s||'tr';lang(L);
$('#lg').onclick=function(){L=L=='en'?'tr':'en';lang(L)};
var nv=$('#nv'),bg=$('#bg'),lb;function tog(o){nv.classList.toggle('o',o);bg.setAttribute('aria-expanded',nv.classList.contains('o'))}
bg.setAttribute('aria-expanded','false');bg.onclick=function(){tog()};nv.onclick=function(e){if(e.target.closest('a'))tog(false)};
document.addEventListener('keydown',function(e){if(e.key=='Escape'){tog(false);if(lb)lb.hidden=true}});
var mn=$('main');if(mn)mn.id='main';
A('.box p b').forEach(function(b){var t=b.nextSibling;if(!t||t.nodeType!=3)return;var d=document.createElement('div');d.className='chips';d.innerHTML=t.textContent.split(', ').map(function(s){return'<span class="tag">'+s+'</span>'}).join('');t.remove();b.parentNode.after(d);b.style.display='block'});

function bindF(){A('.f').forEach(function(b){b.onclick=function(){A('.f').forEach(function(x){x.classList.remove('on')});b.classList.add('on');var k=b.dataset.f;A('.post').forEach(function(p){p.hidden=k!='all'&&p.dataset.k.split(' ').indexOf(k)<0})}})}bindF();

var cf=$('#cf');if(cf)cf.onsubmit=function(e){e.preventDefault();var f=new FormData(cf),st=$('#st'),en=L=='en',g=function(k,n){return String(f.get(k)||'').trim().slice(0,n)};
var row={id:Date.now().toString(36)+Math.random().toString(36).slice(2,6),name:g('n',200),email:g('e',200),subject:g('s',200),message:g('m',4000)};
if(!window.CMS||!CMS.ready){var to=(cf.dataset.mail||'');location.href='mailto:'+to+'?subject='+encodeURIComponent(row.subject)+'&body='+encodeURIComponent(row.message+'\n\n'+row.name+' <'+row.email+'>');return}
CMS.insertMessage(row).then(function(){cf.reset();if(st)st.textContent=en?'Thank you, your message was sent.':'Teşekkürler, mesajın gönderildi.'}).catch(function(){if(st)st.textContent=en?'Could not send. Please try again.':'Gönderilemedi, lütfen tekrar dene.'})};

var host=$('.hero');if(host)(function(){
var c=document.createElement('canvas');c.className='cloak';host.prepend(c);
var x=c.getContext('2d'),W,H,P=[],S,R,m={x:0,y:0},e={x:0,y:0},inside=false,drift=true,vis=true,run=false,
rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
if(rm)drift=false;
var SC=1,AL=.8,AX=.32,AY=.28;function build(){var d=Math.min(devicePixelRatio||1,2);W=host.clientWidth;H=host.clientHeight;c.width=Math.round(W*d);c.height=Math.round(H*d);x.setTransform(c.width/W,0,0,c.height/H,0,0);
var md=Math.min(W,H),ph=W<700;S=Math.max(ph?30:24,md/22);R=ph?Math.max(.5*W,170):.34*Math.max(md,420);SC=ph?.95:(S<32?.8:1);AL=.8;AY=ph?.4:.28;AX=ph?.36:.32;
var cols=Math.ceil(W/S)+1,rows=Math.ceil(H/S)+1,ox=(W-(cols-1)*S)/2,oy=(H-(rows-1)*S)/2;P=[];
for(var r=0;r<rows;r++)for(var q=0;q<cols;q++){var h=Math.abs(Math.sin(q*12.9898+r*78.233)*43758.5453)%1,hx=ox+q*S,hy=oy+r*S;P.push({hx:hx,hy:hy,x:hx,y:hy,vx:0,vy:0,r:(1+h*1.6)*SC})}
m.x=e.x=W/2;m.y=e.y=H/2;if(rm)tick(0)}
function tick(t){if(!vis){run=false;return}
if(drift){var k=t*.00055;m.x=W/2+Math.sin(k*1.3+.4)*W*AX;m.y=H/2+Math.sin(k*1.9+1.57)*H*AY}
e.x+=(m.x-e.x)*.16;e.y+=(m.y-e.y)*.16;x.clearRect(0,0,W,H);var on=drift||inside;
for(var i=0;i<P.length;i++){var p=P[i];
if(on){var dx=p.x-e.x,dy=p.y-e.y,d=Math.hypot(dx,dy);if(d<R){var n=1-d/R,f=n*n*3.4;if(d>.0001){p.vx+=dx/d*f;p.vy+=dy/d*f}else p.vx+=f}}
p.vx+=(p.hx-p.x)*.024;p.vy+=(p.hy-p.y)*.024;p.vx*=.86;p.vy*=.86;p.x+=p.vx;p.y+=p.vy;
var a=Math.max(0,.72-Math.hypot(p.x-p.hx,p.y-p.hy)/70);if(a<.01)continue;
x.fillStyle='rgba(255,59,48,'+(a*AL/.8).toFixed(3)+')';x.beginPath();x.arc(p.x,p.y,p.r,0,6.2832);x.fill()}
if(!rm)requestAnimationFrame(tick);else run=false}
function go(){if(!run&&!rm){run=true;requestAnimationFrame(tick)}}
function pos(ev){var b=host.getBoundingClientRect();m.x=ev.clientX-b.left;m.y=ev.clientY-b.top}
host.addEventListener('pointermove',function(ev){if(ev.pointerType=='touch'||rm)return;drift=false;inside=true;pos(ev)});
host.addEventListener('pointerleave',function(ev){if(ev.pointerType!='touch')inside=false});
var rt;function sch(){clearTimeout(rt);rt=setTimeout(function(){if(host.clientWidth!=W||host.clientHeight!=H)build()},120)}if(window.ResizeObserver)new ResizeObserver(sch).observe(host);else addEventListener('resize',sch);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(sch);
new IntersectionObserver(function(en){vis=en[0].isIntersecting;if(vis)go()}).observe(host);
build();go()})();
lb=document.createElement('div');lb.className='lb';lb.hidden=true;lb.innerHTML='<img alt=""><p></p>';document.body.appendChild(lb);
function bindG(){A('.gal figure').forEach(function(f){function o(){var i=f.querySelector('img');if(!i)return;lb.querySelector('img').src=i.src;lb.querySelector('p').textContent=f.querySelector('figcaption').textContent;lb.hidden=false}
f.tabIndex=0;f.setAttribute('role','button');f.onclick=o;f.onkeydown=function(e){if(e.key=='Enter'||e.key==' '){e.preventDefault();o()}}})}bindG();
lb.onclick=function(){lb.hidden=true};
window.SiteUI={refresh:function(){lang(L);bindF();bindG()}};
})();
