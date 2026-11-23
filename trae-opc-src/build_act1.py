# 第一幕「我是谁」样板：生成 trae-opc/act1.html
from pathlib import Path

HERE = Path(__file__).parent
DECK = Path("E:/碳基/_deploy/teaching/trae-opc")
T = HERE / "tpl"

slides = [(T / "cover.html").read_text(encoding="utf-8"), (T / "me.html").read_text(encoding="utf-8")]

# ---------- 1. 经历线 ----------
slides.append('''
<section class="slide" data-chapter="00 / 我是谁" data-title="先懂生意，再做 AI" data-minutes="1.5" data-notes="一句话带过四段：阿里 2017 年底到 2023 年，一线业务做到城市经理，全是对企业的生意；之后自己做了三年餐饮，又做了两年抖音本地生活服务商；2026 年，一个人加 AI。重点是最后一句：写代码，是今年才开始的事。后面三页分别展开阿里、餐饮和第一个网站。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">00 / 我是谁 · 经历</span><span class="leaf">2017 — 2026</span></div>
      <h2>先懂生意，<em>再做 AI</em></h2>
      <p class="lead">这些年一直在和老板、商家打交道。<b>写代码，是 2026 年才开始的事。</b></p>
    </header>
    <div class="body"><ol class="tl4">
      <li><figure class="tl-pic"><img src="img/a1/ali_badge.jpg" alt="阿里工牌" style="object-position:50% 78%"></figure>
        <time>2017 底 — 2023</time><h3>阿里巴巴 · 本地生活</h3>
        <p>东莞 → 广州总部<br>一线业务 → 主管 → 城市经理<br>天天跑商家，全是 ToB</p></li>
      <li><figure class="tl-pic tl-stack"><img src="img/a1/cy_debaoli_logo.jpg" alt=""><img src="img/a1/cy_fengpufang.jpg" alt=""><img src="img/a1/cy_debaoli_food.jpg" alt=""></figure>
        <time>3 年</time><h3>连锁餐饮创业</h3>
        <p>做连锁品牌、开店、管店<br>海报、门头、菜单自己盯</p></li>
      <li><figure class="tl-pic tl-ink"><b>2<small>年</small></b><span>抖音本地生活<br>服务商</span></figure>
        <time>2 年</time><h3>抖音本地生活服务商</h3>
        <p>继续服务本地商家<br>帮老板在抖音上做生意</p></li>
      <li class="now"><figure class="tl-pic"><img src="img/prod_hely.jpg" alt="" style="object-position:top"></figure>
        <time>2026</time><h3>一个人 + AI</h3>
        <p>掌相 ZXAI → hely.fun<br>CellMotion · B2W 工作室</p></li>
    </ol></div>
  </div>
</section>''')

# ---------- 2. 2019 杭州 ----------
slides.append('''
<section class="slide a1-dark" data-chapter="00 / 我是谁" data-title="2019 年 9 月 10 日，杭州" data-minutes="1.5" data-notes="这页讲一个故事。2019 年 9 月 10 日阿里 20 周年，我很幸运在杭州现场。那天马云卸任董事局主席，把接力棒交给张勇；蔡崇信在台上讲起阿里最早的创业。整场最打动我的，是烟花底下那一行字：让天下没有难做的生意。一家公司，被一句话带着走了 20 年。留个伏笔：最后我也会说出我自己的那一句话。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">00 / 我是谁 · 一个现场</span><span class="leaf">ALIBABA 20TH · HANGZHOU</span></div></header>
    <div class="body"><div class="hz">
      <div class="hz-text">
        <time>2019.09.10</time>
        <h2>那天，我在<em>杭州</em></h2>
        <p>阿里 20 周年年会，整座体育场坐满了阿里人。</p>
        <p>我在现场，看着<b>马云卸任董事局主席</b>，把接力棒交给张勇；<b>蔡崇信</b>在台上讲起阿里最早的那段创业。</p>
        <blockquote>让天下没有<br><span>难做的生意</span></blockquote>
        <p class="hz-take">那天我记住一件事：<br>一家公司，可以被<b>一句话</b>带着走 20 年。</p>
      </div>
      <div class="hz-wall">
        <figure class="h1"><img src="img/a1/ali_ma_wave.jpg" alt=""></figure>
        <figure class="h2"><img src="img/a1/ali_fireworks.jpg" alt=""><figcaption>烟花下的那行字</figcaption></figure>
        <figure class="h3"><img src="img/a1/ali_thanks.jpg" alt=""><figcaption>感谢</figcaption></figure>
        <figure class="h4"><img src="img/a1/ali_team.jpg" alt=""><figcaption>和同事在看台上</figcaption></figure>
        <figure class="h5"><img src="img/a1/ali_ma_bow.jpg" alt=""></figure>
      </div>
    </div></div>
  </div>
</section>''')

