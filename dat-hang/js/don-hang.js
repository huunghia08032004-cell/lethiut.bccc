(function(){
var CL=CD.CL,CI=CD.CI,PH=CD.PH;
var BY={},PG={};
CL.forEach(function(c,i){(PG[c[0]]=PG[c[0]]||[]).push(i);c[3].forEach(function(k){if(!(k in BY))BY[k]=i})});
function vn(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.')}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function unit(e){if(e.price!=null)return e.price;if(e.fixed)return e.fixed;if(!e.list)return null;return Math.round(e.list*(1-0.04-(e.km||0)))}
var KEY='deli_order_v2',ROWS={},CART=[],S={},uid=0;
try{var sv=JSON.parse(localStorage.getItem(KEY)||'null');if(sv){ROWS=sv.rows||{};CART=sv.cart||[]}}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify({rows:ROWS,cart:CART}))}catch(e){}}
function cropStyle(c){var p=c[0],x0=c[1],y0=c[2],H=PH[p]||2140;
 var bx=(x0+23)/(1080-451)*100,by=(y0+24)/(H-257)*100;
 return 'background-image:url(img/'+('00'+p).slice(-3)+'.jpg);background-size:'+(1080/451*100)+'% auto;background-position:'+bx+'% '+by+'%'}
function thumb(e){
 if(e.card!=null)return '<div class="th" style="'+cropStyle(CL[e.card])+'"></div>';
 return '<div class="th">'+(e.img?'<img class="zoomable" src="'+e.img+'" alt="'+esc(e.code)+'" loading="lazy">':'Chưa có ảnh')+'</div>'}
function stH(e){if(e.stock==null)return '<span class="st no" data-st>Hỏi lại sales</span>';if(e.stock>0)return '<span class="st" data-st>Còn '+vn(e.stock)+'</span>';return '<span class="st no" data-st>Hỏi lại sales</span>'}
function priceH(e){var p=unit(e);if(p==null)return '<span class="desc">Chưa có giá</span>';
 var h='<span class="big">'+vn(p)+'đ</span>';
 if(e.fixed)h+='<span class="km">Giá chung</span><s>'+vn(e.list)+'đ</s>';else if(e.km>0)h+='<span class="km">KM −'+Math.round(e.km*100)+'%</span><s>'+vn(e.list)+'đ</s>';
 return '<span class="price">'+h+'</span>'}
function reg(e,sec,on,key){var r=ROWS[key];if(!r){r=ROWS[key]={on:on,qty:e.qty!=null?e.qty:3,per:e.per}}S[key]={e:e,sec:sec,r:r};return r}
function row(e,sec,on,extra,lead){var key=e.key||(sec+':'+e.code+':'+(uid++));var r=reg(e,sec,on,key);var un=e.unitName||'hộp';
 return '<tr id="r_'+esc(key).replace(/[^\w]/g,'_')+'" data-k="'+esc(key)+'"><td><input type="checkbox" class="ck" '+(r.on?'checked':'')+' aria-label="Chọn '+esc(e.code)+'"></td><td>'+thumb(e)+'</td><td>'+(lead||'')+'<div class="code">'+esc(e.code)+'</div><div class="desc">'+esc(e.desc||'')+'</div>'+(extra||'')+'</td>'+
 '<td class="num r" data-l="Cái/hộp"><input class="n per" type="number" min="1" value="'+r.per+'" aria-label="Cái mỗi hộp">'+(e.est?'<span title="Ước tính" class="u">ước tính*</span>':'')+'</td>'+
 '<td class="num r" data-l="Số lượng"><input class="n qty" type="number" min="0" value="'+r.qty+'" aria-label="Số lượng"><span class="u">'+un+'</span></td>'+
 '<td class="num r pcs" data-l="Số cái"></td><td class="num r" data-l="Đơn giá B">'+priceH(e)+'</td><td class="num r amt" data-l="Thành tiền"></td><td class="r" data-l="Tồn HCM">'+stH(e)+(sec==='C'?'<br><button class="rm" data-rm="'+esc(e.code)+'">Xóa khỏi đơn</button>':'')+'</td></tr>'}
