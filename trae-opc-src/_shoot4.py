import subprocess, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
DECK = Path("E:/碳基/_deploy/teaching/trae-opc"); out = Path("_shots1121"); out.mkdir(exist_ok=True)
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8774", "--bind", "127.0.0.1"], cwd=DECK, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.2); errs = []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for W, H in [(1920, 1080), (1366, 768)]:
            pg = b.new_page(viewport={"width": W, "height": H})
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.goto("http://127.0.0.1:8774/index.html"); pg.wait_for_timeout(1500)
            for i in [8, 27, 28, 42]:
                pg.evaluate(f"location.hash='#slide-{i}'"); pg.wait_for_timeout(3500)
                ov = pg.evaluate(f"(()=>{{const s=document.querySelectorAll('section.slide')[{i-1}];return [s.dataset.title, s.scrollHeight>s.clientHeight+2, s.scrollWidth>s.clientWidth+2]}})()")
                print(W, i, ov)
                pg.screenshot(path=str(out / f"{W}_{i:02d}.png"))
            pg.close()
        b.close()
finally:
    srv.terminate()
print("errors", errs)
