/* 第三、四幕交互：逐层揭示、MutedMEN 看大图 */
(function () {
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const items = (box) => $$(":scope > ol > li, :scope > .two-msg > p, :scope ol.ice-low > li", box);

  // 点一下，翻下一层
  $$("[data-steps]").forEach((box) => box.addEventListener("click", (e) => {
    e.stopPropagation();
    const list = items(box), next = list.find((x) => !x.classList.contains("on"));
    if (next) next.classList.add("on"); else list.forEach((x) => x.classList.remove("on"));
  }));

  // MutedMEN 看大图
  $$("[data-mm-wall] img").forEach((img) => img.addEventListener("click", (e) => {
    e.stopPropagation();
    const box = document.createElement("div");
    box.className = "ilb";
    box.innerHTML = `<img src="${img.dataset.big}" alt=""><span>${img.title} · 点任意处关闭</span>`;
    document.body.appendChild(box);
    const onKey = (ev) => { ev.stopPropagation(); if (ev.key === "Escape") close(); };
    function close() { box.remove(); document.removeEventListener("keydown", onKey, true); }
    box.addEventListener("click", (ev) => { ev.stopPropagation(); close(); });
    document.addEventListener("keydown", onKey, true);
  }));

  // 进页重置
  function enter(s) { $$("[data-steps]", s).forEach((b) => items(b).forEach((x) => x.classList.remove("on"))); }
  $$("section.slide").forEach((s) => {
    let was = s.classList.contains("is-active");
    new MutationObserver(() => {
      const now = s.classList.contains("is-active");
      if (now && !was) enter(s);
      was = now;
    }).observe(s, { attributes: true, attributeFilter: ["class"] });
  });
})();
