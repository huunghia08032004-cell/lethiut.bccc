/* Bảng thông tin chi tiết sản phẩm trong khung phóng to (dữ liệu: js/du-lieu-thong-tin.js, tải khi cần) */
(function(){
var lb=document.getElementById('lb');if(!lb)return;
var box=document.createElement('aside');box.id='lbinfo';box.setAttribute('aria-label','Thông tin sản phẩm');lb.appendChild(box);
var TTP=null;
function loadTT(){if(window.TT)return Promise.resolve(window.TT);if(TTP)return TTP;
 TTP=new Promise(function(res){var s=document.createElement('script');s.src='js/du-lieu-thong-tin.js?v=1';s.onload=function(){res(window.TT||{})};s.onerror=function(){res({})};document.head.appendChild(s)});return TTP}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function vn(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
function cardAt(p,x,y){var CL=CD.CL;for(var i=0;i<CL.length;i++){var c=CL[i];if(c[0]===p&&c[1]===x&&c[2]===y)return i}return -1}
function rows(list){return list.filter(function(r){return r&&r[1]}).map(function(r){return '<tr><th>'+esc(r[0])+'</th><td>'+esc(r[1])+'</td></tr>'}).join('')}
function render(i){
 var c=CD.CL[i],codes=c[3],k=codes[0],t=(window.TT||{})[k]||{},ci=CD.CI[k]||[];
 var st=null;codes.forEach(function(x){var r=CD.CI[x];if(r&&r[0]!=null&&(st==null||r[0]>st))st=r[0]});
 var h='<div class="ih"><div class="ic">'+esc(k)+(codes.length>1?' <small>'+esc(codes.slice(1).join(', '))+'</small>':'')+'</div>'+
  '<div class="in">'+esc(t.ten||(typeof NM!=='undefined'&&NM[k])||'')+'</div>'+(t.nhom?'<div class="ig">'+esc(t.nhom)+'</div>':'')+
  '<div class="ip">'+(c[4]?vn(c[4])+'đ <small>giá khách B</small>':'')+'</div>'+
  '<div class="is'+(st>0?'':' no')+'">'+(st>0?'Còn '+vn(st)+' cái (kho HCM)':'Tồn kho: hỏi lại sales')+'</div></div>';
 var spec=(t.tskt||[]).slice();
 if(ci[1]>1)spec.push(['Đặt hàng',ci[2]==='one'?'Đặt lẻ từ 1 cái':'Tối thiểu 1 hộp '+ci[1]+' cái']);
 if(spec.length)h+='<h3>Thông số kỹ thuật</h3><table>'+rows(spec)+'</table>';
 if(t.dd&&t.dd.length)h+='<h3>Đặc điểm nổi bật</h3><ul>'+t.dd.map(function(x){return '<li>'+esc(x)+'</li>'}).join('')+'</ul>';
 if(t.mt&&t.mt.length)h+='<h3>Mô tả</h3>'+t.mt.map(function(x){return '<p>'+esc(x)+'</p>'}).join('');
 if(t.qt&&t.qt.length)h+='<h3>Thông số Deli quốc tế</h3><table>'+rows(t.qt)+'</table>';
 if(!spec.length&&!(t.dd&&t.dd.length)&&!(t.mt&&t.mt.length))h+='<p class="im">Chưa có thông số chi tiết cho mã này. Vui lòng hỏi Nghĩa để được tư vấn.</p>';
 if(t.ng&&t.ng.length)h+='<div class="isrc">Nguồn: '+t.ng.map(function(s){return s[1]?'<a href="'+esc(s[1])+'" target="_blank" rel="noopener">'+esc(s[0])+'</a>':esc(s[0])}).join(' · ')+'</div>';
 box.innerHTML=h;box.scrollTop=0}
window.lbInfo=function(cur){
 if(!cur){lb.classList.remove('hasinfo');return}
 var i=cardAt(cur.p,cur.x,cur.y);if(i<0){lb.classList.remove('hasinfo');return}
 lb.classList.add('hasinfo');box.innerHTML='<p class="im">Đang tải thông tin…</p>';
 loadTT().then(function(){if(window.__lbCur===cur)render(i)})};
})();