# ---------- 3. 阿里 → Agent ----------
rows = [
    ("拆", "城市目标，拆到每个人、每一天", "给 Agent 下指令：目标、步骤、什么算做完"),
    ("读", "一天跑几家商家，听懂老板真正要什么", "给企业做 Agent：先找到真问题，再动手"),
    ("协", "跨部门对齐：谁做什么、什么时候交", "多 Agent 架构：分工、交接、互相检查"),
    ("带", "从一线做到主管、城市经理", "把 Agent 当团队来带：给方向、给标准，不盯细节"),
]
row_html = "".join(
    f'<li><button type="button" class="fl-row" data-flip><b>{k}</b><span class="fl-a">{a}</span><i>→</i><span class="fl-b">{b}</span></button></li>'
    for k, a, b in rows)
slides.append(f'''
<section class="slide" data-chapter="00 / 我是谁" data-title="带团队的方法，拿来带 Agent" data-minutes="2" data-notes="这一页是我最想讲的经历。阿里给我的不是技术，是这四件事：拆、读、协、带。一行一行点开：左边是我在阿里天天干的事，右边是我现在每天怎么用 AI。拆任务和给 Agent 下指令是一样的；听懂商家和给企业做定制 Agent 是一样的；跨部门协同就是多 Agent 架构；带团队就是带 Agent。最后落一句：管团队和管 Agent，是同一件事。这也是后面“硅基领导力”的伏笔。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">00 / 我是谁 · 阿里给我的</span><span class="leaf">TEAM → AGENTS</span></div>
      <h2>带团队的方法，<em>拿来带 Agent</em></h2>
      <p class="lead">在阿里学会的四件事，换个对象，全用上了。<b>点一行，翻一行。</b></p>
    </header>
    <div class="body"><div class="fl">
      <div class="fl-head"><span></span><span>在阿里，管人</span><span></span><span>现在，管 Agent</span></div>
      <ol class="fl-list">{row_html}</ol>
      <div class="fl-foot"><p>管团队和管 Agent，<span class="hl">是同一件事。</span></p><button type="button" class="quiet" data-flip-all>全部翻开</button></div>
    </div></div>
  </div>
</section>''')

# ---------- 4. 三年餐饮 ----------
slides.append('''
<section class="slide" data-chapter="00 / 我是谁" data-title="三年餐饮" data-minutes="1.5" data-notes="三年餐饮创业，做过连锁品牌、开过店、管过店，海报和门头都是自己盯。这段经历让我知道一个餐饮老板缺什么：没有美工、没有时间、更不会写提示词。所以 hely 第一批想服务的，就是餐饮老板。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">00 / 我是谁 · 三年餐饮</span><span class="leaf">BRANDS · STORES · DESIGN</span></div>
      <h2>三年餐饮：<em>开店、做品牌、自己盯设计</em></h2>
    </header>
    <div class="body"><div class="cy">
      <div class="cy-wall">
        <figure class="c1"><img src="img/a1/cy_debaoli_food.jpg" alt=""><figcaption>德寶力茶餐廳</figcaption></figure>
        <figure class="c2"><img src="img/a1/cy_debaoli_store.jpg" alt=""><figcaption>门店</figcaption></figure>
        <figure class="c3"><img src="img/a1/cy_fengpufang.jpg" alt=""><figcaption>丰埔坊 · 澄海狮头鹅</figcaption></figure>
        <figure class="c4"><img src="img/a1/cy_wildbird.jpg" alt=""><figcaption>飞集咖 Wild bird coffee</figcaption></figure>
        <figure class="c5"><img src="img/a1/cy_wildbird_store.jpg" alt=""><figcaption>门店</figcaption></figure>
        <figure class="c6"><img src="img/a1/cy_shantaizong.jpg" alt=""><figcaption>膳太宗</figcaption></figure>
      </div>
      <div class="cy-side">
        <p class="cy-k">一个餐饮老板缺什么？</p>
        <ul><li><b>没有美工</b>，海报门头靠外包</li><li><b>没有时间</b>，天天在店里</li><li><b>不会写提示词</b>，也不想学</li></ul>
        <p class="cy-to">所以 hely 第一批想服务的，<br>就是<span class="hl">餐饮老板</span>。</p>
      </div>
    </div></div>
  </div>
</section>''')

