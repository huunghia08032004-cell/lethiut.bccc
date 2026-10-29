(function(){
var $=function(i){return document.getElementById(i)};
var lb=$('lb'),st=$('lbst'),cv=$('lbcv'),ttl=$('lbt'),zl=$('lbz'),tg=$('lbtg'),pv=$('lbpv'),nx=$('lbnx'),ld=$('lbld');
var cache={},S={pages:[],pi:0,ci:-1,single:false},v={s:1,x:0,y:0},isOpen=false,tok=0,fitScale=1;
function load(u){if(!cache[u]){cache[u]=new Promise(function(res,rej){var im=new Image();im.onload=function(){res(im)};im.onerror=rej;im.src=u})}return cache[u]}
function slots(im){if(im._c)return im._c;var c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;var g=c.getContext('2d');g.drawImage(im,0,0);
var H=c.height,rows=Math.max(1,Math.round((H-180-89-611)/630)+1),out=[];
for(var r=0;r<rows;r++)for(var k=0;k<2;k++){var x0=40+525*k,y0=180+630*r;if(y0+300>=H)continue;var d=g.getImageData(x0+248,y0+300,1,1).data;if(d[0]>=250&&d[1]>=250&&d[2]>=250)out.push({x:x0,y:y0})}
im._c=out;return out}
function pnum(u){var m=/img\/(\d+)\.jpg/.exec(u);return m?+m[1]:0}
function label(im,u,c){if(!c||typeof D==='undefined')return 'Trang '+pnum(u);var H=im.naturalHeight,xp=c.x/585*100,yp=c.y/(H-610)*100,p=pnum(u),n=[];
D.forEach(function(e){if(e[1]===p&&Math.abs(e[2]-xp)<0.15&&Math.abs(e[3]-yp)<0.15&&n.indexOf(e[0])<0)n.push(e[0])});return (n.length?n.join(' / ')+' · ':'')+'trang '+p}
function apply(){cv.style.transform='translate('+v.x+'px,'+v.y+'px) scale('+v.s+')';zl.textContent=Math.round(v.s*100)+'%'}
function clamp(){var r=st.getBoundingClientRect(),w=cv._w*v.s,h=cv._h*v.s,mx=Math.max(0,(w-r.width)/2),my=Math.max(0,(h-r.height)/2);v.x=Math.min(mx,Math.max(-mx,v.x));v.y=Math.min(my,Math.max(-my,v.y))}
function zoom(ns,cx,cy){ns=Math.min(5,Math.max(1,ns));var r=st.getBoundingClientRect();if(cx==null){cx=r.left+r.width/2;cy=r.top+r.height/2}
var px=cx-(r.left+r.width/2)-v.x,py=cy-(r.top+r.height/2)-v.y,k=ns/v.s;v.x-=px*(k-1);v.y-=py*(k-1);v.s=ns;if(ns===1){v.x=0;v.y=S.ci<0?v._top||0:0}clamp();apply()}
function fit(){var r=st.getBoundingClientRect(),cw=cv.width,ch=cv.height,sc;
if(S.ci>=0)sc=Math.min(r.width*.98/cw,r.height*.98/ch);else sc=r.width/cw;
cv._w=cw*sc;cv._h=ch*sc;cv.style.width=cv._w+'px';cv.style.height=cv._h+'px';cv.style.borderRadius=S.ci>=0?'14px':'0';
v.s=1;v.x=0;v.y=0;v._top=0;if(S.ci<0&&cv._h>r.height){v._top=(cv._h-r.height)/2;v.y=v._top}apply()}
async function show(){var my=++tok,u=S.pages[S.pi];ld.style.display='flex';var im;try{im=await load(u)}catch(e){ld.style.display='none';return}if(my!==tok)return;
var list=slots(im),c=S.ci>=0?list[S.ci]:null,g=cv.getContext('2d');window.__lbCur=c?{p:pnum(u),x:c.x,y:c.y}:null;if(window.lbInfo)window.lbInfo(window.__lbCur);
if(c){cv.width=992;cv.height=1222;g.clearRect(0,0,992,1222);g.save();g.beginPath();if(g.roundRect)g.roundRect(0,0,992,1222,44);else g.rect(0,0,992,1222);g.clip();g.imageSmoothingQuality='high';g.drawImage(im,c.x,c.y,496,611,0,0,992,1222);g.restore()}
else{cv.width=im.naturalWidth;cv.height=im.naturalHeight;g.drawImage(im,0,0)}
ld.style.display='none';fit();
var lab=label(im,u,c);ttl.textContent=c?lab:'Cả trang · trang '+pnum(u);
var ab=$('lbadd');if(ab)ab.hidden=!c;tg.textContent=c?'Cả trang':'Sản phẩm';tg.hidden=false;pv.hidden=nx.hidden=S.single;tg.dataset.have=list.length?1:0}
function open(pages,pi,ci,single){S.pages=pages;S.pi=pi;S.ci=ci;S.single=single;if(!isOpen){isOpen=true;lb.classList.add('on');lb.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden';try{history.pushState({lb:1},'')}catch(e){}$('lbx').focus()}show()}
function hide(){if(!isOpen)return;isOpen=false;tok++;lb.classList.remove('on');lb.setAttribute('aria-hidden','true');document.documentElement.style.overflow=''}
function close(){if(!isOpen)return;if(history.state&&history.state.lb){try{history.back();return}catch(e){}}hide()}
window.addEventListener('popstate',hide);
async function go(d){if(S.single)return;var im=await load(S.pages[S.pi]);if(S.ci<0){var pi=S.pi+d;if(pi<0||pi>=S.pages.length)return;S.pi=pi}
else{var l=slots(im),ci=S.ci+d;if(ci>=0&&ci<l.length)S.ci=ci;else{var p2=S.pi+d;if(p2<0||p2>=S.pages.length)return;var l2=slots(await load(S.pages[p2]));S.pi=p2;S.ci=d>0?0:l2.length-1}}show()}
document.addEventListener('click',async function(e){var a=e.target.closest&&e.target.closest('a.card,a.rc');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey||e.shiftKey)return;if(!a.getAttribute('href'))return;e.preventDefault();
var u=a.getAttribute('href');
if(a.classList.contains('card')){var pages=[].map.call(document.querySelectorAll('#all a.card'),function(x){return x.getAttribute('href')}),pi=pages.indexOf(u);if(pi<0){pages=[u];pi=0}
var img=a.querySelector('img'),r=img.getBoundingClientRect(),rx=(e.clientX-r.left)/r.width,ry=(e.clientY-r.top)/r.height,ci=-1;
try{var im=await load(u),l=slots(im),px=rx*im.naturalWidth,py=ry*im.naturalHeight;for(var i=0;i<l.length;i++)if(px>=l[i].x&&px<l[i].x+496&&py>=l[i].y&&py<l[i].y+611){ci=i;break}}catch(x){}
open(pages,pi,ci,false)}
else{var bp=(a.querySelector('.rv').style.backgroundPosition||'').match(/([\d.]+)%\s+([\d.]+)%/),ci2=-1;
try{var im2=await load(u),l3=slots(im2);if(bp){var X=bp[1]/100*585,Y=bp[2]/100*(im2.naturalHeight-610),best=1e9;l3.forEach(function(s,i){var d=Math.abs(s.x-X)+Math.abs(s.y-Y);if(d<best){best=d;ci2=i}});if(best>80)ci2=-1}}catch(x){}
open([u],0,ci2,true)}},true);
$('lbx').onclick=close;pv.onclick=function(){go(-1)};nx.onclick=function(){go(1)};
tg.onclick=async function(){if(S.ci>=0){S._ci=S.ci;S.ci=-1}else{var im=await load(S.pages[S.pi]),l=slots(im);S.ci=S._ci!=null&&S._ci<l.length?S._ci:0}show()};
$('lbzi').onclick=function(){zoom(v.s*1.4)};$('lbzo').onclick=function(){zoom(v.s/1.4)};
document.addEventListener('keydown',function(e){if(!isOpen)return;if(e.key==='Escape')close();else if(e.key==='ArrowLeft')go(-1);else if(e.key==='ArrowRight')go(1);else if(e.key==='+'||e.key==='=')zoom(v.s*1.4);else if(e.key==='-')zoom(v.s/1.4)});
st.addEventListener('wheel',function(e){if(!isOpen)return;e.preventDefault();if(e.ctrlKey||S.ci>=0){zoom(v.s*(e.deltaY<0?1.15:1/1.15),e.clientX,e.clientY)}else{v.y-=e.deltaY;clamp();apply()}},{passive:false});
var P={},pinch=null,last=0,sx=0;
function pts(){return Object.keys(P).map(function(k){return P[k]})}
st.addEventListener('pointerdown',function(e){st.setPointerCapture(e.pointerId);P[e.pointerId]={x:e.clientX,y:e.clientY,x0:e.clientX,y0:e.clientY,t:Date.now()};var a=pts();if(a.length===2)pinch={d:Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y),s:v.s}});
st.addEventListener('pointermove',function(e){var p=P[e.pointerId];if(!p)return;var dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;var a=pts();
if(a.length===2&&pinch){var d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y);zoom(pinch.s*d/pinch.d,(a[0].x+a[1].x)/2,(a[0].y+a[1].y)/2)}
else if(a.length===1&&(v.s>1||S.ci<0)){v.x+=dx;v.y+=dy;clamp();apply()}});
function up(e){var p=P[e.pointerId];if(!p)return;delete P[e.pointerId];pinch=null;var n=Object.keys(P).length;if(n)return;
var mx=e.clientX-p.x0,my=e.clientY-p.y0,moved=Math.hypot(mx,my),now=Date.now();
if(moved<8&&now-p.t<350){var r=cv.getBoundingClientRect(),inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
if(!inside){close();return}if(now-last<320){zoom(v.s>1.05?1:2.5,e.clientX,e.clientY);last=0}else last=now}
else if(S.ci>=0&&v.s<=1.05&&Math.abs(mx)>70&&Math.abs(my)<90){go(mx<0?1:-1)}}
st.addEventListener('pointerup',up);st.addEventListener('pointercancel',function(e){delete P[e.pointerId];pinch=null});
window.addEventListener('resize',function(){if(isOpen&&cv.width>10)fit()});
})();
