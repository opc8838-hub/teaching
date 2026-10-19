const deck = document.getElementById('deck');
const slidesData = window.lessonSlides;
const assets = window.lessonAssets;
const pad = value => String(value).padStart(2,'0');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeIndex = 0;
let wheelLock = 0;
let wheelSum = 0;
let touchStart = null;
let toastTimer = null;
let opener = null;
const checks = new Set();

deck.innerHTML = slidesData.map((item,i) => '<section class="slide '+item.layout+'" id="slide-'+(i+1)+'" data-theme="'+item.theme+'" aria-label="第 '+(i+1)+' 屏，'+item.title+'"><div class="slide-frame"><div class="slide-meta"><span>'+item.chapter+' <b>/</b> '+item.title+'</span><span>'+pad(i+1)+' / '+pad(slidesData.length)+' <i>·</i> '+item.minutes+' MIN</span></div><div class="slide-body">'+item.html+'</div><div class="slide-foot"><span>'+item.foot+'</span><span>WORKBUDDY / AGENT × SKILL</span></div></div></section>').join('');
const slides = Array.from(deck.querySelectorAll('.slide'));
document.getElementById('total-number').textContent = pad(slides.length);
const menu = document.getElementById('menu-list');
menu.innerHTML = slidesData.map((s,i) => '<button type="button" data-jump="'+i+'"><small>'+pad(i+1)+' · '+s.chapter+' · '+s.minutes+' 分钟</small><span>'+s.title+'</span></button>').join('');

function animateHeading(element) {
  const original = element.textContent;
  element.setAttribute('aria-label',original);
  let count = 0;
  function walk(node) {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        Array.from(child.textContent).forEach(char => {
          if (char === '\n') return;
          const span = document.createElement('span');
          span.className = 'glyph';
          span.setAttribute('aria-hidden','true');
          span.style.setProperty('--delay',Math.min(count++,34)*14+'ms');
          span.textContent = char === ' ' ? '\u00a0' : char;
          frag.appendChild(span);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') walk(child);
    });
  }
  walk(element);
}
deck.querySelectorAll('.kinetic').forEach(animateHeading);

for (const pre of deck.querySelectorAll('[data-prompt-preview]')) {
  const value = assets[pre.dataset.promptPreview];
  pre.textContent = value.length > 360 ? value.slice(0,360)+'\n…' : value;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'expand-prompt';
  button.textContent = '展开查看完整指令 ↗';
  button.dataset.expand = pre.dataset.promptPreview;
  pre.after(button);
}

const dialog = document.createElement('dialog');
dialog.className = 'prompt-dialog';
dialog.innerHTML = '<div class="dialog-head"><strong>完整指令</strong><button type="button" data-close-dialog aria-label="关闭完整指令">×</button></div><pre id="dialog-prompt"></pre><div class="dialog-actions"><button type="button" id="dialog-copy">复制完整指令 ↗</button><button type="button" data-close-dialog>返回课件</button></div>';
document.body.appendChild(dialog);
let dialogValue = '';

function topOf(index) { return slides[index].offsetTop; }
function update(index) {
  activeIndex = index;
  slides.forEach((s,i) => s.classList.toggle('is-active',i===index));
  const item = slidesData[index];
  document.getElementById('current-number').textContent = pad(index+1);
  document.getElementById('chapter-name').textContent = item.chapter;
  document.getElementById('slide-title').textContent = item.title;
  document.getElementById('position-label').textContent = item.title;
  document.getElementById('progress-fill').style.width = ((index+1)/slides.length*100)+'%';
  document.getElementById('prev-button').disabled = index===0;
  document.getElementById('next-button').disabled = index===slides.length-1;
  const notes = document.getElementById('notes-content');
  notes.replaceChildren();
  const time = document.createElement('div'); time.className='notes-time'; time.textContent=pad(index+1)+' / '+item.minutes+' 分钟';
  const title = document.createElement('h3'); title.textContent=item.title;
  const p = document.createElement('p'); p.textContent=item.notes;
  notes.append(time,title,p);
  menu.querySelectorAll('[data-jump]').forEach((button,i) => button.setAttribute('aria-current',i===index?'page':'false'));
  history.replaceState(null,'','#slide-'+(index+1));
}
function goTo(index,instant=false) {
  const next = Math.max(0,Math.min(slides.length-1,index));
  if (next===activeIndex && !instant) return;
  update(next);
  deck.scrollTo({top:topOf(next),behavior:instant||reduceMotion.matches?'instant':'smooth'});
  wheelLock=performance.now()+(instant||reduceMotion.matches?120:560);
  wheelSum=0;
}
function closePanels() {
  for (const [panelId,buttonId] of [['notes-panel','notes-button'],['menu-panel','menu-button']]) {
    document.getElementById(panelId).hidden=true;
    document.getElementById(buttonId).setAttribute('aria-expanded','false');
  }
  if (opener) { opener.focus(); opener=null; }
}
function togglePanel(panelId,buttonId) {
  const panel=document.getElementById(panelId);
  const next=panel.hidden;
  closePanels();
  panel.hidden=!next;
  document.getElementById(buttonId).setAttribute('aria-expanded',String(next));
  if (next) { opener=document.getElementById(buttonId); panel.querySelector('button').focus(); }
}
function toast(message) {
  const el=document.getElementById('announcement');
  el.textContent=message; el.classList.add('show');
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove('show'),4000);
}
async function copyText(value,label) {
  try {
    await navigator.clipboard.writeText(value);
    toast('已复制：'+label);
  } catch {
    const textarea=document.createElement('textarea');
    textarea.value=value; document.body.appendChild(textarea); textarea.select();
    const success=document.execCommand('copy'); textarea.remove();
    toast(success?'已复制：'+label:'复制受限，请展开指令并手动选择文字');
  }
}

