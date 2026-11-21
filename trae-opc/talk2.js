/* 新版课件只保留「现场演示路线」的预览切换（旧 talk.js 的其余互动页已不在课件里） */
(() => {
  "use strict";
  const $ = (s) => document.querySelector(s);
  const steps = [...document.querySelectorAll(".demo-step")];
  if (!steps.length) return;
  const overlays = {
    2: ["hover-hint", "请上传你的图片或信息"],
    3: ["drawer-hint", "<strong>使用这个案例</strong><label>菜品或技巧主题</label><label>标题文字</label>"],
    4: ["ball-hint", "●　已创作…"]
  };
  function previewStep(link, index) {
    $(".demo-step.selected")?.classList.remove("selected");
    link.classList.add("selected");
    const img = $(".demo-image img"), cap = $("#demo-cap"), overlay = $("#demo-overlay");
    if (img) { img.src = "img/shot_" + link.dataset.shot + ".jpg"; img.alt = link.dataset.caption || ""; }
    if (cap) cap.textContent = link.dataset.caption || "";
    if (overlay) {
      overlay.hidden = !overlays[index];
      if (overlays[index]) { overlay.className = overlays[index][0]; overlay.innerHTML = overlays[index][1]; }
    }
  }
  steps.forEach((link, index) => {
    link.addEventListener("click", () => previewStep(link, index));
    link.addEventListener("focus", () => previewStep(link, index));
  });
})();
