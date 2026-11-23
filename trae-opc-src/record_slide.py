# 逐帧录某一页课件：python record_slide.py <页码> <秒数> <输出mp4>
# 做法：暂停页面上所有动画，每帧手动推进 1/30 秒再截图，保证画面匀速、不掉帧。
import shutil, subprocess, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

DECK = Path("E:/碳基/_deploy/teaching/trae-opc")
FFMPEG = "E:/claude工作区/back-to-work-video/tools/ffmpeg.exe"
slide, secs, out = int(sys.argv[1]), float(sys.argv[2]), sys.argv[3]
FPS = 30
import tempfile
tmp = Path(tempfile.gettempdir()) / f"slide{slide}_frames"  # 临时帧目录，不放桌面
shutil.rmtree(tmp, ignore_errors=True); tmp.mkdir(parents=True)

STEP_JS = """(dt) => {
  window.__an = window.__an || new Map();
  for (const a of document.getAnimations()) {
    if (!window.__an.has(a)) { a.pause(); window.__an.set(a, a.currentTime || 0); }
    const v = window.__an.get(a) + dt; window.__an.set(a, v);
    try { a.currentTime = v; } catch (e) {}
  }
}"""

srv = subprocess.Popen([sys.executable, "-m", "http.server", "8779", "--bind", "127.0.0.1"], cwd=DECK,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.2)
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1920, "height": 1080})
        pg.goto(f"http://127.0.0.1:8779/index.html#slide-{slide - 1}")
        pg.wait_for_timeout(2500)
        pg.evaluate("Promise.all(Array.from(document.images).map(i => i.decode().catch(()=>{})))")
        pg.keyboard.press("ArrowRight")
        n = int(secs * FPS)
        for i in range(n):
            pg.evaluate(STEP_JS, 0 if i == 0 else 1000 / FPS)
            pg.screenshot(path=str(tmp / f"f{i:04d}.png"))
        b.close()
finally:
    srv.terminate()
subprocess.run([FFMPEG, "-v", "error", "-y", "-framerate", str(FPS), "-i", str(tmp / "f%04d.png"),
                "-c:v", "libx264", "-crf", "16", "-preset", "slow", "-pix_fmt", "yuv420p",
                "-vf", "scale=in_range=full:out_range=tv:flags=accurate_rnd+full_chroma_int",
                "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
                "-movflags", "+faststart", out], check=True)
shutil.rmtree(tmp, ignore_errors=True)
print("ok", out)
