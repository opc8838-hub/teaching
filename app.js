const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const compareViews = {
  chat: {
    eyebrow: '01 / 对话', title: '问一句，答一句。', stamp: '聊',
    description: '你给它记录，它在聊天窗口生成一段纪要文字。后续保存、整理成文件，通常还需要你继续操作或提出要求。',
    steps: ['给材料', '获得文字回复']
  },
  agent: {
    eyebrow: '02 / 执行', title: '给目标，看它办事。', stamp: '办',
    description: '你说明要交付什么。智能体在授权范围内拆解任务，读取材料、调用工具，形成可检查的纪要与待办。',
    steps: ['明确目标', '规划步骤', '调用工具', '交付结果']
  },
  skill: {
    eyebrow: '03 / 复用', title: '把好方法留下来。', stamp: '用',
    description: '把“只依据原文、缺失写待确认、固定输出格式”等规则保存为技能。下次换一份记录，继续按这套方法处理。',
    steps: ['保存工作方法', '新任务调用', '按同样标准验收']
  }
};

const tabBar = $('.t-tabs');
const tabPill = $('.t-tabs-pill');
function moveTabPill(tab, animate = true) {
  if (!tab) return;
  if (!animate) tabPill.style.transition = 'none';
  tabPill.style.transform = 'translateX(' + tab.offsetLeft + 'px)';
  tabPill.style.width = tab.offsetWidth + 'px';
  if (!animate) requestAnimationFrame(() => { tabPill.style.transition = ''; });
}
function selectCompare(tab, animate = true) {
  $$('.t-tab', tabBar).forEach(item => item.setAttribute('aria-selected', String(item === tab)));
  moveTabPill(tab, animate);
  const view = compareViews[tab.dataset.tab];
  const panel = $('#compare-panel');
  panel.style.animation = 'none';
  void panel.offsetWidth;
  panel.style.animation = '';
  $('#compare-eyebrow').textContent = view.eyebrow;
  $('#compare-title').textContent = view.title;
  $('#compare-description').textContent = view.description;
  $('#compare-stamp').textContent = view.stamp;
  $('#compare-steps').replaceChildren(...view.steps.map(step => {
    const span = document.createElement('span');
    span.textContent = step;
    return span;
  }));
}
$$('.t-tab', tabBar).forEach((tab, index, tabs) => {
  tab.addEventListener('click', () => selectCompare(tab));
  tab.addEventListener('keydown', event => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    next.focus();
    selectCompare(next);
  });
});
requestAnimationFrame(() => moveTabPill($('.t-tab[aria-selected="true"]'), false));
window.addEventListener('resize', () => moveTabPill($('.t-tab[aria-selected="true"]'), false));

