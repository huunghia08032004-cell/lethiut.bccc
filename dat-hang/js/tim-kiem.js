var q=document.getElementById('q'),nav=document.getElementById('nav'),none=document.getElementById('none'),res=document.getElementById('res'),cnt=document.getElementById('cnt'),all=document.getElementById('all');
function pad(n){return ('00'+n).slice(-3)}
var FN={};function fold(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/-/g,'')}function nf(c){return FN[c]||(FN[c]=fold(NM[c]||''))}
function f(){var raw=q.value.trim(),tk=fold(raw).split(/\s+/).filter(Boolean),t=raw.toLowerCase().replace(/[\s-]/g,'');
if(!t){res.hidden=true;cnt.hidden=true;all.hidden=false;none.hidden=true;return}
var m=D.filter(function(d){var c=d[0].toLowerCase().replace(/-/g,'');if(c.indexOf(t)>-1)return true;var n=nf(d[0]);return tk.every(function(w){return c.indexOf(w)>-1||n.indexOf(w)>-1})});
var sn={};m=m.filter(function(d){var k=d[1]+'|'+d[3]+'|'+d[2];if(sn[k])return false;sn[k]=1;return true});m.sort(function(a,b){function r(x){x=x.toLowerCase().replace(/-/g,'');return x===t?0:(x.indexOf(t)===0?1:2)}var ea=r(a[0]),eb=r(b[0]);return ea-eb||(a[0]<b[0]?-1:1)});
all.hidden=true;res.hidden=false;cnt.hidden=false;res.textContent='';
cnt.textContent=m.length?('Tìm thấy '+m.length+' mã'+(m.length>60?', hiển thị 60 mã đầu':'')):'';
none.hidden=m.length>0;
m.slice(0,60).forEach(function(d){var a=document.createElement('a');a.className='rc';a.href='img/'+pad(d[1])+'.jpg';a.target='_blank';a.rel='noopener';
var v=document.createElement('div');v.className='rv';v.style.backgroundImage='url(img/'+pad(d[1])+'.jpg)';v.style.backgroundSize=(1080/495*100)+'% auto';v.style.backgroundPosition=d[2]+'% '+d[3]+'%';
var s=document.createElement('span');s.textContent=d[0]+' · trang '+d[1]+(NM[d[0]]?' · '+NM[d[0]]:'');a.appendChild(v);a.appendChild(s);res.appendChild(wrapRc(a,d))})}
q.addEventListener('input',f);
nav.addEventListener('change',function(){if(nav.value){var e=document.getElementById(nav.value);if(e){q.value='';f();e.scrollIntoView({behavior:'smooth',block:'start'})}}});
