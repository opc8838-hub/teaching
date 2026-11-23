# 打开一个有界面的浏览器让用户登录 hely.fun，登录成功后保存登录状态
import time, sys
from playwright.sync_api import sync_playwright
STATE = sys.argv[1]
with sync_playwright() as p:
    b = p.chromium.launch(headless=False, args=["--start-maximized"])
    ctx = b.new_context(no_viewport=True, locale="zh-CN")
    pg = ctx.new_page()
    for _ in range(5):
        try:
            pg.goto("https://hely.fun/login", timeout=60000); break
        except Exception as e:
            print("retry", e, flush=True); time.sleep(3)
    pg.bring_to_front()
    t0 = time.time()
    while time.time() - t0 < 1800:
        names = [c["name"] for c in ctx.cookies("https://hely.fun")]
        if any(n == "hely_session" or "session" in n.lower() or n.startswith("sb-") for n in names):
            time.sleep(3)
            ctx.storage_state(path=STATE)
            print("LOGGED_IN", flush=True)
            break
        time.sleep(2)
    else:
        print("TIMEOUT", flush=True)
    b.close()
