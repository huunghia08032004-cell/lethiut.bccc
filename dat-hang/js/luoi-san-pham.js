/* Lưới sản phẩm: mỗi sản phẩm một ô (thay cho ảnh cả trang báo giá) */
(function(){
var CL=CD.CL,CI=CD.CI,PH=CD.PH,PG={};
CL.forEach(function(c,i){(PG[c[0]]=PG[c[0]]||[]).push(i)});
function pad(n){return ('00'+n).slice(-3)}
function vn(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function stock(codes){var best=null;codes.forEach(function(k){var r=CI[k];if(r&&r[0]!=null&&(best==null||r[0]>best))best=r[0]});return best}
function name(codes){for(var j=0;j<codes.length;j++)if(NM[codes[j]])return NM[codes[j]];return ''}
function codeLabel(codes){if(codes.length===1)return codes[0];var base=codes[0];return base+' <small>+'+(codes.length-1)+' mẫu</small>'}
/* vùng ảnh sản phẩm trong thẻ: x+23..x+474, y+24..y+281 (451x257) */
function imgPos(c){var H=PH[c[0]]||2140;return ((c[1]+23)/(1080-451)*100)+'% '+((c[2]+24)/(H-257)*100)+'%'}
function cardPos(c){var H=PH[c[0]]||2140;return (c[1]/585*100)+'% '+(c[2]/(H-610)*100)+'%'}
function tile(i){var c=CL[i],p=pad(c[0]),st=stock(c[3]),nm=name(c[3]);
 var stH=st==null||st<=0?'<span class="pst no">Hỏi lại sales</span>':'<span class="pst">Còn '+vn(st)+' cái</span>';
 return '<div class="pt"><a class="rc pimg" href="img/'+p+'.jpg" target="_blank" rel="noopener" aria-label="Xem ảnh '+esc(c[3][0])+'">'+
  '<div class="pv" data-bg="img/'+p+'.jpg" style="background-position:'+imgPos(c)+'"></div>'+
  '<div class="rv" style="display:none;background-position:'+cardPos(c)+'"></div></a>'+
  '<div class="pbody"><div class="pcode">'+codeLabel(c[3])+'</div><div class="pname">'+esc(nm)+'</div>'+
  '<div class="pprice">'+(c[4]?vn(c[4])+'đ':'Hỏi giá')+'</div>'+stH+'</div>'+
  '<button type="button" class="btn add2 padd" data-i="'+i+'">＋ Thêm vào đơn</button></div>'}
var io='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var d=e.target;d.style.backgroundImage='url('+d.dataset.bg+')';io.unobserve(d)}})},{rootMargin:'600px 0px'}):null;
document.querySelectorAll('#all section').forEach(function(sec){
 var g=sec.querySelector('.grid');if(!g)return;var pages=[];
 g.querySelectorAll('a.card').forEach(function(a){var m=/img\/(\d+)\.jpg/.exec(a.getAttribute('href')||'');if(m)pages.push(+m[1])});
 var h='';pages.forEach(function(p){(PG[p]||[]).slice().sort(function(a,b){return CL[a][2]-CL[b][2]||CL[a][1]-CL[b][1]}).forEach(function(i){h+=tile(i)})});
 g.className='pgrid';g.innerHTML=h});
document.querySelectorAll('#all .pv').forEach(function(d){if(io)io.observe(d);else d.style.backgroundImage='url('+d.dataset.bg+')'});
})();
