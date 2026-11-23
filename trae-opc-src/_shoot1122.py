import subprocess, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright
DECK = Path("E:/碳基/_deploy/teaching/trae-opc"); out = Path("_shots1122"); out.mkdir(exist_ok=True)
srv = subprocess.Popen([sys.executable, "-m", "http.server", "8775", "--bind", "127.0.0.1"], cwd=DECK, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1.2); errs = []
try:
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1920, "height": 1080})
        pg.on("pageerror", lambda e: errs.append(str(e)))
        pg.goto("http://127.0.0.1:8775/index.html"); pg.wait_for_timeout(1500)
        idx = pg.evaluate("""Array.from(document.querySelectorAll('section.slide')).map((s,i)=>[i+1,s.dataset.title,s.innerHTML.includes('ah_cardbot-web')||s.innerHTML.includes('b2w-wall')]).filter(x=>x[2])""")
        print(idx)
        for i, t, _ in idx:
            pg.evaluate(f"location.hash='#slide-{i}'"); pg.wait_for_timeout(3500)
            pg.screenshot(path=str(out / f"{i:02d}.png"))
        # 点 cardbot 卡片看全屏有没有声音
        i = next(i for i, t, _ in idx if 'b2w' not in (t or '').lower() and 'B2W' not in (t or ''))
        pg.evaluate(f"location.hash='#slide-{i}'"); pg.wait_for_timeout(1500)
        pg.locator("section.slide.is-active [data-full*=cardbot]").first.click(); pg.wait_for_timeout(2500)
        print(pg.evaluate("(()=>{const v=document.querySelector('.vlb video');return [v.currentSrc.split('/').pop(), v.duration, v.muted, v.paused]})()"))
        b.close()
finally:
    srv.terminate()
print("errors", errs)