const form=document.getElementById('brief-form');
const generated=document.getElementById('generated-task');
let personalizedTask=''; let personalizedSkill='';
function field(name) { return (new FormData(form).get(name)||'').trim(); }
function buildPersonalized() {
  const topic=field('topic')||'我的活动';
  const title=field('title')||'请先询问我主标题';
  const subtitle=field('subtitle')||'无';
  const audience=field('audience')||'请先询问我';
  const use=field('use')||'请先询问我';
  const ratio=field('ratio')||'横版 16:9';
  const style=field('style')||'清晰、简洁、重点突出';
  personalizedTask=[
    '请为「'+topic+'」制作一张真正可下载的封面图',
    '主标题：'+title,
    '副标题：'+subtitle,
    '目标受众：'+audience,
    '使用场景：'+use,
    '画幅：'+ratio,
    '风格偏好：'+style,
    '先核对文字与使用场景，再规划信息层级、配色和安全区，然后生成图片文件',
    '不要自行编造日期、地点、单位名称或人物身份',
    '交付时告诉我如何在「产物」中打开或下载，并提醒我检查中文字、裁切与清晰度',
    '如果当前能力不能直接生图，请说明原因和切换办法，不要只给一段图片描述'
  ].join('\n');
  personalizedSkill=[
    '请创建一个名为「我的封面图助手」的 Skill，以后帮我反复制作活动、课程和文章封面',
    '我的常见受众：'+audience,
    '我的常见使用场景：'+use,
    '我偏好的视觉方向：'+style,
    '每次接收主题、主标题、副标题、受众、场景与画幅，缺少关键信息时先提不超过 3 个问题',
    '固定流程：核对信息 → 给出简短设计方案 → 生成真实图片文件 → 检查文字和画幅 → 告诉我下载位置',
    '不能自行编造日期、地点、单位名称和人物身份，不能把文字描述冒充图片交付',
    '若中文图片文字不准确，请交付无字背景和可复制的文字排版建议',
    '每次最终交付：图片文件、建议文件名、人工核对点',
    '请先展示技能名称、适用场景、输入项、工作步骤和输出标准，供我检查，再按当前界面完成创建或保存'
  ].join('\n');
  generated.textContent=personalizedTask;
  try { localStorage.setItem('cover-brief',JSON.stringify(Object.fromEntries(new FormData(form)))); } catch {}
}
try {
  const saved=JSON.parse(localStorage.getItem('cover-brief')||'null');
  if (saved) for (const [name,value] of Object.entries(saved)) if(form.elements[name]) form.elements[name].value=value;
} catch {}
form.addEventListener('input',buildPersonalized);
form.addEventListener('change',buildPersonalized);
buildPersonalized();

function openPrompt(value) {
  dialogValue=value;
  document.getElementById('dialog-prompt').textContent=value;
  dialog.showModal();
  dialog.querySelector('[data-close-dialog]').focus();
}
function closeDialog() { dialog.close(); }
dialog.addEventListener('click',event=>{ if(event.target===dialog) closeDialog(); });
dialog.querySelectorAll('[data-close-dialog]').forEach(b=>b.addEventListener('click',closeDialog));
document.getElementById('dialog-copy').addEventListener('click',()=>copyText(dialogValue,'完整指令'));

