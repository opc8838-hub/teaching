(() => {
  "use strict";
  const $ = selector => document.querySelector(selector);
  const all = selector => [...document.querySelectorAll(selector)];
  const on = (selector, fn) => $(selector).addEventListener("click", fn);
  const refit = () => window.dispatchEvent(new Event("resize"));

  function replay(element) {
    const animations = element.getAnimations({ subtree: true });
    for (const animation of animations) {
      animation.currentTime = 0;
      animation.play();
    }
  }
  on("#route-replay", () => replay($(".map-six")));
  on("#zoo-replay", () => {
    const zoo = $("#zoo");
    zoo.classList.add("rewinding");
    void zoo.offsetWidth;
    zoo.classList.remove("rewinding");
  });

  on("#fold-steps", event => {
    const folded = !$("#oldsteps").hidden;
    $("#oldsteps").hidden = folded;
    $("#newsteps").hidden = !folded;
    $("#step-caption").textContent = folded ? "在 hely.fun，用户只看到这三步" : "做一张图，常见的走法";
    event.currentTarget.textContent = folded ? "重看七步 ↶" : "收成三步 →";
  });

  on("#flip-schema", event => {
    const card = event.currentTarget;
    const back = card.getAttribute("aria-pressed") === "false";
    card.setAttribute("aria-pressed", String(back));
    $(".schema-face").hidden = back;
    $(".schema-back").hidden = !back;
    card.classList.remove("turned");
    void card.offsetWidth;
    card.classList.add("turned");
  });

  let wallFrame = 0;
  function growWall() {
    cancelAnimationFrame(wallFrame);
    const start = performance.now();
    const count = $("#wall-count");
    count.textContent = "24";
    function tick(now) {
      const fraction = Math.max(0, Math.min(1, (now - start - 250) / 1700));
      count.textContent = Math.round(24 + (1689 - 24) * (1 - (1 - fraction) ** 2));
      if (fraction < 1) wallFrame = requestAnimationFrame(tick);
    }
    wallFrame = requestAnimationFrame(tick);
  }
  on("#wall-replay", growWall);

  for (const spot of all(".hot")) {
    spot.addEventListener("click", () => spot.setAttribute("aria-pressed", String(spot.getAttribute("aria-pressed") !== "true")));
  }
  on("#show-fields", event => {
    const list = $("#fields");
    list.hidden = !list.hidden;
    event.currentTarget.textContent = list.hidden ? "揭晓真实表单 →" : "收起表单 ↶";
    event.currentTarget.setAttribute("aria-expanded", String(!list.hidden));
    refit();
  });

  for (const node of all(".node")) {
    node.addEventListener("click", () => {
      $(".node.selected").classList.remove("selected");
      node.classList.add("selected");
      $("#node-detail").textContent = node.dataset.blurb;
    });
  }

  const cards = all(".role-card");
  let roleIndex = 0;
  on("#next-role", event => {
    const button = event.currentTarget;
    if (roleIndex > cards.length) {
      roleIndex = 0;
      for (const card of cards) {
        card.classList.remove("revealed", "owned");
        card.querySelector("b").textContent = "？";
      }
      $("#role-count").textContent = "0";
      button.textContent = "翻一张角色牌 →";
    } else if (roleIndex === cards.length) {
      for (const card of cards) {
        card.classList.add("owned");
        card.querySelector("b").textContent = "我 + AI";
      }
      roleIndex++;
      button.textContent = "重新数一遍 ↻";
    } else {
      const card = cards[roleIndex++];
      card.classList.add("revealed");
      card.querySelector("b").textContent = card.dataset.roleName;
      $("#role-count").textContent = roleIndex;
      if (roleIndex === cards.length) button.textContent = "这些活，谁来干？";
    }
  });

  const launchDialog = document.createElement("dialog");
  launchDialog.className = "launch-dialog";
  launchDialog.setAttribute("aria-labelledby", "launch-title");
  launchDialog.innerHTML = '<span class="micro">上线那些事</span><h3 id="launch-title"></h3><p></p><button type="button" class="action">讲完了，返回 ↶</button>';
  document.body.append(launchDialog);
  for (const card of all(".launch-card")) {
    card.addEventListener("click", () => {
      $("#launch-title").textContent = card.querySelector("strong").textContent;
      launchDialog.querySelector("p").textContent = card.dataset.full;
      launchDialog.showModal();
    });
  }
  launchDialog.querySelector("button").addEventListener("click", () => launchDialog.close());
  launchDialog.addEventListener("click", event => {
    if (event.target !== launchDialog) return;
    const bounds = launchDialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) launchDialog.close();
  });
  window.addEventListener("keydown", event => {
    if (launchDialog.open) event.stopImmediatePropagation();
  }, true);
  window.addEventListener("wheel", event => {
    if (launchDialog.open) event.stopImmediatePropagation();
  }, { capture: true, passive: true });

  const overlays = {
    2: ["hover-hint", "请上传你的图片或信息"],
    3: ["drawer-hint", "<strong>使用这个案例</strong><label>菜品或技巧主题</label><label>标题文字</label>"],
    4: ["ball-hint", "●　已创作…"]
  };
  function previewStep(link, index) {
    $(".demo-step.selected").classList.remove("selected");
    link.classList.add("selected");
    $(".demo-image img").src = "img/shot_" + link.dataset.shot + ".jpg";
    $(".demo-image img").alt = link.dataset.caption;
    $("#demo-cap").textContent = link.dataset.caption;
    const overlay = $("#demo-overlay");
    overlay.hidden = !overlays[index];
    if (overlays[index]) {
      overlay.className = overlays[index][0];
      overlay.innerHTML = overlays[index][1];
    }
  }
  all(".demo-step").forEach((link, index) => {
    link.addEventListener("click", () => previewStep(link, index));
    link.addEventListener("focus", () => previewStep(link, index));
  });

  const progressAt = t => Math.min(96, Math.round(8 + 88 * (1 - Math.exp(-t / 30))));
  const curveX = t => 44 + Math.min(t, 180) * 310 / 180;
  const curveY = p => 188 - p * 1.6;
  const path = Array.from({ length: 181 }, (_, t) => (t ? "L" : "M") + curveX(t).toFixed(2) + " " + curveY(8 + 88 * (1 - Math.exp(-t / 30))).toFixed(2)).join(" ");
  $("#curve-line").setAttribute("d", path);
  let progressFrame = 0, simSeconds = 0;
  function paintProgress(seconds, percent) {
    $("#progress-text").textContent = "已创作 " + Math.floor(seconds) + " 秒 · " + percent + "%";
    $("#meter-fill").style.width = percent + "%";
    $("#curve-dot").setAttribute("cx", curveX(seconds));
    $("#curve-dot").setAttribute("cy", curveY(percent));
  }
  function resetProgress() {
    cancelAnimationFrame(progressFrame);
    simSeconds = 0;
    paintProgress(0, 0);
    $("#progress-start").textContent = "开始";
    $("#progress-end").disabled = true;
    $("#finish-line").removeAttribute("d");
  }
  resetProgress();
  on("#progress-start", () => {
    resetProgress();
    $("#progress-start").textContent = "重新开始";
    $("#progress-end").disabled = false;
    const start = performance.now();
    function tick(now) {
      simSeconds = Math.max(0, (now - start) * 3 / 1000);
      paintProgress(Math.floor(simSeconds), progressAt(Math.floor(simSeconds)));
      progressFrame = requestAnimationFrame(tick);
    }
    tick(start);
  });
  on("#progress-end", () => {
    cancelAnimationFrame(progressFrame);
    $("#finish-line").setAttribute("d", "M" + curveX(Math.floor(simSeconds)) + " " + curveY(progressAt(Math.floor(simSeconds))) + "V" + curveY(100));
    paintProgress(Math.floor(simSeconds), 100);
    $("#progress-end").disabled = true;
  });

  for (const card of all(".motion-card")) {
    card.addEventListener("click", () => {
      card.classList.remove("run");
      void card.offsetWidth;
      card.classList.add("run");
    });
  }

  on("#reveal-fault", event => {
    const reveal = $("#fault-list").hidden;
    $("#fault-img").src = reveal ? "img/five_marked.jpg" : "img/five_raw.jpg";
    $("#fault-img").alt = reveal ? "已标注旧店名、背景断开和 Logo 白方块的五联图" : "无标注五联图";
    $("#fault-list").hidden = !reveal;
    $("#fault-question").hidden = reveal;
    event.currentTarget.textContent = reveal ? "重看原图 ↶" : "揭晓 →";
  });
  for (const tab of all(".theme-tab")) {
    tab.addEventListener("click", () => {
      $(".theme-tab.selected").classList.remove("selected");
      tab.classList.add("selected");
      $("#theme-img").src = "img/shot_" + tab.dataset.src + ".jpg";
      $("#theme-img").alt = "五联图 · " + tab.textContent;
      $("#theme-caption").textContent = $("#theme-img").alt;
    });
  }

  let timerFrame = 0;
  function resetTimer() {
    cancelAnimationFrame(timerFrame);
    $("#timer").textContent = "00:30";
    $("#timer-start").disabled = false;
    $("#timer-start").textContent = "开始";
  }
  on("#timer-reset", resetTimer);
  on("#timer-start", () => {
    resetTimer();
    const deadline = performance.now() + 30000;
    $("#timer-start").disabled = true;
    $("#timer-start").textContent = "计时中";
    function tick() {
      const left = Math.max(0, Math.ceil((deadline - performance.now()) / 1000));
      $("#timer").textContent = "00:" + String(left).padStart(2, "0");
      if (left > 0) timerFrame = requestAnimationFrame(tick);
      else {
        $("#timer-start").textContent = "下一位，开始";
        $("#timer-start").disabled = false;
      }
    }
    tick();
  });

  let active = null;
  function syncSlide() {
    const current = $(".slide.is-active");
    if (current === active) return;
    if (active?.contains($("#timer"))) resetTimer();
    if (active?.contains($("#curve"))) resetProgress();
    if (active?.contains($("#wall-count"))) cancelAnimationFrame(wallFrame);
    if (launchDialog.open) launchDialog.close();
    active = current;
    if (current?.contains($("#wall-count"))) growWall();
  }
  const observer = new MutationObserver(syncSlide);
  for (const slide of all(".slide")) observer.observe(slide, { attributes: true, attributeFilter: ["class"] });
  syncSlide();
  window.addEventListener("load", refit);
})();

