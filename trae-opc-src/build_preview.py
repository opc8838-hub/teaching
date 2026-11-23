# 组装 v2 样板页：把真实提交记录、真实案例数据嵌进 preview.html
import csv
import datetime as dt
import html
import json
from pathlib import Path

HERE = Path(__file__).parent
DECK = Path("E:/碳基/_deploy/teaching/trae-opc")
SCR = Path(r"C:\Users\ADMINI~1\AppData\Local\Temp\claude\b9178ff53ebf138e\8c4037e1-9a10-4ae6-aa50-5c09f84b0106\scratchpad")

case = json.loads((HERE / "capture/case_dish.json").read_text(encoding="utf-8"))
prompt = case["prompt_raw"]
fields = case["input_schema"]
commits = {a: int(b) for a, b in csv.reader(open(HERE / "capture/commits_by_day.csv", encoding="utf-8"))}
total, days = sum(commits.values()), len(commits)

# ---------- 热力图 ----------
start = dt.date(2026, 5, 18)   # 周一
end = dt.date(2026, 11, 22)
def level(n):
    return 0 if n == 0 else 1 if n <= 2 else 2 if n <= 5 else 3 if n <= 10 else 4
cells, months, d, col = [], [], start, 0
last_month = None
while d <= end:
    if d.weekday() == 0 and d.month != last_month:
        months.append((col, f"{d.month} 月")); last_month = d.month
    n = commits.get(d.isoformat(), 0)
    future = d > dt.date(2026, 11, 18)
    cls = "f" if future else f"l{level(n)}"
    tip = f"{d.month}/{d.day} · {n} 次" if not future else ""
    cells.append(f'<i class="{cls}" style="grid-column:{col+1};grid-row:{d.weekday()+1}" data-d="{d.isoformat()}" title="{tip}"></i>')
    if d.weekday() == 6:
        col += 1
    d += dt.timedelta(days=1)
weeks = col + 1
def colof(day):
    return (dt.date.fromisoformat(day) - start).days // 7
pins = [
    ("2026-05-21", "开工", "10 次", "l"),
    ("2026-05-25", "上线那天", "23 次", "l"),
    ("2026-07-02", "上线冲刺", "18 次", "l"),
    ("2026-09-01", "9 月只有这 1 次", "", "w"),
    ("2026-10-07", "五联图开工", "", "l"),
    ("2026-10-28", "网站挂了", "", "r"),
]
pin_html = "".join(
    f'<div class="pin {k}" style="--c:{colof(day)};--w:{weeks}"><b>{t}</b>{f"<small>{s}</small>" if s else ""}</div>' for day, t, s, k in pins)
month_html = "".join(f'<span style="grid-column:{c+1}">{m}</span>' for c, m in months)
month_totals = {}
for k, v in commits.items():
    month_totals[int(k[5:7])] = month_totals.get(int(k[5:7]), 0) + v

# ---------- 5 个格子 ----------
field_html = "".join(
    f'<li><span>{html.escape(f["label"])}</span><em>{"必填" if f["required"] else "选填"}</em></li>' for f in fields)

slides = []

