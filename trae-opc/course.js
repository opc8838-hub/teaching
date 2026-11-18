/* =========================================================
   课件引擎：翻页 / 目录 / 备注 / 全屏 + 各页互动
   ========================================================= */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var slides = $$(".slide");
  var total = slides.length;
  var idx = -1;
  var lock = false;

  var el = {
    curr: $("#current-number"), totalEl: $("#total-number"), totalTime: $("#total-time"),
    progress: $("#progress-fill"), chapter: $("#chapter-name"), title: $("#slide-title"),
    menu: $("#menu-panel"), menuList: $("#menu-list"), notes: $("#notes-panel"), notesBody: $("#notes-content"),
    toast: $("#toast"), btnPrev: $("#prev-button"), btnNext: $("#next-button"),
    btnMenu: $("#menu-button"), btnNotes: $("#notes-button")
  };

  function pad(n) { return n < 10 ? "0" + n : String(n); }

  /* ---------- 逐字入场 ---------- */
  function splitKinetic(node) {
    if (node.dataset.split === "1") return;
    node.dataset.split = "1";
    var walk = function (n) {
      if (n.nodeType === 3) {
        var text = n.textContent, frag = document.createDocumentFragment();
        for (var i = 0; i < text.length; i++) {
          var ch = text.charAt(i);
          if (ch.trim() === "") { frag.appendChild(document.createTextNode(" ")); continue; }
          var s = document.createElement("span"); s.className = "glyph"; s.textContent = ch; frag.appendChild(s);
        }
        n.parentNode.replaceChild(frag, n);
      } else if (n.nodeType === 1) {
        Array.prototype.slice.call(n.childNodes).forEach(walk);
      }
    };
    Array.prototype.slice.call(node.childNodes).forEach(walk);
    $$(".glyph", node).forEach(function (g, i) { g.style.setProperty("--d", i); });
  }
  $$(".slide h1, .slide h2:not(.me-name)").forEach(splitKinetic);
  slides.forEach(function (s) { $$(".body > *", s).forEach(function (n, i) { n.style.setProperty("--i", i); }); });

  /* ---------- 目录 ---------- */
  var lastChapter = null, menuButtons = [], minutes = 0;
  slides.forEach(function (s, i) {
    var ch = s.dataset.chapter || "";
    minutes += parseFloat(s.dataset.minutes || 0);
    if (ch !== lastChapter) {
      var head = document.createElement("li"); head.className = "chapter"; head.textContent = ch;
      el.menuList.appendChild(head); lastChapter = ch;
    }
    var li = document.createElement("li"), b = document.createElement("button");
    b.type = "button";
    b.innerHTML = "<i>" + pad(i + 1) + "</i><span>" + (s.dataset.title || "") + "</span><em>" + (s.dataset.minutes ? s.dataset.minutes + "′" : "") + "</em>";
    b.addEventListener("click", function () { go(i); closePanels(); });
    li.appendChild(b); el.menuList.appendChild(li); menuButtons.push(b);
  });
  el.totalTime.textContent = "≈ " + Math.round(minutes) + " MIN";

  /* ---------- 超出视口时整体缩小 ---------- */
  /* 大屏整体放大、小屏整体缩小：逐档试缩放，取能完整放下的最大一档 */
  var ZOOMS = [1.42, 1.34, 1.26, 1.18, 1.1, 1.04, 1, .94, .88, .82, .76, .7, .64, .58];
  function fitSlide(s) {
    var f = $(".frame", s);
    if (!f) return;
    ["zoom", "width", "height", "marginLeft", "marginRight"].forEach(function (p) { f.style[p] = ""; });
    if (window.innerWidth <= 900) return;
    var cs = getComputedStyle(s);
    var availH = s.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    var availW = s.clientWidth;
    if (availH <= 0 || availW <= 0) return;
    var body = $(".body", f);
    var chosen = ZOOMS[ZOOMS.length - 1];
    var maxK = availW / 1240; /* 版面宽度至少 1240，避免多栏挤在一起 */
    if (body) body.style.flex = "none";
    for (var i = 0; i < ZOOMS.length; i++) {
      var k = ZOOMS[i];
      if (k > maxK && i < ZOOMS.length - 1) continue;
      var w = Math.min(1560, availW / k);
      f.style.zoom = k;
      f.style.width = w + "px";
      f.style.marginLeft = f.style.marginRight = ((availW / k - w) / 2) + "px";
      f.style.height = "auto";
      var r = f.getBoundingClientRect().height, o = f.offsetHeight;
      var visual = (Math.abs(r - o) < 1 && k !== 1) ? o * k : r;
      if (visual <= availH - 4) { chosen = k; break; }
    }
    if (body) body.style.flex = "";
    var wFinal = Math.min(1560, availW / chosen);
    f.style.zoom = chosen;
    f.style.width = wFinal + "px";
    f.style.marginLeft = f.style.marginRight = ((availW / chosen - wFinal) / 2) + "px";
    f.style.height = (availH / chosen) + "px";
    s.dataset.zoom = chosen;
  }
  var resizeTimer = null;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { if (slides[idx]) fitSlide(slides[idx]); }, 120);
  });

  /* ---------- 数字滚动 ---------- */
  function countUp(s) {
    $$(".count", s).forEach(function (c) {
      var to = parseFloat(c.dataset.to), start = null, dur = 1400;
      c.textContent = "0";
      var step = function (t) {
        if (!start) start = t;
        var p = Math.min(1, (t - start) / dur), e = 1 - Math.pow(1 - p, 3);
        c.textContent = Math.round(to * e).toLocaleString("en-US");
        if (p < 1) requestAnimationFrame(step);
      };
      setTimeout(function () { requestAnimationFrame(step); }, 250);
    });
  }

  /* ---------- 翻页 ---------- */
  function go(n, skipHash, force) {
    n = Math.max(0, Math.min(total - 1, n));
    if (!force && n === idx) return;
    if (idx >= 0 && slides[idx]) {
      slides[idx].classList.remove("is-active", "enter", "in");
      $$("video", slides[idx]).forEach(function (v) { v.pause(); });
    }
    idx = n;
    var s = slides[idx];
    s.classList.add("is-active");
    void s.offsetWidth;
    s.classList.add("enter", "in");
    fitSlide(s);
    countUp(s);
    el.curr.textContent = pad(idx + 1);
    el.progress.style.width = ((idx + 1) / total * 100) + "%";
    el.chapter.textContent = s.dataset.chapter || "";
    el.title.textContent = s.dataset.title || "";
    menuButtons.forEach(function (b, i) { b.classList.toggle("on", i === idx); });
    if (!el.notes.hidden) fillNotes();
    if (!skipHash) history.replaceState(null, "", "#slide-" + (idx + 1));
  }
  function next() { if (idx < total - 1) go(idx + 1); }
  function prev() { if (idx > 0) go(idx - 1); }
  function bump(fn) { if (lock) return; lock = true; fn(); setTimeout(function () { lock = false; }, 480); }

  window.addEventListener("keydown", function (e) {
    var t = e.target;
    if (t.matches("input, textarea, select")) return;
    if (t.matches("button, video, a")) { t.blur(); }
    switch (e.key) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ":
        e.preventDefault(); bump(next); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp":
        e.preventDefault(); bump(prev); break;
      case "Home": e.preventDefault(); bump(function () { go(0); }); break;
      case "End": e.preventDefault(); bump(function () { go(total - 1); }); break;
      case "n": case "N": toggleNotes(); break;
      case "m": case "M": toggleMenu(); break;
      case "f": case "F": toggleFullscreen(); break;
      case "Escape": closePanels(); break;
    }
  });

  var wheelTotal = 0, wheelTimer = null;
  window.addEventListener("wheel", function (e) {
    if (window.innerWidth <= 900 || document.body.classList.contains("modal-open")) return;
    if (e.target.closest(".panel-body, .menu-list, .flip-b")) return;
    if (Math.abs(e.deltaY) < 4) return;
    wheelTotal += e.deltaY;
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(function () { wheelTotal = 0; }, 180);
    if (Math.abs(wheelTotal) > 60) { bump(wheelTotal > 0 ? next : prev); wheelTotal = 0; }
  }, { passive: true });

  var touchStart = null;
  window.addEventListener("touchstart", function (e) {
    if (document.body.classList.contains("modal-open") || e.target.closest(".panel, button, a, input, video, .flip, .rk, .rp-row, .qa-row, [data-detail]")) { touchStart = null; return; }
    var t = e.touches[0]; touchStart = { x: t.clientX, y: t.clientY };
  }, { passive: true });
  window.addEventListener("touchend", function (e) {
    if (!touchStart) return;
    var t = e.changedTouches[0], dx = touchStart.x - t.clientX, dy = touchStart.y - t.clientY;
    touchStart = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return; /* 只认横扫，竖向留给滚动 */
    bump(dx > 0 ? next : prev);
  }, { passive: true });

  el.btnNext.addEventListener("click", function () { bump(next); });
  el.btnPrev.addEventListener("click", function () { bump(prev); });

  /* ---------- 面板 ---------- */
  function closePanels() {
    el.menu.hidden = true; el.notes.hidden = true;
    el.btnMenu.classList.remove("on"); el.btnNotes.classList.remove("on");
  }
  function toggleMenu() {
    var open = el.menu.hidden; closePanels(); el.menu.hidden = !open; el.btnMenu.classList.toggle("on", open);
  }
  function fillNotes() {
    var s = slides[idx];
    el.notesBody.innerHTML = "<p class=\"note-time\">" + pad(idx + 1) + " · " + (s.dataset.chapter || "") + " · " + (s.dataset.minutes || "-") + " 分钟</p><p>" + (s.dataset.notes || "") + "</p>";
  }
  function toggleNotes() {
    var open = el.notes.hidden; closePanels();
    if (open) fillNotes();
    el.notes.hidden = !open; el.btnNotes.classList.toggle("on", open);
  }
  el.btnMenu.addEventListener("click", toggleMenu);
  el.btnNotes.addEventListener("click", toggleNotes);
  $("#close-notes").addEventListener("click", closePanels);
  $("#close-menu").addEventListener("click", closePanels);

  function toggleFullscreen() {
    if (!document.fullscreenElement) { if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen(); }
    else if (document.exitFullscreen) document.exitFullscreen();
  }

  var toastTimer = null;
  function toast(msg) {
    el.toast.textContent = msg; el.toast.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.toast.classList.remove("show"); }, 1600);
  }

  /* ---------- 视频 ---------- */
  $$(".video-wrap").forEach(function (w) {
    var v = $("video", w), b = $(".play-big", w);
    b.addEventListener("click", function () { var p = v.play(); if (p && p.catch) p.catch(function () { toast("视频加载失败，请检查网络"); }); });
    v.addEventListener("play", function () { w.classList.add("playing"); });
    v.addEventListener("ended", function () { w.classList.remove("playing"); });
  });

  /* =========================================================
     互动 1：接手次数
     ========================================================= */
  var HANDOFF = [
    { name: "一笔报销", steps: [
      { who: "你", act: "填单、贴发票", note: "整理信息，原样提交", kind: "pass", ai: true },
      { who: "直属领导", act: "审批签字", note: "这趟出差该不该报？", kind: "judge", ai: false },
      { who: "部门领导", act: "再签一次", note: "金额在额度内，照签", kind: "pass", ai: true },
      { who: "财务", act: "核对金额和发票", note: "按规则逐项核对", kind: "pass", ai: true },
      { who: "出纳", act: "打款", note: "钱出门，先留一个人", kind: "pass", ai: false }
    ]},
    { name: "一篇推文", steps: [
      { who: "作者", act: "写稿", note: "写什么、为谁写", kind: "judge", ai: false },
      { who: "主编", act: "审稿修改", note: "这篇能不能代表我们", kind: "judge", ai: false },
      { who: "设计", act: "排版配图", note: "按模板排，原样交出", kind: "pass", ai: true },
      { who: "运营", act: "发布", note: "复制粘贴、定时发出", kind: "pass", ai: true }
    ]},
    { name: "一张活动海报", steps: [
      { who: "运营", act: "提需求", note: "要什么效果、给谁看", kind: "judge", ai: false },
      { who: "设计师", act: "出初稿", note: "套公司规范出图", kind: "pass", ai: true },
      { who: "设计师", act: "改三轮", note: "改字、换图、调色", kind: "pass", ai: true },
      { who: "主管", act: "确认", note: "这张能不能代表品牌", kind: "judge", ai: false },
      { who: "运营", act: "上传发布", note: "原样上传", kind: "pass", ai: true }
    ], tail: "设计师没有消失：他去给 AI 做“品牌规范技能”，当 AI 的教练。" }
  ];
  (function () {
    var root = $("#handoff");
    if (!root) return;
    var flow = $("[data-role=flow]", root), num = $("[data-role=num]", root), say = $("[data-role=say]", root);
    var cur = 0, showKind = false, useAI = false;
    function render() {
      var sc = HANDOFF[cur];
      flow.innerHTML = sc.steps.map(function (st, i) {
        return (i ? "<span class=\"ho-arrow\">→</span>" : "") +
          "<div class=\"ho-node" + (useAI && st.ai ? " gone" : "") + "\"><span class=\"kind " + st.kind + "\">" + (st.kind === "judge" ? "判断" : "传递") + "</span>" +
          "<span class=\"who\">" + pad(i + 1) + " · " + st.who + "</span><h4>" + st.act + "</h4><p>" + st.note + "</p></div>";
      }).join("");
      root.classList.toggle("show-kind", showKind);
      var all = sc.steps.length, left = sc.steps.filter(function (s) { return !(useAI && s.ai); }).length;
      num.textContent = useAI ? all + " → " + left : String(all);
      if (useAI) say.textContent = "从 " + all + " 次接手变成 " + left + " 次。省掉的是接手动作，不是人。" + (sc.tail ? " " + sc.tail : "");
      else if (showKind) say.textContent = "次接手。黄色是判断，灰色是传递——哪几手可以交给 AI？";
      else say.textContent = "次接手。先猜一猜：哪几手是“传递”，哪几手是“判断”？";
      $$("[data-s]", root).forEach(function (b) { b.classList.toggle("on", +b.dataset.s === cur); });
      $("[data-act=kind]", root).classList.toggle("on", showKind);
      $("[data-act=ai]", root).classList.toggle("on", useAI);
    }
    root.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      if (b.dataset.s !== undefined) { cur = +b.dataset.s; showKind = false; useAI = false; }
      if (b.dataset.act === "kind") showKind = !showKind;
      if (b.dataset.act === "ai") { useAI = !useAI; if (useAI) showKind = true; }
      render();
      fitSlide(slides[idx]);
    });
    render();
  })();

  /* ---------- 互动 2：翻牌 ---------- */
  $$(".flip").forEach(function (f) { f.addEventListener("click", function () { f.classList.toggle("open"); }); });

  /* =========================================================
     互动 3：三类岗位能力清单
     ========================================================= */
  var MATRIX = [
    { one: "能把一句需求变成一个能用的东西，并证明它能用。",
      jobs: ["AI 应用开发", "小程序 / 网页开发", "智能体与工作流搭建", "AI 部署与测试", "数据标注与质检"],
      k: ["网页三件套 HTML / CSS / JS，加一门后端语言", "接口（API）、数据库、服务器的基本概念", "大模型能做什么、会错在哪：幻觉、上下文、成本", "数据安全与个人信息保护常识"],
      d: ["用 Codex / TRAE / Cursor 等把需求做成能运行的东西", "部署上线：域名、服务器、GitHub Pages", "调用模型接口；搭工作流（扣子、Dify、多维表格）", "写测试、做验收、留记录"],
      b: ["交付“能打开的文件”，不是截图和口头“做好了”", "改动有版本，出错能回退", "说清楚：我验证了什么，没验证什么", "需要确定性的地方，不用生成式 AI"] },
    { one: "能把一个模糊的抱怨，翻译成一份可执行的方案。",
      jobs: ["AI 产品助理", "需求分析", "售前 / 解决方案", "项目助理", "AI 业务伙伴"],
      k: ["至少懂一个行业的业务流程：餐饮、制造、零售、政务……", "需求文档、流程图、原型的写法", "算账：成本、工时、回报"],
      d: ["访谈：把老板的抱怨变成需求清单", "数接手次数，找出能交给 AI 的环节", "用 AI 快速出方案、原型、报价和排期"],
      b: ["听懂没说出口的需求", "对结论负责，数据口径必须核对", "敢说“这件事不该用 AI”", "让老专家愿意把经验交出来"] },
    { one: "能用 AI 稳定地产出好内容，并且越做越好。",
      jobs: ["AIGC 内容运营", "新媒体运营", "社区 / 社群运营", "智能体运营", "电商运营"],
      k: ["平台规则与内容规范", "AI 生成内容标识、版权、肖像权常识", "数据指标：曝光、转化、留存"],
      d: ["AI 出图、出视频、剪辑、排版", "把“做一次”变成可复用的模板和技能", "看数据复盘，每周迭代一次"],
      b: ["审美：知道什么是好看，什么是 AI 味", "事实核对：年代、数字、人名不乱编", "品牌一致：同一个调性做一百条"] }
  ];
  (function () {
    var root = $("#matrix");
    if (!root) return;
    function li(arr) { return arr.map(function (t, i) { return "<li style=\"--k:" + i + "\">" + t + "</li>"; }).join(""); }
    function render(t) {
      var m = MATRIX[t];
      $("[data-role=one]", root).textContent = m.one;
      $("[data-role=jobs]", root).innerHTML = m.jobs.map(function (j) { return "<span class=\"tag blue\">" + j + "</span>"; }).join("");
      $("[data-role=k]", root).innerHTML = li(m.k);
      $("[data-role=d]", root).innerHTML = li(m.d);
      $("[data-role=b]", root).innerHTML = li(m.b);
      $$("[data-t]", root).forEach(function (b) { b.classList.toggle("on", +b.dataset.t === t); });
    }
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-t]");
      if (b) { render(+b.dataset.t); fitSlide(slides[idx]); }
    });
    render(0);
  })();

  /* =========================================================
     互动 4：六步全流程（东莞市博物馆 · 进馆计划）
     ========================================================= */
  var PIPE = [
    { t: "业务需求调研", what: "弄清楚：谁要、为什么要、做成了长什么样。",
      cas: "东莞市博物馆三星堆特展，想让年轻人走进来，用 AI 重新讲文物。指定两件文物：储贝器、祭祀大面具。",
      ai: "整理访谈记录、查同类活动和赛事", human: "到展厅现场看，当面问清楚馆方要什么",
      stu: ["跟着去现场调研、拍照记录", "整理访谈纪要（1 页）", "搜集同类活动做参考"] },
    { t: "需求梳理与可行性评估", what: "定范围、找约束：做什么，不做什么，什么情况下会失败。",
      cas: "两天、两个赛道。现场网络可能不稳 → 作品必须能断网运行；游戏必须支持手柄，观众拿起来就会玩。",
      ai: "列风险清单、估工作量", human: "拍板做什么、不做什么",
      stu: ["写约束清单和风险清单", "做同类赛事对比表", "估算物料和人手"] },
    { t: "方案规划与原型设计", what: "把方案画出来、写下来，让所有人看到同一个东西。",
      cas: "比赛规则 + 评分表（审美 / 创意 / 专业 / 吸引力，各 25 分）+ 赛事网站原型：报名 → 提交 → 展示 → 投票。",
      ai: "起草规则文案、出页面原型", human: "判断评分是否公平、文物信息是否准确",
      stu: ["画页面原型、做视觉", "写规则和说明初稿", "设计海报和现场物料"] },
    { t: "开发部署", what: "把原型变成线上能用的网站或程序。",
      cas: "赛事网站用 AI 编程完成，部署在碳基社区官网下：规则发布、作品提交、展示、投票都在一个站里。",
      ai: "写代码、写接口、生成页面", human: "定数据怎么存、审代码、管上线",
      stu: ["做前端页面和表单", "做上传和展示功能", "部署上线、配域名"] },
    { t: "测试上线", what: "真机、真人、真场景测一遍，准备好出事时怎么办。",
      cas: "提前用手柄测试游戏；投稿流程从头走一遍；准备操作录屏备用，防现场翻车。",
      ai: "生成测试清单、模拟数据", human: "真人上手测，决定能不能上线",
      stu: ["写测试用例、逐条测", "现场技术支持", "准备应急预案"] },
    { t: "运营监控 · 反馈 · 迭代", what: "上线不是结束：看数据、收反馈、写复盘、改下一版。",
      cas: "100 多人到场，官网公开 82 条作品（40 条视频 + 42 条编程互动）；作品展示和投票持续开放。",
      ai: "统计数据、汇总反馈", human: "判断下一场改什么",
      stu: ["数据统计和作品整理", "写复盘、发推文", "收集参赛者反馈"] }
  ];
  (function () {
    var root = $("#pipeline");
    if (!root) return;
    var steps = $("[data-role=steps]", root), detail = $("[data-role=detail]", root);
    steps.innerHTML = PIPE.map(function (p, i) { return "<button type=\"button\" data-p=\"" + i + "\"><i>STEP " + pad(i + 1) + "</i><b>" + p.t + "</b></button>"; }).join("");
    function render(i) {
      var p = PIPE[i];
      detail.innerHTML =
        "<div class=\"pd\"><h4>这一步在做什么</h4><p>" + p.what + "</p>" +
        "<div class=\"row\" style=\"margin-top:10px\"><b>AI 做</b><span>" + p.ai + "</span></div>" +
        "<div class=\"row\"><b>人必须</b><span>" + p.human + "</span></div></div>" +
        "<div class=\"pd case\"><h4>博物馆项目里</h4><p>" + p.cas + "</p></div>" +
        "<div class=\"pd stu\"><h4>高职生能接的活</h4><ul>" + p.stu.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul></div>";
      $$("button", steps).forEach(function (b) { b.classList.toggle("on", +b.dataset.p === i); });
    }
    steps.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) render(+b.dataset.p); });
    render(0);
  })();

  /* ---------- 互动 5：找错 ---------- */
  $$("#report .rp-row").forEach(function (r) {
    r.addEventListener("click", function () {
      r.classList.add(r.dataset.ok === "1" ? "ok" : "bad");
      if (r.dataset.ok === "0") toast("找到了：口径不同，不能比");
      fitSlide(slides[idx]);
    });
  });

  /* ---------- 互动 6：风险自查 ---------- */
  (function () {
    var root = $("#risk");
    if (!root) return;
    var cards = $$(".rk", root), bars = $$(".risk-meter i", root), say = $("[data-role=say]", root);
    var words = ["还没想清楚任何一条。", "想清楚 1 条。继续。", "想清楚 2 条。别急着写代码。", "想清楚 3 条。快了。", "想清楚 4 条。还差最后一条。", "5 条都想清楚了——可以动手了。"];
    function update() {
      var n = cards.filter(function (c) { return c.classList.contains("done"); }).length;
      bars.forEach(function (b, i) { b.classList.toggle("on", i < n); });
      say.textContent = words[n];
      cards.forEach(function (c) { $(".chk", c).textContent = c.classList.contains("done") ? "● 想清楚了" : "○ 点击：想清楚了"; });
    }
    cards.forEach(function (c) { c.addEventListener("click", function () { c.classList.toggle("done"); update(); fitSlide(slides[idx]); }); });
    update();
  })();

  /* ---------- 互动 7：想法生成器 ---------- */
  var PRESETS = [
    ["毕业搬宿舍时", "攒了一沓奶茶纸袋扔不下手，拍成照片又找不到", "喜欢收藏奶茶纸袋的人"],
    ["给病人设置输液泵时", "剂量换算全靠手算，步骤多、没法复核", "ICU、急诊、麻醉科的医护"],
    ["把猫狗送养出去以后", "领养完就断了联系，不知道它过得好不好", "送养人和想领养的家庭"],
    ["教家里长辈用手机挂号时", "每次都要重新教一遍，还怕他们接到 AI 诈骗电话", "社区里的老人和他们的子女"]
  ];
  (function () {
    var root = $("#idea");
    if (!root) return;
    var w = $("#i-when"), p = $("#i-pain"), o = $("#i-who"), out = $("[data-role=out]", root);
    function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }
    function render() {
      out.innerHTML = "一个给 <u>" + esc(o.value || "……") + "</u> 的小工具：专门解决「<u>" + esc(p.value || "……") + "</u>」——就在 <u>" + esc(w.value || "……") + "</u> 的那一刻。<br>第一个用户：你自己。";
    }
    [w, p, o].forEach(function (i) { i.addEventListener("input", render); });
    $$("[data-p]", root).forEach(function (b) {
      b.addEventListener("click", function () { var x = PRESETS[+b.dataset.p]; w.value = x[0]; p.value = x[1]; o.value = x[2]; render(); });
    });
    render();
  })();

  /* =========================================================
     互动 8：七句话
     ========================================================= */
  var QUOTES = [
    { t: "传递还是判断", from: "快刀广播站 1005 · 美国超市巨头计划裁 3000 个岗位",
      q: "名字（头衔、岗位名称）保护不了你，流程里的位置才决定你安不安全。",
      i: "会消失的不是某一层人，而是流程里不必要的接手。你经手的东西原封不动传下去，是<b>传递</b>；经你手之后，下一个人拿到的东西不一样了，是<b>判断</b>。判断，才是现在真正值钱的地方。" },
    { t: "你的签字比 AI 的产出更贵", from: "快刀广播站 1012 · 50 多家前沿公司涌现出五类 AI 新角色",
      q: "AI 一秒钟能生成 100 份方案，但哪份能用，还是得你说了算。你的签字，比 AI 的产出更贵。",
      i: "“会用 AI”正在变成和“会用电脑”一样的基本功。新的价值在三件事：自己干活、<b>确保 AI 干对了</b>、<b>把自己知道的东西变成别人能用的东西</b>。" },
    { t: "方向盘在人手里", from: "快刀广播站 1025 · 菲尔兹奖得主邓煜谈 AI",
      q: "如果人要跟 AI 比速度，那肯定是没有任何希望的。人始终是主体，AI 是一个工具。",
      i: "汽车跑得再快，也不知道要去哪儿。人的位置在驾驶座：决定方向、什么时候刹车，<b>并且有责任验证结果</b>。不是开头在场、中间离开，是全程在场。" },
    { t: "加速器，不是入场券", from: "快刀广播站 1007 · 17 岁天才少年离开 Kimi",
      q: "AI 是加速器，不是入场券。入场券还是得靠你自己挣。",
      i: "17 岁的陈广宇用 AI 读论文，不是让它总结，是<b>一段一段追问到真懂</b>。真正让他拿到机会的，是自己写出来的理解，和能在真实项目里干活。" },
    { t: "被对的人看见", from: "快刀广播站 1007 · 17 岁天才少年离开 Kimi",
      q: "你不需要很多读者，你需要的是被对的人看到。写了，就多一次被发现的可能；不写，可能性就是零。",
      i: "他的博客发出时只有 20 来个关注者，被一位做同方向的学者回复，接着拿到硅谷实习，后来成为 Kimi 论文的共同第一作者。<b>把学习过程公开写出来、做出来、发出来。</b>" },
    { t: "第六个烧饼", from: "快刀广播站 1007 · 17 岁天才少年离开 Kimi",
      q: "吃了六个烧饼才吃饱，别说“早知道就直接吃第六个”。",
      i: "总有人说“等 AI 再发展发展，我就不用学了”。可学 AI 也是厚积薄发：<b>用过之前的工具、有过自己的思考</b>，新工具出来时，你才能马上感觉到它哪里不一样。" },
    { t: "没证据，不算完成", from: "快刀广播站 1011 · 从学会用 AI，到重新认识自己",
      q: "没证据，就不算完成。",
      i: "AI 嘴上说“完成了”，实际根本没干完——这和带新人一样。区别是<b>新人会脸红，AI 不会，下次还可能这么答</b>。所以验收要看证据：能打开、能运行、数字能核对。" },
    { t: "这件事该派谁去干", from: "快刀广播站 1011 · 从学会用 AI，到重新认识自己",
      q: "从问“AI 又能干什么”，变成问“这件事该派谁去干”。",
      i: "第一层，把有标准答案的活交给 AI；第二层，<b>给 AI 分工、定规矩、验收结果</b>——这已经不是“我和一个工具”，而是“我和一支团队”。" },
    { t: "原来还能走到别的地方", from: "快刀广播站 1011 · 从学会用 AI，到重新认识自己",
      q: "AI 没有替他们决定人生往哪儿走，但让他们看到了，自己原来还可以走到别的地方。",
      i: "测试工程师转去做 AI 部署，月嫂考下营养师证，60 岁的医生在全国做了 30 多场分享。<b>不用等准备好了再开始，先动手，再慢慢想通。</b>" },
    { t: "别轻易说“AI 不行”", from: "快刀广播站 1031 · 给微信小程序大赛当了一天评委",
      q: "千万别因为今天用 AI 做某个任务失败了，就给 AI 判死刑。很有可能不是“AI 不行”，是“我的 AI 不行”。",
      i: "AI 迭代得很快，睡一觉它可能就会了。<b>换个人、换个方法，事情就做成了。</b>卡住的时候，先怀疑自己的用法，而不是马上下结论。" },
    { t: "效率红利会被吃掉", from: "快刀广播站 1015 · 国务院办公厅发文谈 AI 与就业",
      q: "AI 给你提高的那点效率，人一定会想办法把它吃掉。",
      i: "一天能做 8 张海报了，真正用上的可能还是那 1 张。你能不能在新的组织里坐下来，取决于：<b>你和 AI 搭档干出来的，比单纯用 AI 更好，也比旁边的同事加 AI 更好</b>。" },
    { t: "起点特别小", from: "快刀广播站 1031 · 给微信小程序大赛当了一天评委",
      q: "每个人的起点都特别小，小到可能只是一个让自己觉得不舒服的瞬间。",
      i: "但在 AI 时代，这样一个小小的瞬间，<b>真的有机会长成一个不错的产品，然后找到跟你一样在意这件事的人</b>。先做一个自己会用的东西。" }
  ];
  (function () {
    var root = $("#quotes");
    if (!root) return;
    var list = $("[data-role=list]", root);
    list.innerHTML = QUOTES.map(function (x, i) { return "<button type=\"button\" data-q=\"" + i + "\"><i>" + pad(i + 1) + "</i><span>" + x.t + "</span></button>"; }).join("");
    function render(i) {
      var x = QUOTES[i];
      $("[data-role=from]", root).textContent = x.from;
      var q = $("[data-role=q]", root), d = $("[data-role=idea]", root);
      q.textContent = "“" + x.q + "”"; d.innerHTML = x.i;
      [q, d].forEach(function (n) { n.style.animation = "none"; void n.offsetWidth; n.style.animation = ""; });
      $$("button", list).forEach(function (b) { b.classList.toggle("on", +b.dataset.q === i); });
    }
    list.addEventListener("click", function (e) { var b = e.target.closest("button"); if (b) render(+b.dataset.q); });
    render(0);
  })();


  /* ---------- 互动 10：你可以是一名…… ---------- */
  (function () {
    var root = $("#becoming");
    if (!root) return;
    var box = $("[data-role=word]", root), chips = $$("[data-role=chips] span", root), k = 0;
    var slide = root.closest(".slide");
    function show(n) {
      var old = $("span:not(.out)", box);
      if (old) { old.classList.add("out"); setTimeout(function () { if (old.parentNode) old.parentNode.removeChild(old); }, 420); }
      var sp = document.createElement("span"); sp.textContent = chips[n].textContent; box.appendChild(sp);
      chips.forEach(function (c, i) { c.classList.toggle("on", i === n); });
    }
    setInterval(function () { if (!slide.classList.contains("is-active")) return; k = (k + 1) % chips.length; show(k); }, 1500);
    chips.forEach(function (c, i) { c.style.cursor = "pointer"; c.addEventListener("click", function () { k = i; show(i); }); });
    box.innerHTML = ""; show(0);
  })();

  /* ---------- 互动 11：专业 × 通识 × AI ---------- */
  var AMP = [
    { give: "审美、镜头感、排版、讲故事的能力", up: "一个人的设计 + 视频工作室",
      ex: "开场那支 Back to Work 和碳基社区介绍片：人定故事和审美，画面动效和配乐全由 AI 写代码生成。",
      go: "给学院的一次活动，做一支 30 秒的 AI 宣传片。" },
    { give: "逻辑、工程习惯、会调试、懂系统", up: "一个人的开发团队",
      ex: "一位技术负责人，团队缩到只剩自己，靠 AI 编程工具撑起前端、后端、App 和运维。",
      go: "给社团做一个报名或值班小程序，并部署上线。" },
    { give: "一个行业的经验和判断", up: "懂 AI 的领域专家",
      ex: "60 岁的风湿免疫科医生：最清楚该让 AI 解决什么问题的人，还是他自己。",
      go: "把你最熟的一件事，写成一份 AI 能照着做的手册。" }
  ];
  (function () {
    var root = $("#amplify");
    if (!root) return;
    var grid = $("[data-role=grid]", root);
    function render(m) {
      var x = AMP[m];
      grid.innerHTML =
        "<div class=\"amp\" style=\"--k:0\"><h4>你的专业给你</h4><p>" + x.give + "</p></div>" +
        "<div class=\"amp up\" style=\"--k:1\"><h4>AI 放大成</h4><p>" + x.up + "</p></div>" +
        "<div class=\"amp\" style=\"--k:2\"><h4>真实例子</h4><p>" + x.ex + "</p></div>" +
        "<div class=\"amp go\" style=\"--k:3\"><h4>这周就能做</h4><p>" + x.go + "</p></div>";
      $$("[data-m]", root).forEach(function (b) { b.classList.toggle("on", +b.dataset.m === m); });
    }
    root.addEventListener("click", function (e) { var b = e.target.closest("[data-m]"); if (b) { render(+b.dataset.m); fitSlide(slides[idx]); } });
    render(0);
  })();

  /* ---------- 互动 12：定位表高亮 ---------- */
  (function () {
    var t = $("#pos");
    if (!t) return;
    t.addEventListener("click", function (e) {
      var b = e.target.closest("[data-c]");
      if (!b) return;
      var c = "c" + b.dataset.c, on = t.classList.contains(c);
      t.classList.remove("c1", "c2", "c3");
      if (!on) t.classList.add(c);
    });
  })();

  /* ---------- 互动 9：答疑展开 ---------- */
  $$("#qa .qa-row").forEach(function (r) { r.addEventListener("click", function () { r.classList.toggle("open"); fitSlide(slides[idx]); }); });

  /* ---------- 启动 ---------- */
  el.totalEl.textContent = pad(total);
  var start = 0, m = /#slide-(\d+)/.exec(location.hash || "");
  if (m) start = Math.max(0, Math.min(total - 1, parseInt(m[1], 10) - 1));
  go(start, true, true);
  window.addEventListener("hashchange", function () {
    var mm = /#slide-(\d+)/.exec(location.hash || "");
    if (mm) go(parseInt(mm[1], 10) - 1, true);
  });
})();