var HEAD='<thead><tr><th></th><th>Hình</th><th>Mã / Mô tả</th><th class="r">Cái/hộp</th><th class="r">Số lượng</th><th class="r">Số cái</th><th class="r">Đơn giá B</th><th class="r">Thành tiền</th><th class="r">Tồn HCM</th></tr></thead>';
function cartItem(c){var i=BY[c.code];return {key:'C:'+c.code,code:c.code,desc:c.desc||'',card:c.card,price:c.price,stock:c.stock,per:c.per,est:c.est,unitName:c.unitName,qty:c.qty}}
function build(){
 S={};uid=0;var h='';
 h+='<section class="os sA"><div class="band"><span class="tag">Phần A</span><h2>Sản phẩm khách đặt</h2><p>Gồm sản phẩm còn hàng và sản phẩm cũ đã xóa mã (kèm gợi ý thay thế). Mỗi mã mặc định 3 hộp.</p></div><div class="scroll"><table>'+HEAD+'<tbody>';
 h+='<tr class="grp"><td colspan="9">A1 · Sản phẩm còn hàng<small>'+DATA.own.length+' mã khách ghi trên giấy</small></td></tr>';
 DATA.own.forEach(function(e){var ask=(e.asked&&e.asked!==e.code)?'<div class="ask">Khách ghi: <b>'+esc(e.asked)+'</b></div>':'';var note=e.note?'<div class="ask">'+esc(e.note)+'</div>':'';h+=row(e,'A',true,ask+note)});
 h+='<tr class="grp"><td colspan="9">A2 · Sản phẩm cũ, công ty đã xóa mã<small>không đặt được, tích chọn mã thay thế nếu khách đồng ý</small></td></tr>';
 DATA.old.forEach(function(o){
  h+='<tr class="oldrow"><td></td><td colspan="8"><span class="badge">Sản phẩm cũ · đã xóa mã</span><span class="oldname">'+esc(o.asked)+'</span>'+(o.desc?'<span class="desc"> · '+esc(o.desc)+'</span>':'')+'</td></tr>';
  if(o.reps.length){o.reps.forEach(function(r){h+=row(r,'A',false,'','<span class="sug">Gợi ý thay thế</span>')})}
  else h+='<tr class="none"><td></td><td colspan="8">Không có mã thay thế.</td></tr>';
 });
 h+='</tbody></table></div></section>';
 h+='<section class="os sB"><div class="band"><span class="tag">Phần B</span><h2>Sản phẩm gợi ý thêm</h2><p>Nghĩa tư vấn thêm, mỗi mã mặc định 3 hộp. Tích chọn dòng khách đồng ý để cộng vào tổng đơn.</p></div><div class="scroll"><table>'+HEAD+'<tbody>';
 DATA.adv.forEach(function(a){
  h+='<tr class="grp"><td colspan="9">'+esc(a.name)+(a.note?'<small>'+esc(a.note)+'</small>':'')+'</td></tr>';
  if(!a.items.length)h+='<tr class="none"><td></td><td colspan="8">Nghĩa chọn 2 mã khác nhau, mỗi mã lấy đủ màu.</td></tr>';
  a.items.forEach(function(e){h+=row(e,'B',false,'')});
 });
 h+='</tbody></table></div></section>';
 h+='<section class="os sC"><div class="band"><span class="tag">Phần C</span><h2>Khách chọn thêm từ danh mục</h2><p>Sản phẩm khách tự chọn khi xem danh mục. Bấm tab Danh mục sản phẩm rồi bấm ＋ trên thẻ để thêm.</p></div>';
 if(!CART.length)h+='<div class="empty"><span>Chưa có sản phẩm nào.</span><button class="btn" id="gocat">Xem danh mục sản phẩm</button></div>';
 else{h+='<div class="scroll"><table>'+HEAD+'<tbody>';CART.forEach(function(c){h+=row(cartItem(c),'C',true,'')});h+='</tbody></table></div>'}
 h+='</section>';
 h+='<div class="sumbox" id="sumbox"></div><div style="margin-top:12px"><button class="btn pri" id="bsend" style="width:100%;min-height:52px;font-size:1.05rem">Tải ảnh đơn hàng về máy</button><button class="btn" id="bcopy" style="width:100%;min-height:44px;margin-top:8px">Sao chép nội dung đơn</button><button class="btn" id="breset" style="width:100%;min-height:44px;margin-top:8px">Xóa giỏ, làm đơn mới</button></div>';
 h+='<div class="foot-note"><span>Thành tiền = số lượng × cái/hộp × đơn giá khách B. Sửa số lượng, tích hoặc bỏ tích từng dòng thì tổng đơn tự cập nhật.</span><span>Dấu * là số cái/hộp ước tính vì chưa có quy cách trong file CTKM, cần xác nhận lại. Dòng "Vượt tồn" là số lượng đặt lớn hơn tồn HCM.</span></div>';
 document.getElementById('app').innerHTML=h;
 if(!DATA.own.length&&!DATA.old.length){var sa=document.querySelector('.sA');if(sa)sa.hidden=true}
 if(!DATA.adv.length){var sb2=document.querySelector('.sB');if(sb2)sb2.hidden=true}
}
var tot={A:0,B:0,C:0},cnt={A:0,B:0,C:0};
function recalc(){
 tot={A:0,B:0,C:0};cnt={A:0,B:0,C:0};
 Object.keys(S).forEach(function(k){var s=S[k],e=s.e,r=s.r,u=unit(e);var tr=document.querySelector('tr[data-k="'+k.replace(/"/g,'\\"')+'"]');if(!tr)return;
  var pcs=r.qty*r.per,amt=u==null?0:u*pcs;
  tr.classList.toggle('off',!r.on);
  tr.querySelector('.pcs').textContent=vn(pcs);
  tr.querySelector('.amt').textContent=u==null?'—':vn(amt)+'đ';
  var st=tr.querySelector('[data-st]');
  if(e.stock!=null&&pcs>e.stock&&r.on){st.className='st warn';st.textContent='Vượt tồn ('+vn(e.stock)+')'}
  else{st.className='st'+((e.stock==null||e.stock<=0)?' no':'');st.textContent=e.stock==null?'Hỏi lại sales':(e.stock>0?'Còn '+vn(e.stock):'Hỏi lại sales')}
  if(r.on&&r.qty>0){tot[s.sec]+=amt;cnt[s.sec]++}
 });
 var g=tot.A+tot.B+tot.C,n=cnt.A+cnt.B+cnt.C;
 document.getElementById('gt').textContent=vn(g)+'đ';
 document.getElementById('cn').textContent='('+n+' mã)';
 var sb=document.getElementById('sumbox');
 if(sb)sb.innerHTML='<div class="l"><span>A · Khách đặt ('+cnt.A+' mã)</span><b>'+vn(tot.A)+'đ</b></div><div class="l"><span>B · Gợi ý thêm đã chọn ('+cnt.B+' mã)</span><b>'+vn(tot.B)+'đ</b></div><div class="l"><span>C · Khách chọn thêm ('+cnt.C+' mã)</span><b>'+vn(tot.C)+'đ</b></div><div class="l g"><span>Tổng đơn</span><span>'+vn(g)+'đ</span></div>';
 refreshBtns();save();
}
var app=document.getElementById('app');
app.addEventListener('input',function(ev){var tr=ev.target.closest('tr[data-k]');if(!tr)return;var s=S[tr.dataset.k];if(!s)return;
 if(ev.target.classList.contains('qty'))s.r.qty=Math.max(0,parseInt(ev.target.value)||0);
 if(ev.target.classList.contains('per'))s.r.per=Math.max(1,parseInt(ev.target.value)||1);
 if(ev.target.classList.contains('ck'))s.r.on=ev.target.checked;
 recalc()});
app.addEventListener('click',function(ev){var t=ev.target;
 if(t.id==='gocat'){tab('c');return}
 if(t.id==='bcopy'){openCopy();return}
 if(t.id==='bsend'){downloadOrder();return}
 if(t.id==='breset'){if(!t.dataset.s){t.dataset.s=1;t.textContent='Bấm lại để xác nhận xóa giỏ (hãy chắc đã tải ảnh đơn)';setTimeout(function(){delete t.dataset.s;t.textContent='Xóa giỏ, làm đơn mới'},6000);return}resetOrder();toast('Đã xóa giỏ, bắt đầu đơn mới');return}
 var rm=t.closest&&t.closest('[data-rm]');
 if(rm){var code=rm.getAttribute('data-rm');CART=CART.filter(function(c){return c.code!==code});delete ROWS['C:'+code];build();recalc();return}
 if(t.tagName==='IMG'&&t.classList.contains('zoomable')){var z=document.getElementById('zb');document.getElementById('zbi').src=t.src;document.getElementById('zbi').alt=t.alt;document.getElementById('zbc').textContent=t.alt;z.classList.add('on')}});
var zb=document.getElementById('zb');
zb.addEventListener('click',function(){zb.classList.remove('on')});
/* tabs */
var scr={o:0,c:0},cur='o';
function tab(w){if(w===cur)return;scr[cur]=window.scrollY;cur=w;
 document.getElementById('p-o').hidden=w!=='o';document.getElementById('p-c').hidden=w!=='c';
 document.getElementById('tb-o').setAttribute('aria-selected',w==='o');document.getElementById('tb-c').setAttribute('aria-selected',w==='c');
 document.getElementById('srow').classList.toggle('on',w==='c');
 window.scrollTo(0,scr[w]||0)}
document.getElementById('tb-o').onclick=function(){tab('o')};document.getElementById('tb-c').onclick=function(){tab('c')};
/* overlay buttons on catalogue cards */
function realCodes(i){return CL[i][3]}
function inCart(i){return CART.some(function(c){return c.card===i})}
function cartQty(i){var n=0;CART.forEach(function(c){if(c.card===i)n+=c.qty});return n}
function mkAdd(i,x,y,H){var b=document.createElement('button');b.className='add';b.type='button';b.dataset.i=i;b.setAttribute('aria-label','Thêm '+CL[i][3][0]+' vào đơn');
 b.style.left=(x/1080*100)+'%';b.style.top=(y/H*100)+'%';b.textContent='＋';return b}
function buildOverlays(){
 document.querySelectorAll('#all a.card').forEach(function(a){
  var m=/img\/(\d+)\.jpg/.exec(a.getAttribute('href')||'');if(!m)return;var p=+m[1];
  var w=document.createElement('div');w.className='pgw';a.parentNode.insertBefore(w,a);w.appendChild(a);
  var H=PH[p]||2140;var ov=document.createElement('div');ov.className='ov';ov.style.aspectRatio='1080/'+H;
  (PG[p]||[]).forEach(function(i){var c=CL[i];ov.appendChild(mkAdd(i,c[1]+488,c[2]+602,H))});
  w.appendChild(ov)})}
function refreshBtns(){document.querySelectorAll('#cat .add').forEach(function(b){var i=+b.dataset.i,n=cartQty(i);b.classList.toggle('in',n>0);b.textContent=n>0?(n+''):'＋'})}
window.wrapRc=function(a,d){
 var w=document.createElement('div');w.className='rcw';w.appendChild(a);
 var i=BY[d[0]];if(i==null){var H=PH[d[1]]||2140,X=d[2]/100*585,Y=d[3]/100*(H-610);(PG[d[1]]||[]).forEach(function(j){if(Math.abs(CL[j][1]-X)<40&&Math.abs(CL[j][2]-Y)<80)i=j})}
 if(i!=null){var b=document.createElement('button');b.type='button';b.className='btn add2';b.dataset.i=i;b.textContent='＋ Thêm vào đơn';w.appendChild(b)}
 return w};
document.addEventListener('click',function(ev){var b=ev.target.closest&&ev.target.closest('#cat .add,#cat .add2');if(b){ev.preventDefault();openQ(+b.dataset.i)}});
document.getElementById('lbadd').addEventListener('click',function(){var c=window.__lbCur;if(!c)return;var i=null;(PG[c.p]||[]).forEach(function(j){if(CL[j][1]===c.x&&CL[j][2]===c.y)i=j});if(i!=null)openQ(i)});
/* quantity popup */
var Q=null;
function info(code){var r=CI[code]||[null,1,'unk',1];return {stock:r[0],per:r[1],kind:r[2],est:!!r[3]}}
function openQ(i){
 var c=CL[i],codes=c[3];var ex=null;CART.forEach(function(x){if(x.card===i)ex=x});
 var sel=ex?ex.code:codes[0];
 Q={i:i,code:sel,ex:ex};
 renderQ(ex?ex.qty:1,true)}
function renderQ(qty,first){
 var i=Q.i,c=CL[i],codes=c[3],inf=info(Q.code);
 var un=(inf.kind==='unk'||inf.kind==='one')?'cái':'hộp';
 var rule='';
 if(inf.kind==='one')rule='<div class="rule"><span>Sản phẩm giá cao, bán lẻ được.</span><span>Được đặt <b>lẻ từ 1 cái</b>.</span></div>';
 else if(inf.kind==='box'&&!inf.est)rule='<div class="rule"><span>Quy cách: <b>1 hộp = '+inf.per+' cái</b></span><span>Đặt tối thiểu <b>1 hộp</b>, nhập số hộp.</span></div>';
 else if(inf.kind==='box')rule='<div class="rule w"><span>Quy cách ước tính: <b>1 hộp ≈ '+inf.per+' cái</b></span><span>Nghĩa sẽ xác nhận lại. Đặt tối thiểu 1 hộp.</span></div>';
 else if(inf.kind==='set')rule='<div class="rule"><span>Sản phẩm <b>đóng sẵn nguyên hộp</b>.</span><span>Đặt tối thiểu <b>1 hộp</b>.</span></div>';
 else rule='<div class="rule w"><span>Chưa có quy cách hộp cho mã này.</span><span>Đặt tối thiểu <b>1 cái</b>, Nghĩa sẽ xác nhận lại quy cách.</span></div>';
 var stt=(inf.stock==null||inf.stock<=0)?'<span class="st no">Hỏi lại sales</span>':'<span class="st">Còn '+vn(inf.stock)+' cái</span>';
 if(inf.stock===0)rule+='<div class="rule w" style="margin-top:6px"><span><b>Hỏi lại sales về tồn kho.</b></span><span>Vẫn thêm được, Nghĩa sẽ xác nhận hàng khi chốt đơn.</span></div>';
 var h='<div class="pv" style="'+cropStyle(c)+'"></div>';
 h+='<div class="row">'+(codes.length>1?'<select id="qsel" aria-label="Chọn mã">'+codes.map(function(k){return '<option value="'+esc(k)+'"'+(k===Q.code?' selected':'')+'>'+esc(k)+'</option>'}).join('')+'</select>':'<h3>'+esc(Q.code)+'</h3>')+stt+'</div>';
 h+='<div class="row"><span>Đơn giá khách B</span><b style="color:var(--red);font-size:18px">'+vn(c[4])+'đ / cái</b></div>';
 h+=rule;
 h+='<div class="row"><span>Số '+un+' đặt</span><div class="step"><button type="button" id="qm1" aria-label="Giảm">−</button><input id="qin" type="number" inputmode="numeric" min="1" value="'+qty+'"><button type="button" id="qp1" aria-label="Tăng">+</button></div></div>';
 h+='<div class="calc" id="qcalc"></div><div class="rule w" id="qwarn" hidden></div>';
 h+='<div class="acts"><button class="btn" id="qcancel" type="button">Hủy</button><button class="btn pri" id="qok" type="button">'+(Q.ex?'Cập nhật đơn':'Thêm vào đơn')+'</button></div>';
 var pn=document.getElementById('qpn');pn.innerHTML=h;document.getElementById('qm').classList.add('on');
 var inp=document.getElementById('qin');
 function upd(){var n=Math.max(1,parseInt(inp.value)||1);var pcs=n*inf.per;
  document.getElementById('qcalc').innerHTML=pcs+' cái × '+vn(c[4])+'đ<b>'+vn(pcs*c[4])+'đ</b>';
  var w=document.getElementById('qwarn'),ok=document.getElementById('qok');
  if(inf.stock!=null&&pcs>inf.stock){w.hidden=false;w.textContent='Số lượng vượt tồn HCM (còn '+vn(inf.stock)+' cái). Nghĩa sẽ xác nhận lại khi chốt đơn.';ok.disabled=false}
  else{w.hidden=true;ok.disabled=false}}
 inp.oninput=upd;upd();
 document.getElementById('qm1').onclick=function(){inp.value=Math.max(1,(parseInt(inp.value)||1)-1);upd()};
 document.getElementById('qp1').onclick=function(){inp.value=(parseInt(inp.value)||0)+1;upd()};
 var s=document.getElementById('qsel');if(s)s.onchange=function(){Q.code=s.value;renderQ(Math.max(1,parseInt(inp.value)||1))};
 document.getElementById('qcancel').onclick=closeQ;
 document.getElementById('qok').onclick=function(){var n=Math.max(1,parseInt(inp.value)||1);addCart(n)};
 if(first)setTimeout(function(){try{inp.focus();inp.select()}catch(e){}},50)}
function closeQ(){document.getElementById('qm').classList.remove('on');Q=null}
document.getElementById('qm').addEventListener('click',function(ev){if(ev.target.id==='qm')closeQ()});
document.addEventListener('keydown',function(ev){if(ev.key==='Escape'){if(Q)closeQ();document.getElementById('zb').classList.remove('on')}});
var tt=null;
function toast(msg){document.getElementById('tmsg').textContent=msg;var t=document.getElementById('toast');t.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('on')},3500)}
document.getElementById('tgo').onclick=function(){document.getElementById('toast').classList.remove('on');var lb=document.getElementById('lb');if(lb&&lb.classList.contains('on')){var x=document.getElementById('lbx');if(x)x.click()}tab('o');setTimeout(function(){var s=document.querySelector('.sC');if(s)s.scrollIntoView({behavior:'smooth',block:'start'})},60)};
function addCart(n){
 var i=Q.i,c=CL[i],inf=info(Q.code);
 CART=CART.filter(function(x){return !(x.card===i)});
 CART.push({code:Q.code,card:i,price:c[4],stock:inf.stock,per:inf.per,est:inf.est&&inf.kind==='box',unitName:(inf.kind==='unk'||inf.kind==='one')?'cái':'hộp',qty:n,desc:inf.kind==='unk'?'':''});
 delete ROWS['C:'+Q.code];ROWS['C:'+Q.code]={on:true,qty:n,per:inf.per};
 var code=Q.code,un=(inf.kind==='unk'||inf.kind==='one')?'cái':'hộp';closeQ();build();recalc();toast('Đã thêm '+code+' · '+n+' '+un)}
