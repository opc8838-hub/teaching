# 截图检查：python shoot.py act1.html outdir [W H] [W H]...
import subprocess, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

DECK = Path("E:/碳基/_deploy/teaching/trae-opc")
page, out = sys.argv[1], Path(sys.argv[2])
sizes = [(int(a), int(b)) for a, b in zip(sys.argv[3::2], sys.argv[4::2])] or [(1920, 1080), (1366, 768)]
out.mkdir(parents=True, exist_ok=True)
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8773", "--bind", "127.0.0.1"], cwd=DECK,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.2)
errs = []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        for W, H in sizes:
            pg = b.new_page(viewport={"width": W, "height": H})
            pg.on("pageerror", lambda e: errs.append(str(e)))
            pg.on("console", lambda m: errs.append(m.text) if m.type == "error" else None)
            pg.goto(f"http://127.0.0.1:8773/{page}"); pg.wait_for_timeout(1500)
            n = pg.evaluate("document.querySelectorAll('section.slide').length")
            for i in range(1, n + 1):
                pg.evaluate(f"location.hash='#slide-{i}'"); pg.wait_for_timeout(3600)
                sel = f"section.slide:nth-of-type({i}) [data-flip-all]"
                if pg.query_selector(sel):
                    pg.click(sel); pg.wait_for_timeout(1400)
                st = f"section.slide:nth-of-type({i}) [data-steps]"
                if pg.query_selector(st):
                    n_items = pg.evaluate(f"document.querySelector('{st}').querySelectorAll('li, .two-msg p').length")
                    for _ in range(n_items):
                        pg.click(st); pg.wait_for_timeout(120)
                    pg.wait_for_timeout(700)
                pg.screenshot(path=str(out / f"{W}_{i:02d}.png"))
            pg.close()
        b.close()
finally:
    srv.terminate()
print("slides", n, "errors", errs)