# 0. 我是谁（沿用珠江那页，加讲过的课）
slides.append('''
<section class="slide" data-chapter="00 / 开场" data-title="我是谁" data-minutes="1.5" data-notes="不要念履历。重点讲一句话：我不是算法工程师，我是用 AI 把东西做出来、交给付钱的人的那种人。然后指下面四个产品：这些都是我一个人加 AI 做出来、真在线上跑的东西——今天主要讲第一个 hely.fun。讲课的事底部一行带过，不展开。">
  <div class="frame">
    <header class="s-head">
      <span class="kicker">00 / 先认识一下</span>
    </header>
    <div class="body">
      <div class="me-grid">
        <figure class="photo me-photo"><img src="img/me.jpg" alt="黎健堂"></figure>
        <div>
          <h2 class="me-name">黎健堂<span>大家可以叫我 黎生</span></h2>
          <div class="me-roles">
            <span class="tag blue">碳基社区 · 智能体板块负责人</span>
            <span class="tag">广州德宝里科技服务有限公司 负责人</span>
            <span class="tag">前阿里本地生活 东莞城市经理</span>
            <span class="tag yel">黑客松 Agent 赛道冠军</span>
          </div>
          <p class="me-line">我不是算法工程师。<br>我是一个<span class="hl">用 AI 把东西做出来、交给付钱的人</span>的人。</p>
          <div class="stats" style="--n:4">
            <div class="stat blue"><div class="n"><span class="count" data-to="1689">0</span><small>个</small></div><p>hely.fun 入库的 AI 设计案例</p></div>
            <div class="stat"><div class="n"><span class="count" data-to="895">0</span><small>次</small></div><p>hely.fun + CellMotion 两个产品的提交</p></div>
            <div class="stat"><div class="n"><span class="count" data-to="24">0</span><small>个</small></div><p>GitHub 公开仓库，产品、组件、工具</p></div>
            <div class="stat blue"><div class="n"><span class="count" data-to="124">0</span><small>★</small></div><p>开源项目收到的 GitHub 星标</p></div>
          </div>
          <div class="me-prods">
            <a href="https://hely.fun" target="_blank" rel="noopener"><img src="img/prod_hely.jpg" alt=""><b>hely.fun</b><span>AI 生图站 · 已上线收费</span></a>
            <a href="https://cellmotion.cn" target="_blank" rel="noopener"><img src="img/prod_cellmotion.jpg" alt=""><b>cellmotion.cn</b><span>可编辑动效站 · 514 次提交</span></a>
            <a href="https://www.carbounity.com" target="_blank" rel="noopener"><img src="img/prod_carbounity.jpg" alt=""><b>carbounity.com</b><span>碳基社区官网 · 重构上线</span></a>
            <a href="https://github.com/opc8838-hub/cover-flow-showcase" target="_blank" rel="noopener"><img src="img/prod_coverflow.jpg" alt=""><b>Glass Cover Flow</b><span>开源 React 组件 · 79 ★</span></a>
          </div>
        </div>
      </div>
    </div>
    <p class="footnote"><b>也在讲课</b>碳基社区 AI Agent 第一课 · DeepSeek 家长实操课 · AI 通识与实操 5 讲 · 珠江职业技术学院讲座 &nbsp;|&nbsp; github.com/opc8838-hub</p>
  </div>
</section>''')

# 1. 章节开场
slides.append('''
<section class="slide v2-chapter" data-chapter="01 / 起点" data-title="章节：起点" data-minutes="0.5" data-notes="章节页，停两秒再讲。这一章只回答一个问题：为什么要做 hely。">
  <div class="frame"><div class="v2c">
    <div class="v2c-num">01</div>
    <div class="v2c-main">
      <span class="v2c-tag">起点</span>
      <h2>提示词，<em>是反人类的</em></h2>
      <p class="v2c-q">这一章回答：一个开餐馆的老板，为什么做不出一张好图？</p>
    </div>
    <ol class="v2c-route"><li class="on">起点</li><li>第一天</li><li>知识</li><li>Skill</li><li>一个人</li><li>体验</li><li>迭代</li><li>摔跤</li></ol>
  </div></div>
</section>''')

# 2. 一条真实提示词
slides.append(f'''
<section class="slide" data-chapter="01 / 起点" data-title="一条真实的提示词" data-minutes="2" data-notes="这页不用念提示词，让它自己滚。先指左边这张图：很漂亮对吧？再指中间：这是做出这张图的真实提示词，案例库第 1646 号，3170 个字符、339 个英文单词，还是 JSON 格式。最后指右边：老板只会说一句话。hely 要做的，就是把中间这一坨藏起来，只留右下角这 5 个格子。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">01 / 起点 · 一条真实的提示词</span><span class="leaf">HELY.FUN / 案例 #1646</span></div>
      <h2>一张菜品图，背后是 <em>3170 个字符</em></h2>
      <p class="lead">这是 hely 案例库里<b>真实的一条提示词</b>。老板想要这张图，就得先学会写它。</p>
    </header>
    <div class="body"><div class="pr-grid">
      <figure class="pr-shot"><img src="img/case_dish.jpg" alt="案例 1646 效果图"><figcaption>效果图 · 案例 #1646</figcaption></figure>
      <div class="pr-code" data-autoscroll>
        <div class="pr-bar"><i></i><i></i><i></i><span>prompt_raw.json</span><b><span class="pr-count" data-to="3170">0</span> 字符 · 339 词</b></div>
        <div class="pr-view"><pre>{html.escape(prompt)}</pre></div>
      </div>
      <div class="pr-side">
        <div class="pr-boss"><span class="micro">老板会怎么说？</span><blockquote>“帮我做张中秋海报，<br>放我们家<mark>招牌菜</mark>。”</blockquote></div>
        <div class="pr-form"><span class="micro">在 hely 里，同一张图只要填</span><div class="pr-five"><b>5</b><span>个格子</span></div><ul>{field_html}</ul></div>
      </div>
    </div></div>
    <div class="page-foot v2-src"><span>出处</span>hely.fun 案例库第 1646 号「商业广告 / 产品展示复用」：原始提示词 prompt_raw 原文与真实表单 input_schema。</div>
  </div>
</section>''')