/* copy order text */
function orderText(){
 var L=['ĐƠN HÀNG DELI · giá khách B · '+new Date().toLocaleDateString('vi-VN'),''];
 [['A','A. Khách đặt'],['B','B. Gợi ý thêm đã chọn'],['C','C. Khách chọn thêm']].forEach(function(p){
  var rows=[];Object.keys(S).forEach(function(k){var s=S[k];if(s.sec===p[0]&&s.r.on&&s.r.qty>0){var u=unit(s.e);var pcs=s.r.qty*s.r.per;rows.push('- '+s.e.code+' · '+s.r.qty+' '+(s.e.unitName||'hộp')+(s.r.per>1?' ('+pcs+' cái)':'')+' · '+(u==null?'chưa có giá':vn(u)+'đ/cái')+' · '+(u==null?'—':vn(u*pcs)+'đ')+(s.e.stock===0?' · HỎI LẠI SALES':''))}});
  if(rows.length){L.push(p[1]+' ('+vn(tot[p[0]])+'đ)');L=L.concat(rows);L.push('')}});
 L.push('TỔNG ĐƠN: '+vn(tot.A+tot.B+tot.C)+'đ');return L.join('\n')}
function openCopy(){
 var t=orderText(),pn=document.getElementById('qpn');
 pn.innerHTML='<h3 style="font-family:var(--sans)">Nội dung đơn hàng</h3><textarea id="ot" readonly></textarea><div class="acts"><button class="btn" id="qcancel" type="button">Đóng</button><button class="btn pri" id="ocp" type="button">Sao chép</button></div>';
 document.getElementById('ot').value=t;document.getElementById('qm').classList.add('on');Q=null;
 document.getElementById('qcancel').onclick=closeQ;
 document.getElementById('ocp').onclick=function(){var ta=document.getElementById('ot'),b=this;ta.focus();ta.select();var ok=false;
  try{ok=document.execCommand('copy')}catch(e){}
  if(!ok&&navigator.clipboard){navigator.clipboard.writeText(t).then(function(){b.textContent='Đã sao chép'},function(){b.textContent='Hãy giữ và chọn Sao chép'});return}
  b.textContent=ok?'Đã sao chép':'Hãy giữ và chọn Sao chép'}}