# ---------- 5. 比赛 ----------
slides.append('''
<section class="slide" data-chapter="00 / 我是谁" data-title="比赛" data-minutes="1" data-notes="快速过，三张卡的视频会自己播；想放连盈有声全片就点中间那张。比赛是检验作品最快的地方：两次黑客松 Agent 赛道第一，其中一次是 CardBot，给外贸团队做的 AI 客户开发系统；企客松视频创作第一，是给连盈做的苹果发布会式宣传片；还有 OPC 动漫潮玩 AI 黑客松的创意奖，作品是 Sea Space。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">00 / 我是谁 · 比赛</span><span class="leaf">HACKATHONS</span></div>
      <h2>比赛，<em>是检验作品最快的地方</em></h2>
    </header>
    <div class="body"><div class="aw">
      <article class="gold" data-full="media/ah_cardbot-web.mp4"><div class="aw-vis"><video src="media/ah_cardbot-web.mp4" muted loop playsinline preload="metadata" data-autoplay poster="img/a1/ah_cardbot-cover.jpg"></video><span class="aw-play">▶ 全屏播放</span></div>
        <span class="aw-tag">第一名 × 2</span><h3>黑客松 · Agent 赛道</h3><p><b>CardBot</b>：给外贸团队的 AI 客户开发系统。找客户、查历史、写邮件、人工审批，一条线串起来。</p></article>
      <article class="gold" data-full="media/lianying_full.mp4"><div class="aw-vis"><video src="media/lianying_card.mp4" muted loop playsinline preload="metadata" data-autoplay poster="img/a1/lianying_poster.jpg"></video><span class="aw-play">▶ 有声全片 2:53</span></div>
        <span class="aw-tag">第一名</span><h3>企客松 · 视频创作</h3><p><b>连盈 LY-600 发布会片</b>：近 3 分钟、中英双语、苹果发布会式宣传片。文案、配音、镜头、动效都走 AI 工作流。</p></article>
      <article data-full="media/ah_sea-space-preview.mp4"><div class="aw-vis aw-duo"><img src="img/a1/hk_award.jpg" alt=""><video src="media/ah_sea-space-preview.mp4" muted loop playsinline preload="metadata" data-autoplay poster="img/a1/hk_seaspace_site.jpg"></video><span class="aw-play">▶ 全屏播放</span></div>
        <span class="aw-tag">创意奖</span><h3>OPC 动漫潮玩 AI 黑客松</h3><p><b>Sea Space</b>：给出海团队的内容增长工作台。找趋势、选题、多平台生产、复盘一条龙。</p></article>
    </div></div>
  </div>
</section>''')

# ---------- 6. 掌相 ZXAI ----------
steps = [
    ("一个想法", "拍下自己的手掌，看今年的运势"),
    ("接 API", "读手掌照片，生成分析报告"),
    ("买域名", "zxai.store"),
    ("上服务器", "阿里云，第一次自己部署"),
    ("海外支付", "支付宝 + Waffo，按国家换币种"),
    ("六国语言", "简 · 繁 · 英 · 日 · 韩 · 泰"),
]
step_html = "".join(f'<li style="--k:{i}"><em>{i+1:02d}</em><b>{a}</b><span>{b}</span></li>' for i, (a, b) in enumerate(steps))
slides.append(f'''
<section class="slide" data-chapter="00 / 我是谁" data-title="第一个真网站" data-minutes="2" data-notes="这是 hely 之前的事，2026 年四五月份。OpenClaw 刚火过一阵，那时候的模型没有现在聪明，工具也难用。我一个人，从一个想法开始：拍手掌看运势。然后接 API、买域名、上阿里云、打通海外支付、做了六国语言。左边是当时的演示：切到韩语、上传手掌、出报告、选国家付款——泰国用户看到的是 1.46 美元。这个网站后来太耗服务器，我把它下线了。但它对我意义非凡：那时候我知道，我可以去创作我想要的东西了。翻页，后来才有了 hely。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">00 / 我是谁 · 第一个真网站</span><span class="leaf">ZXAI.STORE · 2026.04–05</span></div>
      <h2>2026 年四五月，<em>第一个真网站</em></h2>
      <p class="lead">OpenClaw 刚火过一阵，模型还没现在聪明，工具也难用。<b>一个人，从一个想法到能收钱。</b></p>
    </header>
    <div class="body"><div class="zx">
      <div class="zx-screen"><div class="pr-bar"><i></i><i></i><i></i><span>zxai.store · 掌相运势</span></div>
        <video src="media/zxai.mp4" muted loop playsinline preload="auto" data-autoplay poster="img/a1/zxai_poster.jpg"></video>
        <div class="zx-price"><span>中国 <b>¥3.8</b></span><span>泰国 <b>$1.46 ≈ ฿48</b></span></div>
      </div>
      <div class="zx-side">
        <ol class="zx-steps">{step_html}</ol>
        <p class="zx-quote">“那时候我知道：<br>我可以去创作<span class="hl">我想要的东西</span>了。”</p>
        <p class="zx-next">后来它太耗服务器，我把它下线了。再后来，才有了 <b>hely.fun</b> →</p>
      </div>
    </div></div>
  </div>
</section>''')