document.getElementById('prev-button').addEventListener('click',()=>goTo(activeIndex-1));
document.getElementById('next-button').addEventListener('click',()=>goTo(activeIndex+1));
document.getElementById('notes-button').addEventListener('click',()=>togglePanel('notes-panel','notes-button'));
document.getElementById('menu-button').addEventListener('click',()=>togglePanel('menu-panel','menu-button'));
document.getElementById('close-notes').addEventListener('click',closePanels);
document.getElementById('close-menu').addEventListener('click',closePanels);
document.getElementById('home-link').addEventListener('click',event=>{event.preventDefault();goTo(0);});
menu.addEventListener('click',event=>{const button=event.target.closest('[data-jump]');if(!button)return;closePanels();goTo(Number(button.dataset.jump),true);});

deck.addEventListener('wheel',event=>{
  if (dialog.open) return;
  event.preventDefault();
  const now=performance.now();
  if(now<wheelLock)return;
  wheelSum+=event.deltaY;
  if(Math.abs(wheelSum)<24)return;
  goTo(activeIndex+(wheelSum>0?1:-1));
  wheelSum=0;
},{passive:false});
deck.addEventListener('touchstart',event=>{const frame=event.target.closest('.slide-frame');touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY,mobile:innerWidth<=780,atTop:!frame||frame.scrollTop<=2,atBottom:!frame||frame.scrollTop+frame.clientHeight>=frame.scrollHeight-2};},{passive:true});
deck.addEventListener('touchmove',event=>{
  if(!touchStart||touchStart.mobile)return;
  const dx=event.touches[0].clientX-touchStart.x;
  const dy=event.touches[0].clientY-touchStart.y;
  if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8)event.preventDefault();
},{passive:false});
deck.addEventListener('touchend',event=>{
  if(!touchStart)return;
  const dx=event.changedTouches[0].clientX-touchStart.x;
  const dy=event.changedTouches[0].clientY-touchStart.y;
  const start=touchStart;touchStart=null;
  if(Math.abs(dy)<48||Math.abs(dy)<Math.abs(dx))return;
  if(start.mobile&&dy<0&&!start.atBottom)return;
  if(start.mobile&&dy>0&&!start.atTop)return;
  goTo(activeIndex+(dy<0?1:-1));
});
window.addEventListener('keydown',event=>{
  if(event.key==='Escape'){closePanels();return;}
  if(dialog.open)return;
  if(['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName))return;
  if(event.key.toLowerCase()==='n'&&!event.ctrlKey&&!event.metaKey&&!event.altKey){togglePanel('notes-panel','notes-button');return;}
  if(['ArrowDown','PageDown'].includes(event.key)||(event.key===' '&&document.activeElement.tagName!=='BUTTON')){event.preventDefault();goTo(activeIndex+1);}
  else if(['ArrowUp','PageUp'].includes(event.key)){event.preventDefault();goTo(activeIndex-1);}
  else if(event.key==='Home'){event.preventDefault();goTo(0);}
  else if(event.key==='End'){event.preventDefault();goTo(slides.length-1);}
});
window.addEventListener('resize',()=>deck.scrollTo({top:topOf(activeIndex),behavior:'instant'}));
window.addEventListener('hashchange',()=>{const m=location.hash.match(/^#slide-(\d+)$/);if(m)goTo(Number(m[1])-1,true);});

deck.addEventListener('click',event=>{
  const copy=event.target.closest('[data-copy]');
  if(copy){copyText(assets[copy.dataset.copy],'完整指令');return;}
  const generatedButton=event.target.closest('[data-copy-generated]');
  if(generatedButton){copyText(generatedButton.dataset.copyGenerated==='skill'?personalizedSkill:personalizedTask,generatedButton.dataset.copyGenerated==='skill'?'我的 Skill 创建指令':'我的首图指令');return;}
  const preview=event.target.closest('[data-preview-generated]');
  if(preview){openPrompt(personalizedSkill);return;}
  const expand=event.target.closest('[data-expand]');
  if(expand){openPrompt(assets[expand.dataset.expand]);return;}
});
deck.addEventListener('change',event=>{
  const input=event.target.closest('[data-check]');
  if(!input)return;
  if(input.checked)checks.add(input.dataset.check); else checks.delete(input.dataset.check);
  document.getElementById('reuse-result').textContent=checks.size===3?'三项完成，请向同桌展示':'完成 '+checks.size+' / 3 项';
});
const match=location.hash.match(/^#slide-(\d+)$/);
const start=match?Math.max(0,Math.min(slides.length-1,Number(match[1])-1)):0;
update(start);
requestAnimationFrame(()=>deck.scrollTo({top:topOf(start),behavior:'instant'}));