/* ---- gửi đơn: ảnh + chia sẻ + lưu cho Nghĩa + reset ---- */
function orderLines(){var out=[];[['A','A. Khách đặt'],['B','B. Gợi ý thêm đã chọn'],['C','C. Khách chọn thêm']].forEach(function(p){
 var rs=[];Object.keys(S).forEach(function(k){var s=S[k];if(s.sec===p[0]&&s.r.on&&s.r.qty>0){var u=unit(s.e),pcs=s.r.qty*s.r.per;rs.push({code:s.e.code,name:(s.e.desc||(window.NM&&NM[s.e.code])||'')+(s.e.stock===0?' · HỎI LẠI SALES':''),qty:s.r.qty,un:s.e.unitName||'hộp',pcs:pcs,u:u,amt:u==null?0:u*pcs})}});
 if(rs.length)out.push({t:p[1],sum:tot[p[0]],rows:rs})});return out}
function drawOrder(groups,total){
 var W=1000,P=28,RH=64,GH=52,HH=150,FH=110,n=0;groups.forEach(function(g){n+=g.rows.length});
 var H=HH+groups.length*GH+n*RH+FH,sc=2,cv=document.createElement('canvas');cv.width=W*sc;cv.height=H*sc;var x=cv.getContext('2d');x.scale(sc,sc);
 var F='"Be Vietnam Pro",system-ui,-apple-system,Segoe UI,Roboto,sans-serif';
 x.fillStyle='#f0f2f7';x.fillRect(0,0,W,H);x.fillStyle='#d61e28';x.fillRect(0,0,W,HH-20);
 x.fillStyle='#fff';x.font='700 38px '+F;x.fillText('Đơn hàng khách chọn',P,62);x.font='500 22px '+F;x.fillText('Giá khách B · '+new Date().toLocaleString('vi-VN'),P,100);
 var y=HH;
 function fit(t,w,font){x.font=font;if(x.measureText(t).width<=w)return t;while(t.length>1&&x.measureText(t+'…').width>w)t=t.slice(0,-1);return t+'…'}
 groups.forEach(function(g){x.fillStyle='#3c4050';x.fillRect(0,y,W,GH-8);x.fillStyle='#fff';x.font='700 24px '+F;x.fillText(g.t,P,y+30);x.textAlign='right';x.fillText(vn(g.sum)+'đ',W-P,y+30);x.textAlign='left';y+=GH;
  g.rows.forEach(function(r){x.fillStyle='#fff';x.beginPath();x.roundRect?x.roundRect(12,y,W-24,RH-8,10):x.rect(12,y,W-24,RH-8);x.fill();
   x.fillStyle='#1b1d27';x.font='700 24px '+F;x.fillText(r.code,P,y+27);
   x.fillStyle='#6b7080';x.font='400 19px '+F;x.fillText(fit(r.name,430,'400 19px '+F),P,y+49);
   x.fillStyle='#1b1d27';x.font='600 22px '+F;x.textAlign='right';x.fillText(r.qty+' '+r.un+(r.per>1&&r.un==='hộp'?'':''),600,y+27);
   x.fillStyle='#6b7080';x.font='400 18px '+F;x.fillText(r.pcs+' cái',600,y+49);
   x.fillStyle='#1b1d27';x.font='400 20px '+F;x.fillText(r.u==null?'chưa có giá':vn(r.u)+'đ',770,y+27);
   x.fillStyle='#d61e28';x.font='700 24px '+F;x.fillText(r.u==null?'—':vn(r.amt)+'đ',W-P,y+27);x.textAlign='left';y+=RH})});
 y+=6;x.fillStyle='#ffebec';x.fillRect(12,y,W-24,70);x.fillStyle='#1b1d27';x.font='700 26px '+F;x.fillText('TỔNG ĐƠN',P,y+44);x.fillStyle='#d61e28';x.font='800 36px '+F;x.textAlign='right';x.fillText(vn(total)+'đ',W-P,y+47);x.textAlign='left';
 return cv}