const sourceA = '活动筹备会，10 月 12 日\n大家讨论下个月办一场分享活动，具体日期还没确定。王老师说下周带来两个场地候选方案。宣传文案周五前要出初稿。物料清单还需要有人认领，李老师说先把要买的东西列出来，负责人下次会上再定。';
const sourceB = '培训筹备会，10 月 18 日\n下个月计划办一次新员工培训，日期待定。陈老师负责收集报名问题，周三前整理第一版。培训资料需要更新，但负责人还没确定。小周建议安排一个现场问答环节，是否采用还要讨论。';
const taskPrompt = '请根据下面的会议记录，整理一份简明会议纪要和待办表。\n\n要求：\n1. 只依据原始记录，不猜测活动日期、负责人或截止时间。\n2. 区分“已经决定”和“仍在讨论”。\n3. 待办表包含事项、负责人、截止时间；缺失的信息写“待确认”。\n4. 最后列出需要继续确认的问题。\n5. 语言简洁，便于复制进办公文档。\n\n会议记录：\n' + sourceA;
const skillPrompt = '请创建一个名为“会议纪要与待办整理”的 Skill。\n\n用途：把零散会议记录整理成简明纪要和待办表。\n\n工作规则：\n1. 仅依据用户提供的会议材料，不补充未经确认的事实。\n2. 区分已确定事项、讨论建议和待确认事项。\n3. 待办表固定包含“事项、负责人、截止时间”三列；缺失内容写“待确认”。\n4. 单列需要继续确认的问题。\n5. 输出清楚、简洁，适合单位日常办公。\n\n请先展示这个 Skill 的使用说明，让我检查后再保存。';
const reusePrompt = '请调用我保存的“会议纪要与待办整理” Skill，处理下面这份新记录。完成后请显示纪要、待办表和待确认问题。\n\n' + sourceB;
const steps = [
  { kicker: 'STEP 01 / INPUT', title: '先看清你交给 AI 的材料。', lead: '这份记录故意留下两处空白。先读一遍，想想哪些信息不能让 AI 自己补。', content: '<div class="source-paper"><h4>练习材料 A · 活动筹备会</h4><p>' + sourceA + '</p></div>', actions: '<button class="secondary-button" type="button" data-copy="sourceA">复制练习材料</button>' },
  { kicker: 'STEP 02 / TASK', title: '一次把任务交代清楚。', lead: '打开 WorkBuddy 新任务，粘贴下面的任务说明。运行后，检查它有没有把“待定”写成确定事实。', content: '<div class="instruction-box" id="task-text"></div>', actions: '<button class="primary-button" type="button" data-copy="taskPrompt">复制任务说明 ↗</button><a class="secondary-button" href="https://www.workbuddy.cn/docs/workbuddy/Overview" target="_blank" rel="noopener noreferrer">打开使用说明 ↗</a>' },
  { kicker: 'STEP 03 / SAVE', title: '把这套做法存成技能。', lead: '进入 WorkBuddy 的“技能”，选择“添加技能”再“创建技能”。粘贴说明，先检查生成的规则，再保存。', content: '<div class="instruction-box" id="skill-text"></div>', actions: '<button class="primary-button" type="button" data-copy="skillPrompt">复制技能创建说明 ↗</button><a class="secondary-button" href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market" target="_blank" rel="noopener noreferrer">查看官方步骤 ↗</a>' },
  { kicker: 'STEP 04 / REUSE', title: '换一份记录，真正验证复用。', lead: '新建一个任务，调用刚保存的 Skill。对照材料 B，检查格式和事实是否都正确。', content: '<div class="source-paper"><h4>练习材料 B · 培训筹备会</h4><p>' + sourceB + '</p></div><div class="instruction-box" id="reuse-text"></div><div class="checklist"><label><input type="checkbox" data-check="0"> 已在新任务中调用 Skill</label><label><input type="checkbox" data-check="1"> 输出了纪要、待办表和待确认问题</label><label><input type="checkbox" data-check="2"> 检查日期、负责人，没有发现擅自补写</label></div><div id="finish-message" role="status"></div>', actions: '<button class="primary-button" type="button" data-copy="reusePrompt">复制复用任务 ↗</button><button class="secondary-button" type="button" id="reset-checks">清空勾选</button>' }
];
const copyData = { sourceA, taskPrompt, skillPrompt, reusePrompt };
let currentStep = 0;
let completedChecks = [false, false, false];
function successCheck() {
  return '<span class="t-success-check" data-state="in" aria-hidden="true"><svg width="42" height="42" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="21" fill="#e1ede4"/><path d="M15 24L21 30L33 18" stroke="#39785e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';
}
function renderStep(index) {
  currentStep = index;
  const step = steps[index];
  $$('.step-button').forEach((button, i) => {
    button.classList.toggle('active', i === index);
    button.setAttribute('aria-current', i === index ? 'step' : 'false');
  });
  $('#step-count').textContent = String(index + 1).padStart(2, '0') + ' / 04';
  const stage = $('#workshop-stage');
  stage.style.animation = 'none';
  void stage.offsetWidth;
  stage.style.animation = '';
  stage.innerHTML = '<span class="stage-kicker">' + step.kicker + '</span><h3>' + step.title + '</h3><p class="stage-lead">' + step.lead + '</p>' + step.content + '<div class="stage-actions">' + step.actions + '<span class="copy-status" role="status"></span>' + (index < 3 ? '<button class="secondary-button next-button" type="button" id="next-step">下一步 →</button>' : '') + '</div>' + (index === 0 ? '<p class="stage-note">留意：活动日期尚未确定，物料清单负责人也没有定。</p>' : '');
  if (index === 1) $('#task-text').textContent = taskPrompt;
  if (index === 2) $('#skill-text').textContent = skillPrompt;
  if (index === 3) {
    $('#reuse-text').textContent = reusePrompt;
    $$('.checklist input').forEach((input, i) => { input.checked = completedChecks[i]; });
    updateChecks();
  }
}
function updateChecks() {
  if (currentStep !== 3) return;
  const count = completedChecks.filter(Boolean).length;
  $('#finish-message').innerHTML = count === 3 ? '<div class="stage-note" style="display:flex;align-items:center;gap:12px;color:#39785e;font-weight:800">' + successCheck() + '你完成了第二次调用。这个方法可以带回自己的工作中。</div>' : '<p class="stage-note">完成 ' + count + ' / 3 项。第二次调用成功，才算真正学会复用。</p>';
}
$$('.step-button').forEach(button => button.addEventListener('click', () => renderStep(Number(button.dataset.step))));
$('#workshop-stage').addEventListener('click', async event => {
  const copyButton = event.target.closest('[data-copy]');
  if (copyButton) {
    const status = $('.copy-status', $('#workshop-stage'));
    try {
      await navigator.clipboard.writeText(copyData[copyButton.dataset.copy]);
      status.textContent = '已复制，可以粘贴到 WorkBuddy。';
    } catch {
      status.textContent = '浏览器限制了复制，请选中上方文字手动复制。';
    }
  }
  if (event.target.closest('#next-step')) renderStep(currentStep + 1);
  if (event.target.closest('#reset-checks')) {
    completedChecks = [false, false, false];
    $$('.checklist input').forEach(input => { input.checked = false; });
    updateChecks();
  }
});
$('#workshop-stage').addEventListener('change', event => {
  if (!event.target.matches('[data-check]')) return;
  completedChecks[Number(event.target.dataset.check)] = event.target.checked;
  updateChecks();
});
renderStep(0);