# ---------- 7. 你可以是一名……（移植珠江「不设限」页，插在掌相之前） ----------
roles = ["设计师", "工程师", "产品经理", "导演", "动效设计师", "剪辑师", "音乐制作人", "讲师", "创业者"]
rows = [
    ("设计师", "hely.fun：不用写提示词的 AI 设计平台，1689 个案例，已收费"),
    ("工程师", "买域名、上服务器、接海外支付，网站都自己部署上线"),
    ("导演", "连盈科技发布会片，企客松视频创作第一"),
    ("动效设计师", "cellmotion.cn；Back 2 Work 工作室 35 支作品"),
    ("音乐制作人", "H.O.T.L.：一支虚构的乐队，发真的歌"),
    ("讲师", "高校讲座、社区课、工作坊、黑客松现场带练 ↓"),
]
pics = [
    ("talk1.jpg", "珠江职业技术学院 · 讲座"),
    ("talk2.jpg", "Agent 线下课程 · 讲师"),
    ("talk3.jpg", "作品分享 · Today on Earth"),
    ("talk4.jpg", "博物馆 AI 创作大赛 · 指导"),
    ("talk5.jpg", "一对一带练"),
]
chip_html = "".join(f"<span>{r}</span>" for r in roles)
row_html = "".join(f'<div class="bc-row" style="--k:{i}"><b>{a}</b><span>{b}</span></div>' for i, (a, b) in enumerate(rows))
pic_html = "".join(f'<figure style="--k:{i}"><img src="img/a1/{f}" alt="" loading="lazy"><figcaption>{c}</figcaption></figure>' for i, (f, c) in enumerate(pics))
slides.insert(len(slides) - 1, f'''
<section class="slide" data-chapter="00 / 我是谁" data-title="你可以是一名……" data-minutes="1.5" data-notes="左边的词会自动轮换，不用管它。我不是科班，也不是程序员出身：阿里做销售和管理，开过餐馆，做过抖音服务商。这一年用 AI 当过右边这些角色——设计师、工程师、导演、动效、音乐，还有讲师，底下是这一年在各地分享和带练的现场。重点不是我多厉害：两年前做这些，要一个设计团队、一个开发团队、一个视频团队；现在是一个人加一群 AI。问大家：你想成为哪一种？其实不用选，可以同时是好几种。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">00 / 我是谁 · 不设限</span><span class="leaf">ONE PERSON + AI</span></div></header>
    <div class="body"><div class="bc">
      <div class="bc-top">
        <div class="bc-left" data-becoming>
          <p class="bc-pre">你可以是一名</p>
          <p class="bc-word" data-role="word"><span>设计师</span></p>
          <p class="bc-post">也可以，<span class="hl">同时是好几种人。</span></p>
          <div class="bc-chips" data-role="chips">{chip_html}</div>
        </div>
        <div class="bc-right">
          <p class="bc-was"><b>我自己：不是科班，也不是程序员出身。</b>这一年，用 AI 当过——</p>
          {row_html}
        </div>
      </div>
      <div class="bc-pics">{pic_html}</div>
    </div></div>
    <p class="footnote"><b>不是我多厉害</b>两年前，这些事要一个设计团队、一个开发团队、一个视频团队；现在是一个人，加一群 AI。</p>
  </div>
</section>''')

head = (T / "head.html").read_text(encoding="utf-8").replace(
    '<link rel="stylesheet" href="talk.css">',
    '<link rel="stylesheet" href="talk.css">\n<link rel="stylesheet" href="v2.css">\n<link rel="stylesheet" href="a1.css">')
tail = (T / "tail.html").read_text(encoding="utf-8").replace(
    '<script src="talk.js"></script>', '<script src="v2.js"></script>\n<script src="a1.js"></script>')
(DECK / "act1.html").write_text(head + "\n".join(slides) + tail, encoding="utf-8")
print("ok", len(slides))