function openSend(){
 var groups=orderLines(),total=tot.A+tot.B+tot.C,pn=document.getElementById('qpn');
 if(!groups.length){toast('Chưa chọn sản phẩm nào để gửi');return}
 var text=orderText();pn.innerHTML='<h3 style="font-family:var(--sans)">Gửi đơn hàng</h3><div id="sdi" style="text-align:center;color:var(--muted);padding:20px 0">Đang tạo ảnh đơn…</div><div id="sdm" class="desc" style="margin:8px 0"></div><div class="acts" style="flex-wrap:wrap;gap:8px"><button class="btn pri" id="sdph" type="button" style="flex:1 1 100%;min-height:52px" disabled>Lưu vào Ảnh (điện thoại)</button><button class="btn" id="sdsv" type="button" style="flex:1 1 100%;min-height:44px" disabled>Tải file ảnh về máy</button><button class="btn" id="sdcp" type="button" style="flex:1">Sao chép nội dung</button><button class="btn" id="sdok" type="button" style="flex:1 1 100%;min-height:48px">Xong · xóa giỏ, làm đơn mới</button><button class="btn" id="sdx" type="button" style="flex:1 1 100%">Quay lại chỉnh đơn</button></div>';
 document.getElementById('qm').classList.add('on');Q=null;
 var cv=drawOrder(groups,total),blob=null,fname='don-hang-'+new Date().toISOString().slice(0,16).replace(/[:T]/g,'-')+'.png';
 var box=document.getElementById('sdi'),msg=document.getElementById('sdm');
 function say(t){msg.textContent=t}
 cv.style.cssText='width:100%;height:auto;border-radius:10px;border:1px solid var(--line);max-height:46vh;object-fit:contain';box.textContent='';box.appendChild(cv);

 if(window.CONFIG&&CONFIG.FORM_URL){fetch(CONFIG.FORM_URL,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({subject:'Đơn hàng Deli '+new Date().toLocaleDateString('vi-VN')+' · '+vn(total)+'đ',message:text,total:total})}).then(function(r){say(r.ok?'✓ Đơn đã được gửi cho Nghĩa.':'Chưa gửi tự động được, hãy gửi ảnh hoặc nội dung đơn cho Nghĩa.')}).catch(function(){say('Chưa gửi tự động được, hãy gửi ảnh hoặc nội dung đơn cho Nghĩa.')})}
 /* lưu đơn cho Nghĩa (nếu có quyền) */
 var saved=false;
 (async function(){try{var db=window.claude&&await claude.use('db');if(!db)return;
  var id='o'+Date.now().toString(36)+Math.random().toString(36).slice(2,6);
  await db.doc('orders/'+id).set({at:new Date().toISOString(),total:total,count:cnt.A+cnt.B+cnt.C,text:text,lines:groups.map(function(g){return{sec:g.t,sum:g.sum,rows:g.rows.map(function(r){return[r.code,r.qty,r.un,r.pcs,r.u,r.amt]})}})});
  saved=true;say('✓ Đơn đã được lưu cho Nghĩa. Bạn vẫn có thể gửi thêm ảnh qua Zalo.')}catch(e){say('Chưa lưu được đơn lên hệ thống — hãy gửi ảnh cho Nghĩa qua Zalo.')}})();
 cv.toBlob(function(b){blob=b;var im=new Image();im.src=URL.createObjectURL(b);im.alt='Ảnh đơn hàng';im.style.cssText=cv.style.cssText;if(cv.parentNode)cv.parentNode.replaceChild(im,cv);document.getElementById('sdsv').disabled=false;document.getElementById('sdph').disabled=false;},'image/png');
 document.getElementById('sdph').onclick=async function(){
  try{var f=new File([blob],fname,{type:'image/png'});
   if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:'Đơn hàng Deli'});say('Trong bảng vừa hiện, chọn “Lưu hình ảnh” (iPhone) hoặc “Lưu vào Thư viện / Ảnh” (Android).');return}}catch(e){if(e&&e.name==='AbortError')return}
  say('Máy này không mở được bảng chia sẻ. Ảnh sẽ hiện toàn màn hình: hãy giữ lâu lên ảnh rồi chọn “Lưu vào Ảnh” / “Tải ảnh”.');showImg(blob)};
 document.getElementById('sdsv').onclick=async function(){
  try{var d=window.claude&&await claude.use('downloads');if(d){await d.save({filename:fname,data:blob});say('Đã gửi yêu cầu lưu ảnh.');return}}catch(e){if(e&&e.code==='declined')return}
  try{var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fname;document.body.appendChild(a);a.click();setTimeout(function(){a.remove()},500)}catch(e){}
  say('Đã tải ảnh về máy (xem trong mục Tải xuống). Nếu không thấy, hãy bấm "Xem ảnh" rồi giữ lâu lên ảnh để lưu.');
  var b2=document.getElementById('sdv2');if(!b2){b2=document.createElement('button');b2.id='sdv2';b2.type='button';b2.className='btn';b2.textContent='Xem ảnh';b2.style.cssText='flex:1 1 100%';this.parentNode.insertBefore(b2,this.nextSibling);b2.onclick=function(){showImg(blob)}}};
 document.getElementById('sdcp').onclick=function(){var b=this,ok=false;try{var ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();ok=document.execCommand('copy');ta.remove()}catch(e){}
  if(!ok&&navigator.clipboard){navigator.clipboard.writeText(text).then(function(){b.textContent='Đã sao chép'});return}b.textContent=ok?'Đã sao chép':'Hãy chọn thủ công'};
 document.getElementById('sdx').onclick=closeQ;
  document.getElementById('sdok').onclick=function(){var b=this;if(!b.dataset.s){b.dataset.s=1;b.textContent='Bấm lại để xác nhận xóa giỏ (hãy chắc đã gửi đơn)';return}resetOrder();closeQ();toast('Đã xóa giỏ, bắt đầu đơn mới')}}
