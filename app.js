const deck = document.getElementById('deck');
const slidesData = window.lessonSlides;
const assets = window.lessonAssets;
const number = value => String(value).padStart(2, '0');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeIndex = 0;
let wheelLockedUntil = 0;
let wheelTotal = 0;
let touchStart = null;
let announceTimer = null;
const foundErrors = new Set();
const checks = new Set();

deck.innerHTML = slidesData.map((slide, index) =>
  '<section class="slide ' + slide.layout + '" id="slide-' + (index + 1) + '" data-theme="' + slide.theme + '" aria-label="第 ' + (index + 1) + ' 页：' + slide.title + '">' +
    '<div class="slide-frame">' +
      '<div class="slide-head"><span>' + slide.chapter + ' / ' + slide.title + '</span><span>AGENT · SKILL / ' + number(index + 1) + '</span></div>' +
      '<div class="slide-content">' + slide.html + '</div>' +
      '<div class="slide-foot"><span>' + slide.footer + '</span><span>' + number(index + 1) + ' / ' + number(slidesData.length) + '</span></div>' +
    '</div>' +
  '</section>'
).join('');

const slides = Array.from(deck.querySelectorAll('.slide'));
document.getElementById('total-number').textContent = number(slides.length);
const menuList = document.getElementById('menu-list');
menuList.innerHTML = slidesData.map((slide, index) =>
  '<button type="button" data-jump="' + index + '"><small>' + number(index + 1) + ' · ' + slide.chapter + '</small>' + slide.title + '</button>'
).join('');

function splitText(node, counter) {
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      const fragment = document.createDocumentFragment();
      for (const char of Array.from(child.textContent)) {
        if (char === '\n') continue;
        const span = document.createElement('span');
        span.className = 'glyph';
        span.style.setProperty('--i', String(Math.min(counter.value++, 34)));
        span.textContent = char === ' ' ? '\u00a0' : char;
        fragment.appendChild(span);
      }
      child.replaceWith(fragment);
    } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
      splitText(child, counter);
    }
  }
}
deck.querySelectorAll('.kinetic').forEach(heading => splitText(heading, { value: 0 }));

function targetTop(index) {
  return slides[index].getBoundingClientRect().top + deck.scrollTop;
}
function syncActive(index) {
  if (index < 0 || index >= slides.length) return;
  activeIndex = index;
  slides.forEach((slide, i) => {
    slide.classList.toggle('is-active', i === index);
    if (i !== index && slide.classList.contains('is-active')) slide.classList.remove('is-active');
  });
  document.getElementById('current-number').textContent = number(index + 1);
  document.getElementById('chapter-name').textContent = slidesData[index].chapter;
  document.getElementById('slide-title').textContent = slidesData[index].title;
  document.getElementById('position-label').textContent = slidesData[index].title;
  document.getElementById('progress-fill').style.width = ((index + 1) / slides.length * 100) + '%';
  document.getElementById('prev-button').disabled = index === 0;
  document.getElementById('next-button').disabled = index === slides.length - 1;
  const guide = window.lessonGuide[index];
  document.getElementById('notes-content').innerHTML = '<p><strong>' + number(index + 1) + ' · ' + slidesData[index].title + ' <span class="note-duration">建议 ' + guide[0] + ' 分钟</span></strong></p><p>' + slidesData[index].notes + '</p><p class="note-action"><b>课堂动作</b><br>' + guide[1] + '</p>';
  menuList.querySelectorAll('[data-jump]').forEach((button, i) => button.setAttribute('aria-current', i === index ? 'page' : 'false'));
  history.replaceState(null, '', '#slide-' + (index + 1));
  window.setTimeout(() => slides[index].classList.add('seen'), 800);
}
function goTo(index, instant = false) {
  const next = Math.max(0, Math.min(slides.length - 1, index));
  if (next === activeIndex && !instant) return;
  syncActive(next);
  deck.scrollTo({ top: targetTop(next), behavior: instant || prefersReducedMotion.matches ? 'instant' : 'smooth' });
  wheelLockedUntil = performance.now() + (instant || prefersReducedMotion.matches ? 180 : 680);
  wheelTotal = 0;
}
function closePanels() {
  for (const [panelId, buttonId] of [['notes-panel','notes-button'],['menu-panel','menu-button']]) {
    document.getElementById(panelId).hidden = true;
    document.getElementById(buttonId).setAttribute('aria-expanded','false');
  }
}
function togglePanel(panelId, buttonId) {
  const panel = document.getElementById(panelId);
  const shouldOpen = panel.hidden;
  closePanels();
  panel.hidden = !shouldOpen;
  document.getElementById(buttonId).setAttribute('aria-expanded',String(shouldOpen));
}
function announce(message) {
  const element = document.getElementById('announcement');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(announceTimer);
  announceTimer = setTimeout(() => element.classList.remove('show'), 3000);
}

document.getElementById('prev-button').addEventListener('click', () => goTo(activeIndex - 1));
document.getElementById('next-button').addEventListener('click', () => goTo(activeIndex + 1));
document.getElementById('notes-button').addEventListener('click', () => togglePanel('notes-panel','notes-button'));
document.getElementById('menu-button').addEventListener('click', () => togglePanel('menu-panel','menu-button'));
document.getElementById('close-notes').addEventListener('click', closePanels);
document.getElementById('close-menu').addEventListener('click', closePanels);
document.querySelector('.logo').addEventListener('click', event => { event.preventDefault(); goTo(0); });
menuList.addEventListener('click', event => {
  const button = event.target.closest('[data-jump]');
  if (!button) return;
  closePanels();
  goTo(Number(button.dataset.jump), true);
});

