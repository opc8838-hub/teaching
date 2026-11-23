import sys, json
from playwright.sync_api import sync_playwright
urls = {"home":"/", "plaza":"/?menu=plaza-open#cases", "create":"/create", "file":"/create?mode=file", "reverse":"/create?mode=reverse",
        "canvas":"/canvas", "agent":"/agent", "community":"/community", "five":"/five-panel", "recharge":"/recharge", "login":"/login",
        "history":"/history", "favorites":"/favorites"}
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width":1920,"height":1080}, locale="zh-CN", device_scale_factor=1)
    for k,u in urls.items():
        try:
            pg.goto("https://hely.fun"+u, wait_until="networkidle", timeout=60000)
        except Exception as e:
            print(k, "timeout")
        pg.wait_for_timeout(2500)
        pg.screenshot(path=f"public/{k}.png")
        print(k, pg.url, pg.title())
    links = pg.eval_on_selector_all("a[href]", "els=>els.map(e=>[e.innerText.trim().slice(0,20),e.getAttribute('href')])")
    print(json.dumps(links[:60], ensure_ascii=False))
    b.close()