var IN_APP=/Zalo|FBAN|FBAV|Messenger|Instagram|Line\//i.test(navigator.userAgent),IS_AND=/Android/i.test(navigator.userAgent),IS_IOS=/iPhone|iPad|iPod/i.test(navigator.userAgent);
function openExternal(){var u=location.href;
 if(IS_AND){location.href='intent://'+u.replace(/^https?:\/\//,'')+'#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url='+encodeURIComponent(u)+';end';return}
 copyLink()}
function copyLink(){var u=location.href,ok=false;try{var ta=document.createElement('textarea');ta.value=u;document.body.appendChild(ta);ta.select();ok=document.execCommand('copy');ta.remove()}catch(e){}
 if(!ok&&navigator.clipboard)navigator.clipboard.writeText(u);toast('Đã sao chép link. Dán vào Chrome/Safari để mở.')}
function inAppBanner(){if(!IN_APP||document.getElementById('inappb'))return;var d=document.createElement('div');d.id='inappb';
 d.style.cssText='background:#fff3cd;color:#5c4400;border-bottom:1px solid #f0d98a;padding:10px 14px;font:500 14px/1.45 system-ui,sans-serif';
 d.innerHTML='Bạn đang mở trong ứng dụng (Zalo/Facebook) nên có thể <b>không tải được ảnh</b>. Hãy mở bằng trình duyệt: bấm dấu <b>⋯</b> góc phải → <b>“Mở bằng trình duyệt”</b>. <button id="inappo" style="margin-top:6px;background:#d61e28;color:#fff;border:0;border-radius:8px;padding:8px 12px;font-weight:700">'+(IS_AND?'Mở bằng Chrome':'Sao chép link')+'</button> <button id="inappc" style="margin-top:6px;background:#fff;border:1px solid #d6b84a;border-radius:8px;padding:8px 12px;font-weight:700">Sao chép link</button>';
 document.body.insertBefore(d,document.body.firstChild);document.getElementById('inappo').onclick=openExternal;document.getElementById('inappc').onclick=copyLink}
inAppBanner();

function dataToBlob(u){var p=u.split(','),m=/:(.*?);/.exec(p[0])[1],bin=atob(p[1]),n=bin.length,a=new Uint8Array(n);while(n--)a[n]=bin.charCodeAt(n);return new Blob([a],{type:m})}
function downloadOrder(){
 var groups=orderLines(),total=tot.A+tot.B+tot.C;
 if(!groups.length){toast('Chưa chọn sản phẩm nào');return}
 var cv=drawOrder(groups,total),fname='don-hang-'+new Date().toISOString().slice(0,16).replace(/[:T]/g,'-')+'.png';
 var url=cv.toDataURL('image/png'),blob=dataToBlob(url);
 try{var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=fname;a.style.display='none';document.body.appendChild(a);a.click();setTimeout(function(){a.remove()},1500)}catch(e){}
 if(window.CONFIG&&CONFIG.FORM_URL){fetch(CONFIG.FORM_URL,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({subject:'Đơn hàng Deli '+new Date().toLocaleDateString('vi-VN')+' · '+vn(total)+'đ',message:orderText(),total:total})}).catch(function(){})}
 showImg(blob,fname)}
function showImg(blob,fname){var o=document.getElementById('imgv');if(!o){o=document.createElement('div');o.id='imgv';o.style.cssText='position:fixed;inset:0;z-index:1300;background:#0b0d14;overflow:auto;-webkit-overflow-scrolling:touch';document.body.appendChild(o)}
 o.innerHTML='<div style="position:sticky;top:0;z-index:2;background:#d61e28;color:#fff;padding:12px 16px;font:600 15px/1.4 system-ui,sans-serif">'+(IN_APP?'Zalo không cho tải file. <b>Giữ lâu lên ảnh</b> bên dưới rồi chọn “Lưu ảnh”, hoặc mở link bằng trình duyệt (Chrome/Safari) để tải.':'Ảnh đơn hàng đã được tải về máy (mục Tải xuống). Nếu chưa thấy: <b>giữ lâu lên ảnh</b> rồi chọn “Lưu ảnh / Tải ảnh”, hoặc bấm nút bên dưới.')+'<div style="margin-top:10px;display:flex;gap:8px"><button id="imgvs" style="flex:1;background:#fff;color:#d61e28;border:0;border-radius:8px;padding:10px;font-weight:700">Lưu vào Ảnh / Chia sẻ</button><button id="imgvx" style="background:rgba(255,255,255,.2);color:#fff;border:0;border-radius:8px;padding:10px 16px;font-weight:700">Đóng</button></div></div><img alt="Ảnh đơn hàng" style="display:block;width:100%;max-width:900px;margin:0 auto;background:#fff"/>';
 o.querySelector('img').src=URL.createObjectURL(blob);o.style.display='block';o.scrollTop=0;
 document.getElementById('imgvx').onclick=function(){o.style.display='none'};
 document.getElementById('imgvs').onclick=function(){var f=new File([blob],fname||'don-hang.png',{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[f]})){navigator.share({files:[f],title:'Đơn hàng Deli'}).catch(function(){})}
  else{var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=f.name;document.body.appendChild(a);a.click();setTimeout(function(){a.remove()},1500)}}}

function resetOrder(){ROWS={};CART=[];S={};try{localStorage.removeItem(KEY)}catch(e){}build();recalc();buildOverlays();refreshBtns();tab('o');window.scrollTo(0,0)}
build();recalc();buildOverlays();refreshBtns();
})();