# 3. 第一天
log = [
    ("00:49", "code", "Initial commit from Create Next App"),
    ("01:13", "code", "feat: 完整的生图 AI 前端应用 —— 瀑布流案例库、动态表单、自由创作、登录页、24 个案例"),
    ("08:32", "doc", "docs: 更新 README 并添加产品需求文档"),
    ("09:08", "code", "polish: 前端 UI 打磨 —— 苹果极简风格"),
    ("10:57", "doc", "docs: 添加 Agent 产品形态哲思文档"),
    ("12:54", "doc", "docs: 深挖 Agent 产品形态哲思 —— 护城河、Agent-First、平台经济"),
    ("13:19", "code", "feat: 案例采纳页加入「轻度补救」流程"),
    ("14:14", "doc", "docs: 新增技术平权、生意规模推演、API 化三阶段"),
]
log_html = "".join(
    f'<li class="{k}" style="--k:{i}"><time>{t}</time><span>{html.escape(m)}</span></li>' for i, (t, k, m) in enumerate(log))
slides.append(f'''
<section class="slide" data-chapter="02 / 第一天" data-title="5 月 21 日 00:49" data-minutes="2" data-notes="翻到这页，提交记录会一行行打出来，不用等它打完就可以讲。三个点：第一，凌晨 0 点 49 分建的空项目，1 点 13 分就有了一个完整的前端——24 分钟。第二，这一天黄色标出来的 4 行都是写文档，不是写代码：需求文档、Agent 产品形态的哲思、技术平权和生意规模推演。第三，所以我第一天最重要的产出不是网站，是想清楚这件事以后会变成什么样。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">02 / 第一天 · 真实的提交记录</span><span class="leaf">GIT LOG · 2026-05-21</span></div>
      <h2>5 月 21 日，<em>凌晨 0:49</em> 开工</h2>
      <p class="lead">第一天的提交记录原文。<span class="hl">黄色的 4 行是写文档</span>，不是写代码。</p>
    </header>
    <div class="body"><div class="d1-grid">
      <div class="term"><div class="pr-bar"><i></i><i></i><i></i><span>~/hely.fun — git log --reverse</span></div>
        <ol class="term-log">{log_html}</ol></div>
      <div class="d1-stats">
        <div><b>24</b><span>分钟</span><p>从空项目到一个完整前端</p></div>
        <div><b>4</b><span>份文档</span><p>需求、哲思、护城河、生意推演</p></div>
        <div class="ink"><b>10</b><span>次提交</span><p>第一天，一个人</p></div>
      </div>
    </div></div>
    <div class="page-foot v2-src"><span>出处</span>hely.fun 仓库 git log，2026 年 5 月 21 日全部提交（北京时间）。</div>
  </div>
</section>''')

# 4. 热力图
slides.append(f'''
<section class="slide" data-chapter="05 / 一个人" data-title="半年的热力图" data-minutes="2" data-notes="这是我半年每天的提交，一格一天，颜色越深那天提交越多。不用解释格子，直接指几个点：5 月 21 日开工，5 月 25 日上线那天提交了 23 次；7 月最密，一个月 133 次；9 月几乎是空的，整个月只有 1 次；10 月 7 日五联图开工，又密起来；10 月 28 日那天网站挂了，后面会讲。一句话：这就是一个人加 AI 的真实节奏，不是每天都在冲。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">05 / 一个人就是一支队伍 · 真实提交</span><span class="leaf">2026.05 — 2026.11</span></div>
      <h2>半年，<em>{total} 次提交</em>，{days} 天</h2>
      <p class="lead">一格是一天，颜色越深，那天改得越多。<b>不是每天都在冲。</b></p>
    </header>
    <div class="body"><div class="hm-wrap">
      <div class="hm-pins" style="--w:{weeks}">{pin_html}</div>
      <div class="hm" style="--w:{weeks}">{''.join(cells)}</div>
      <div class="hm-months" style="--w:{weeks}">{month_html}</div>
      <div class="hm-foot">
        <div class="hm-legend"><span>少</span><i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><span>多</span></div>
        <div class="hm-months-total">{''.join(f'<span><b>{month_totals.get(m,0)}</b>{m} 月</span>' for m in range(5,12))}</div>
      </div>
    </div></div>
    <div class="page-foot v2-src"><span>出处</span>hely.fun 仓库 git log 按天统计，截至 2026 年 11 月 18 日。</div>
  </div>
</section>''')