const foundIssues = new Set();
const issueFeedback = {
  date: '找对了：原始记录只说“下个月”，具体日期尚未确定。',
  owner: '找对了：李老师只答应先列物品，负责人要在下次会上再定。'
};
$$('.verify-token').forEach(token => token.addEventListener('click', () => {
  foundIssues.add(token.dataset.issue);
  token.classList.add('found');
  $('#verify-count').textContent = foundIssues.size + ' / 2 找到';
  $('#verify-feedback').textContent = foundIssues.size === 2 ? '两处都找到了！AI 遇到材料缺失，应标为“待确认”，不能擅自补写。' : issueFeedback[token.dataset.issue];
}));
$('#verify-reset').addEventListener('click', () => {
  foundIssues.clear();
  $$('.verify-token').forEach(token => token.classList.remove('found'));
  $('#verify-count').textContent = '0 / 2 找到';
  $('#verify-feedback').textContent = '找出两处被 AI 擅自补上的信息。';
});

const questions = [
  { question: '豆包、元宝是产品名称。一个产品可以同时提供聊天和智能体能力。', options: ['对', '错'], correct: 0, reason: '对。产品名称和能力类型是两个不同层面的说法。' },
  { question: '把一段提示词发给 AI，就等于已经保存了一个可复用的 Skill。', options: ['对', '错'], correct: 1, reason: '错。要保存成平台支持的技能，并在新任务中调用验证。' },
  { question: '会议记录没说活动日期，AI 在纪要里补了具体日期。你应该怎么做？', options: ['直接使用，AI 通常知道', '改为“待确认”，并对照原文核实'], correct: 1, reason: '对。凡是原文没有给出的关键事实，都应先核实。' }
];
let questionIndex = 0;
let score = 0;
let answered = false;
function renderQuiz() {
  const card = $('#quiz-card');
  $('#quiz-progress-text').textContent = '问题 ' + String(questionIndex + 1).padStart(2, '0') + ' / 03';
  $$('#quiz-dots i').forEach((dot, index) => dot.classList.toggle('current', index === questionIndex));
  const q = questions[questionIndex];
  card.innerHTML = '<span class="quiz-type">KNOWLEDGE CHECK / ' + String(questionIndex + 1).padStart(2, '0') + '</span><h3>' + q.question + '</h3><div class="quiz-options">' + q.options.map((option, i) => '<button class="quiz-option" type="button" data-answer="' + i + '"><span style="color:var(--orange-dark);margin-right:15px">' + String.fromCharCode(65 + i) + '</span>' + option + '</button>').join('') + '</div><div class="quiz-feedback" role="status"></div>';
  answered = false;
}
$('#quiz-card').addEventListener('click', event => {
  const choice = event.target.closest('[data-answer]');
  if (choice && !answered) {
    answered = true;
    const selected = Number(choice.dataset.answer);
    const q = questions[questionIndex];
    if (selected === q.correct) score++;
    $$('.quiz-option', $('#quiz-card')).forEach(button => {
      const index = Number(button.dataset.answer);
      button.disabled = true;
      if (index === q.correct) button.classList.add('correct');
      else if (index === selected) button.classList.add('wrong');
    });
    $('.quiz-feedback', $('#quiz-card')).textContent = q.reason;
    $('#quiz-card').insertAdjacentHTML('beforeend', '<button class="primary-button quiz-next" type="button" id="quiz-next">' + (questionIndex === questions.length - 1 ? '查看结果 →' : '下一题 →') + '</button>');
  }
  if (event.target.closest('#quiz-next')) {
    questionIndex++;
    if (questionIndex < questions.length) renderQuiz();
    else {
      $('#quiz-progress-text').textContent = '完成 / 03';
      $$('#quiz-dots i').forEach(dot => dot.classList.add('current'));
      $('#quiz-card').innerHTML = '<div class="quiz-result">' + successCheck() + '<h3>完成了！答对 ' + score + ' / 3 题。</h3><p>你已经掌握这节课最重要的判断：分清概念，保存方法，核实结果。现在选一件明天的工作试着交给 AI。</p><button class="secondary-button" type="button" id="quiz-restart">再答一次 ↺</button></div>';
    }
  }
  if (event.target.closest('#quiz-restart')) {
    questionIndex = 0;
    score = 0;
    renderQuiz();
  }
});
renderQuiz();

const progress = $('#reading-progress');
function updateReadingProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + '%';
}
window.addEventListener('scroll', updateReadingProgress, { passive: true });
window.addEventListener('resize', updateReadingProgress);
updateReadingProgress();

const presentButton = $('#present-mode');
presentButton.addEventListener('click', () => {
  const active = document.body.classList.toggle('presenting');
  presentButton.setAttribute('aria-pressed', String(active));
  presentButton.firstChild.textContent = active ? '退出投影 ' : '投影模式 ';
});
const menuButton = $('#mobile-menu-button');
const mobileNav = $('#mobile-nav');
menuButton.addEventListener('click', () => {
  mobileNav.hidden = !mobileNav.hidden;
  menuButton.setAttribute('aria-expanded', String(!mobileNav.hidden));
  menuButton.setAttribute('aria-label', mobileNav.hidden ? '打开导航' : '关闭导航');
  menuButton.textContent = mobileNav.hidden ? '☰' : '×';
});
$$('a', mobileNav).forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '打开导航');
  menuButton.textContent = '☰';
}));