deck.addEventListener('wheel', event => {
  event.preventDefault();
  const now = performance.now();
  if (now < wheelLockedUntil) return;
  wheelTotal += event.deltaY;
  if (Math.abs(wheelTotal) < 28) return;
  goTo(activeIndex + (wheelTotal > 0 ? 1 : -1));
  wheelTotal = 0;
}, { passive: false });
deck.addEventListener('touchstart', event => {
  touchStart = { x:event.touches[0].clientX, y:event.touches[0].clientY };
}, { passive:true });
deck.addEventListener('touchmove', event => {
  if (!touchStart) return;
  const dx = event.touches[0].clientX - touchStart.x;
  const dy = event.touches[0].clientY - touchStart.y;
  if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) event.preventDefault();
}, { passive:false });
deck.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  touchStart = null;
  if (Math.abs(dy) < 48 || Math.abs(dy) < Math.abs(dx)) return;
  goTo(activeIndex + (dy < 0 ? 1 : -1));
});

window.addEventListener('keydown', event => {
  if (event.key === 'Escape') { closePanels(); return; }
  if (event.key.toLowerCase() === 'n' && !event.ctrlKey && !event.altKey && !event.metaKey) {
    togglePanel('notes-panel','notes-button'); return;
  }
  if (['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) return;
  if (event.key === 'ArrowDown' || event.key === 'PageDown' || (event.key === ' ' && document.activeElement.tagName !== 'BUTTON')) {
    event.preventDefault(); goTo(activeIndex + 1);
  } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    event.preventDefault(); goTo(activeIndex - 1);
  } else if (event.key === 'Home') {
    event.preventDefault(); goTo(0);
  } else if (event.key === 'End') {
    event.preventDefault(); goTo(slides.length - 1);
  }
});
window.addEventListener('resize', () => deck.scrollTo({top:targetTop(activeIndex),behavior:'instant'}));

deck.addEventListener('click', async event => {
  const copy = event.target.closest('[data-copy]');
  if (copy) {
    const value = assets[copy.dataset.copy];
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      announce('已复制：' + (copy.dataset.copy === 'notesA' || copy.dataset.copy === 'notesB' ? '练习材料' : '完整指令'));
      copy.classList.add('copied');
      setTimeout(() => copy.classList.remove('copied'), 900);
    } catch {
      announce('复制被浏览器限制，请使用安全网址打开网站。');
    }
    return;
  }
  const choice = event.target.closest('[data-choice]');
  if (choice) {
    choice.parentElement.querySelectorAll('button').forEach(button => button.classList.toggle('selected', button === choice));
    const feedback = choice.parentElement.nextElementSibling;
    feedback.textContent = choice.dataset.choice === 'skill'
      ? '答对了。先完成任务，再把每周都用的整理规则保存下来。'
      : '这件事每周重复。一次完成之后，把有效做法保存成 Skill 更合适。';
    return;
  }
  const error = event.target.closest('[data-error]');
  if (error) {
    foundErrors.add(error.dataset.error);
    error.classList.add('found');
    const feedback = error.closest('.error-document').querySelector('.error-feedback');
    feedback.textContent = foundErrors.size === 2 ? '两处都找到了：活动日期未定；物料负责人也未定。' :
      error.dataset.error === 'date' ? '找对了：记录只说“下个月”，没有具体日期。再找一处。' :
      '找对了：李老师只是先列物料，负责人下次再定。再找一处。';
    return;
  }
  const answer = event.target.closest('[data-answer]');
  if (answer) {
    const options = answer.closest('.quiz-options');
    if (options.dataset.answered) return;
    options.dataset.answered = 'true';
    options.querySelectorAll('button').forEach(button => {
      button.disabled = true;
      if (button.dataset.answer === 'correct') button.classList.add('correct');
    });
    if (answer.dataset.answer === 'wrong') answer.classList.add('wrong');
    const feedback = options.nextElementSibling;
    const explanations = {
      '1':'对。产品名称和能力类型是两回事。',
      '2':'错。保存并在新任务里调用，才算真正复用。',
      '3':'应改为“待确认”，并回到原始材料核实。'
    };
    feedback.textContent = explanations[options.dataset.quiz];
  }
});
deck.addEventListener('change', event => {
  const input = event.target.closest('[data-check]');
  if (!input) return;
  if (input.checked) checks.add(input.dataset.check); else checks.delete(input.dataset.check);
  const result = document.getElementById('reuse-result');
  result.textContent = checks.size === 3 ? '完成了！你在新任务里调用并验收了自己的 Skill。' : '已完成 ' + checks.size + ' / 3 项。继续对照材料检查。';
});

const hashMatch = location.hash.match(/^#slide-(\d+)$/);
const startIndex = hashMatch ? Math.min(slides.length - 1, Math.max(0, Number(hashMatch[1]) - 1)) : 0;
syncActive(startIndex);
requestAnimationFrame(() => deck.scrollTo({ top: targetTop(startIndex), behavior:'instant' }));