# 5. 10/28 对话回放
chat = [
    ("me", "08:49", "目前 cloudflare 我还没弄好，我刚试了登录，一直提示验证码过期了，目前感觉网站不正常"),
    ("ai", "08:50", "查清了：Supabase 因存储超额限制了项目服务。你的验证码其实校验通过了，是后面查账号返回 500，前端误显示成“验证码过期”。"),
    ("me", "09:09", "能不能先清理 Supabase 里面之前的一些用户存储，释放点？我注册 Cloudflare 填银行卡还需要时间"),
    ("me", "09:50", "等等，我填了泰国的 Visa 一直拒绝"),
    ("me", "09:57", "成功了，赶紧安全全部迁移"),
    ("me", "10:50", "不行吗，啥情况，快速解决"),
    ("ai", "10:50", "原因确认了：R2 正常，Supabase 因存储超额锁住了源文件。文件下载和数据库接口都返回 402，所以现在无法复制，手机登录也会失败。"),
    ("me", "11:19", "给我中英，我看不懂"),
    ("me", "11:33", "收到邮件了，你帮我写怎么回，就说非常严重，我的网站连登录都登不上"),
    ("me", "次日 13:34", "（数据库密码）不记得"),
    ("me", "13:45", "好了。"),
    ("ai", "13:45", "密码有效，原数据库直连成功，找到恢复办法了。"),
]
chat_html = "".join(
    f'<li class="{w}" style="--k:{i}"><time>{t}</time><p>{html.escape(m)}</p></li>' for i, (w, t, m) in enumerate(chat))
slides.append(f'''
<section class="slide" data-chapter="08 / 摔跤" data-title="10 月 28 日" data-minutes="3" data-notes="这是那天我和 Codex 的真实对话，一条条点出来，边点边讲。重点讲三处：第一条，页面说验证码过期，其实验证码是对的——报错信息会骗人；中间那条“泰国的 Visa 一直拒绝”，开个存储服务卡在信用卡上；“给我中英，我看不懂”——我英文不好，工单都是 AI 帮我写的。最后是第二天重置了数据库密码，直连原数据库把登录救了回来。右边三条是我从这一天带走的。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">08 / 摔过的跤 · 真实对话回放</span><span class="leaf">CODEX · 2026-10-28</span></div>
      <h2>10 月 28 日，<em>网站登不上了</em></h2>
      <p class="lead">那天我和 Codex 的<b>真实对话</b>（节选）。点一下，出一条。</p>
    </header>
    <div class="body"><div class="ch-grid2">
      <div class="chat" data-chat><div class="pr-bar"><i></i><i></i><i></i><span>Codex · hely.fun</span></div>
        <ol class="chat-log">{chat_html}</ol>
        <div class="chat-ctl"><button class="action" type="button" data-chat-next>下一条 →</button><button class="quiet" type="button" data-chat-all>全部显示</button><span class="chat-n"></span></div>
      </div>
      <div class="ch-lessons">
        <div><b>报错会骗人</b><p>页面说“验证码过期”，真正的原因是数据库被锁。</p></div>
        <div><b>免费额度是定时炸弹</b><p>用量起来的那天，就是它炸的那天。登录和存储放在一个篮子里，一起挂。</p></div>
        <div class="ink"><b>不会，就截图问</b><p>开 Cloudflare、写英文工单、找数据库密码，每一步都是截图问 AI“对吗”。</p></div>
      </div>
    </div></div>
    <div class="page-foot v2-src"><span>出处</span>2026 年 10 月 28–29 日 hely 项目 Codex 聊天记录原文节选（北京时间），已去掉密钥和项目编号。</div>
  </div>
</section>''')

head = (SCR / "head.html").read_text(encoding="utf-8").replace('<link rel="stylesheet" href="talk.css">', '<link rel="stylesheet" href="talk.css">\n<link rel="stylesheet" href="v2.css">')
tail = (SCR / "tail.html").read_text(encoding="utf-8").replace('<script src="talk.js"></script>', '<script src="v2.js"></script>')
(DECK / "preview.html").write_text(head + "\n".join(slides) + tail, encoding="utf-8")
print("ok", total, days, weeks)
