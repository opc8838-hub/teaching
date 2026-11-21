/* v2 样板页交互：提示词自动滚动、字符计数、对话逐条出现 */
(function () {
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 提示词自动滚动（循环）
  const scrollers = new Map();
  function startScroll(box) {
    const view = box.querySelector(".pr-view"), pre = box.querySelector("pre");
    if (!view || !pre) return;
    stopScroll(box);
    let y = 0, last = performance.now(), pause = 900;
    const step = (t) => {
      const dt = t - last; last = t;
      const max = pre.scrollHeight - view.clientHeight;
      if (pause > 0) { pause -= dt; }
      else { y += dt * 0.045; if (y >= max + 40) { y = 0; pause = 1500; } }
      pre.style.transform = `translateY(${-Math.min(y, max)}px)`;
      scrollers.set(box, requestAnimationFrame(step));
    };
    if (reduce) return;
    scrollers.set(box, requestAnimationFrame(step));
  }
  function stopScroll(box) { const id = scrollers.get(box); if (id) cancelAnimationFrame(id); scrollers.delete(box); }

  // 数字滚动
  function countTo(el) {
    const to = +el.dataset.to, t0 = performance.now(), dur = 1600;
    const tick = (t) => { const k = Math.min(1, (t - t0) / dur); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }

  // 对话逐条
  function chatState(chat) {
    const items = $$(".chat-log li", chat), n = chat.querySelector(".chat-n");
    const shown = items.filter((li) => li.classList.contains("shown")).length;
    if (n) n.textContent = `${shown} / ${items.length}`;
    return { items, shown };
  }
  function chatNext(chat) { const { items, shown } = chatState(chat); if (shown < items.length) items[shown].classList.add("shown"); chatState(chat); }
  function chatAll(chat) { $$(".chat-log li", chat).forEach((li) => li.classList.add("shown")); chatState(chat); }
  function chatReset(chat) { const items = $$(".chat-log li", chat); items.forEach((li, i) => li.classList.toggle("shown", i === 0)); chatState(chat); }
  $$("[data-chat]").forEach((chat) => {
    chat.querySelector("[data-chat-next]")?.addEventListener("click", (e) => { e.stopPropagation(); chatNext(chat); });
    chat.querySelector("[data-chat-all]")?.addEventListener("click", (e) => { e.stopPropagation(); chatAll(chat); });
    chat.querySelector(".chat-log")?.addEventListener("click", () => chatNext(chat));
    chatReset(chat);
  });

  // 进出页面时启动/停止
  function onEnter(s) {
    $$("[data-autoscroll]", s).forEach(startScroll);
    $$(".pr-count", s).forEach(countTo);
    $$("[data-chat]", s).forEach(chatReset);
  }
  function onLeave(s) { $$("[data-autoscroll]", s).forEach(stopScroll); }
  $$("section.slide").forEach((s) => {
    let was = s.classList.contains("is-active");
    if (was) onEnter(s);
    new MutationObserver(() => {
      const now = s.classList.contains("is-active");
      if (now && !was) onEnter(s); else if (!now && was) onLeave(s);
      was = now;
    }).observe(s, { attributes: true, attributeFilter: ["class"] });
  });
})();
