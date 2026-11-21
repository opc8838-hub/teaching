/* 第一幕交互：翻牌、进页自动播视频 */
(function () {
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  $$("[data-flip]").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); b.classList.toggle("on"); }));
  $$("[data-flip-all]").forEach((b) => b.addEventListener("click", (e) => {
    e.stopPropagation();
    const rows = $$("[data-flip]", b.closest(".slide"));
    const allOn = rows.every((r) => r.classList.contains("on"));
    rows.forEach((r, i) => setTimeout(() => r.classList.toggle("on", !allOn), allOn ? 0 : i * 180));
  }));
  function enter(s) {
    $$("video[data-autoplay]", s).forEach((v) => { try { v.currentTime = 0; v.play().catch(() => {}); } catch (_) {} });
    $$("[data-flip]", s).forEach((r) => r.classList.remove("on"));
  }
  function leave(s) { $$("video[data-autoplay]", s).forEach((v) => v.pause()); }
  $$("section.slide").forEach((s) => {
    let was = s.classList.contains("is-active");
    if (was) enter(s);
    new MutationObserver(() => {
      const now = s.classList.contains("is-active");
      if (now && !was) enter(s); else if (!now && was) leave(s);
      was = now;
    }).observe(s, { attributes: true, attributeFilter: ["class"] });
  });
})();
/* 点卡片：全屏有声播放 */
(function () {
  window.openVideoBox = function (src, alt) {
    const box = document.createElement("div");
    box.className = "vlb";
    box.innerHTML = `<video src="${src}" controls autoplay playsinline></video><button type="button">关闭 Esc</button>`;
    const v = box.querySelector("video");
    if (alt) v.addEventListener("error", () => { if (v.src !== alt) { v.src = alt; v.play().catch(() => {}); } }, { once: true });
    document.body.appendChild(box);
    const onKey = (ev) => { ev.stopPropagation(); if (ev.key === "Escape") close(); };
    function close() { box.querySelector("video").pause(); box.remove(); document.removeEventListener("keydown", onKey, true); }
    box.addEventListener("click", (ev) => { ev.stopPropagation(); if (ev.target === box || ev.target.tagName === "BUTTON") close(); });
    document.addEventListener("keydown", onKey, true);
  };
  document.querySelectorAll("[data-full]").forEach((card) => card.addEventListener("click", (e) => {
    e.stopPropagation(); window.openVideoBox(card.dataset.full, card.dataset.alt);
  }));
})();
/* 你可以是一名……：轮换角色词 */
(function () {
  document.querySelectorAll("[data-becoming]").forEach(function (root) {
    var box = root.querySelector("[data-role=word]"), chips = Array.from(root.querySelectorAll("[data-role=chips] span")), k = 0;
    var slide = root.closest(".slide");
    function show(n) {
      var old = box.querySelector("span:not(.out)");
      if (old) { old.classList.add("out"); setTimeout(function () { old.remove(); }, 420); }
      var sp = document.createElement("span"); sp.textContent = chips[n].textContent; box.appendChild(sp);
      chips.forEach(function (c, i) { c.classList.toggle("on", i === n); });
    }
    setInterval(function () { if (!slide.classList.contains("is-active")) return; k = (k + 1) % chips.length; show(k); }, 1500);
    chips.forEach(function (c, i) { c.addEventListener("click", function (e) { e.stopPropagation(); k = i; show(i); }); });
    box.innerHTML = ""; show(0);
  });
})();
