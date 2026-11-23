# 录公开页面的交互：首页动画、场景广场滚动+灵动岛、案例卡悬停+使用抽屉、Agent 中心、五联图三种界面
import os, shutil, sys
from playwright.sync_api import sync_playwright
def clip(p, name, fn):
    b = p.chromium.launch()
    ctx = b.new_context(viewport={"width":1600,"height":900}, record_video_dir="rec/tmp", record_video_size={"width":1600,"height":900}, locale="zh-CN")
    pg = ctx.new_page()
    try:
        fn(pg)
    except Exception as e:
        print(name, "ERR", e)
    v = pg.video; ctx.close(); b.close()
    shutil.move(v.path(), f"rec/{name}.webm"); print(name, "ok")

def home(pg):
    pg.goto("https://hely.fun/", wait_until="networkidle"); pg.wait_for_timeout(7000)
def plaza(pg):
    pg.goto("https://hely.fun/?menu=plaza-open#cases", wait_until="networkidle"); pg.wait_for_timeout(2500)
    for _ in range(8): pg.mouse.wheel(0, 260); pg.wait_for_timeout(450)
    pg.wait_for_timeout(800)
    for x in (380, 700, 1000, 1300): pg.mouse.move(x, 120, steps=12); pg.wait_for_timeout(500)
def card(pg):
    pg.goto("https://hely.fun/?menu=plaza-open#cases", wait_until="networkidle"); pg.wait_for_timeout(2500)
    pg.mouse.wheel(0, 500); pg.wait_for_timeout(1200)
    btns = pg.locator("text=使用")
    pg.mouse.move(600, 600, steps=15); pg.wait_for_timeout(1200)
    pg.mouse.move(900, 600, steps=15); pg.wait_for_timeout(1200)
    if btns.count():
        btns.nth(1).hover(); pg.wait_for_timeout(800); btns.nth(1).click(); pg.wait_for_timeout(3500)
def agent(pg):
    pg.goto("https://hely.fun/agent", wait_until="networkidle"); pg.wait_for_timeout(9000)
def five(pg):
    pg.goto("https://hely.fun/five-panel", wait_until="networkidle"); pg.wait_for_timeout(3000)
    for t in ("原版","灰色玻璃","紫色玻璃"):
        try: pg.get_by_text(t, exact=True).first.click(); pg.wait_for_timeout(2500)
        except Exception as e: print("five", t, e)
with sync_playwright() as p:
    for n,f in (("home",home),("plaza",plaza),("card",card),("agent",agent),("five",five)):
        clip(p, n, f)
