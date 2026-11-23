# 合成完整课件：封面 + 第一幕 + 第二幕（hely）+ 第三、四幕 → trae-opc/index.html
# 依赖：先跑 build_preview.py、build_act1.py、build_act34.py
import html, io, json, re
from pathlib import Path

HERE = Path(__file__).parent
DECK = Path("E:/碳基/_deploy/teaching/trae-opc")
T = HERE / "tpl"
esc = html.escape
ROUTE = ["我是谁", "hely 怎么做出来", "把自己做成资产", "硅基领导力"]

def sections(path):
    return re.findall(r'<section class="slide.*?</section>', io.open(path, encoding="utf-8").read(), re.S)

def rechapter(sec, chapter, kicker_from=None, kicker_to=None, minutes=None):
    sec = re.sub(r'data-chapter="[^"]*"', f'data-chapter="{chapter}"', sec, count=1)
    if minutes is not None:
        sec = re.sub(r'data-minutes="[^"]*"', f'data-minutes="{minutes}"', sec, count=1)
    if kicker_from:
        sec = sec.replace(kicker_from, kicker_to)
    return sec

act1 = sections(DECK / "act1.html")          # 0 封面 1 我是谁 2-7 第一幕
act34 = sections(DECK / "act34.html")
pv = sections(DECK / "preview.html")         # 0 我是谁 1 章节 2 提示词 3 第一天 4 热力图 5 10/28
old = sections(T / "index_codex_v1.html")    # 16 演示路线 22 五联图

C2 = "02 / hely"
A2 = []

# ---- 章节 ----
route = "".join(f'<li class="{"on" if i == 1 else ""}">{r}</li>' for i, r in enumerate(ROUTE))
A2.append(f'''
<section class="slide v2-chapter" data-chapter="{C2}" data-title="章节：hely 怎么做出来" data-minutes="0.3" data-notes="章节页。接着上一页：掌相之后，才有了 hely。这一章讲一个不写代码的人，怎么一个人把一个 AI 产品做出来、上线、收钱。">
  <div class="frame"><div class="v2c">
    <div class="v2c-num">02</div>
    <div class="v2c-main"><span class="v2c-tag">hely.fun 怎么做出来</span><h2>提示词，<em>是反人类的</em></h2><p class="v2c-q">这一章回答：一个开餐馆的老板，为什么做不出一张好图？我又是怎么一个人把答案做成产品的？</p></div>
    <ol class="v2c-route">{route}</ol>
  </div></div>
</section>''')

# ---- 放片 ----
A2.append(f'''
<section class="slide a1-dark" data-chapter="{C2}" data-title="先看 26 秒" data-minutes="0.6" data-notes="先看 26 秒成片，认识一下 hely.fun。点画面右下角可以带声音全屏放。放完不用解释，直接翻页讲为什么做它。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">02 / hely · 先看成片</span><span class="leaf">HELY.FUN · 0:26</span></div>
      <h2>先看 26 秒，<em>认识一下 hely.fun</em></h2></header>
    <div class="body"><div class="film26">
      <video src="media/hely-opening.mp4" poster="media/hely-poster.jpg" muted loop playsinline preload="auto" data-autoplay></video>
      <button type="button" class="hotl-sound" data-full="media/hely-opening.mp4">▶ 有声全屏 0:26</button>
    </div></div>
  </div>
</section>''')

# ---- 提示词 3170 ----
A2.append(rechapter(pv[2], C2, "01 / 起点 · 一条真实的提示词", "02 / hely · 一条真实的提示词", 1.5))

# ---- 选 → 填 → 生成 ----
case = json.loads((HERE / "capture/case_dish.json").read_text(encoding="utf-8"))
fields = "".join(f'<li><span>{esc(f["label"])}</span><em>{"必填" if f["required"] else "选填"}</em><i></i></li>' for f in case["input_schema"])
A2.append(f'''
<section class="slide" data-chapter="{C2}" data-title="选 → 填 → 生成" data-minutes="1" data-notes="hely 的回答：老板不用学提示词。左边是做一张图的常见走法，七步，每一步都劝退。hely 收成三步：在 1689 个案例里选一张喜欢的；填 5 个格子，同一张菜品图，就是这 5 个；点生成，出图。提示词还在，只是藏到了后面。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">02 / hely · 我的回答</span><span class="leaf">7 STEPS → 3 STEPS</span></div>
      <h2>七步收成三步：<em>选 → 填 → 生成</em></h2>
      <p class="lead">提示词还在，<b>只是藏到了后面。</b></p>
    </header>
    <div class="body">
      <ol class="seven"><li>找参考图</li><li>学提示词</li><li>写英文</li><li>调参数</li><li>反复抽卡</li><li>修图</li><li>导出</li></ol>
      <div class="sfg">
        <figure class="sfg-a"><em>01 选</em><div class="sfg-vis"><img src="img/shot_plaza.jpg" alt="" style="object-position:top"></div><figcaption>1689 个案例里，挑一张喜欢的</figcaption></figure>
        <i class="sfg-arr">→</i>
        <figure class="sfg-b"><em>02 填</em><div class="sfg-vis sfg-form"><b>同一张菜品图，只要填：</b><ol>{fields}</ol></div><figcaption>5 个格子，不用写一个英文</figcaption></figure>
        <i class="sfg-arr">→</i>
        <figure class="sfg-c"><em>03 生成</em><div class="sfg-vis"><img src="img/case_dish.jpg" alt=""><div class="gen-pill"><img src="img/gen_orb_s.png" alt=""><span><b>作品生成中</b><small>已创作 5 秒 · 23%</small></span></div></div><figcaption>点一下，等它画完</figcaption></figure>
      </div>
    </div>
  </div>
</section>''')

# ---- 第一天 ----
A2.append(rechapter(pv[3], C2, "02 / 第一天", "02 / hely · 第一天", 1))

# ---- Skill ----
skill_lines = [
    ("---", "m"), ("name: hely-case-form-schema", "m"), ("---", "m"),
    ("# Hely Case Form Schema v3", "h"),
    ("## Hard Rules", "h2"),
    ("- Do not ask users to write prompts.", "k"),
    ("- Keep form fields minimal, usually 3-6.", "k2"),
    ("- Required fields must be truly required.", "t"),
    ("- Do not template every product as only 产品图 + 补充选填 ...", "t"),
    ("## Prompt Slot Logic", "h2"),
    ("- preserve: style, lighting, composition ...", "t"),
    ("- replace: original person, product, brand ...", "t"),
    ("- lock: user face, product appearance ...", "t"),
]
sk = "".join(f'<p class="{c}">{esc(t)}</p>' for t, c in skill_lines)
A2.append(f'''
<section class="slide" data-chapter="{C2}" data-title="把做法写成 Skill" data-minutes="1.5" data-notes="1689 个案例不是我一张张手工做的。我把“怎么把一张图拆成表单”这件事写成了 Skill，让 AI 照着做。左边是真实的 Skill 文件，第一条硬规矩就是：不许让用户写提示词；第二条：表单只留 3 到 6 个格子。右边是 Skill 文件夹里还有什么：考试题、错题本、质量记录。比如错题本里写着：不要把看到的每个物体都当成标签。最后一个细节：6 月 8 日我写了 8 个 Skill，三天后合并成了 1 个——拆得太细反而难用，Skill 也要迭代。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">02 / hely · 把做法写成 Skill</span><span class="leaf">COMMIT c0d4982 · 2026-06-08</span></div>
      <h2>把做法写成 Skill，<em>让 AI 照着做</em></h2>
    </header>
    <div class="body"><div class="skl">
      <div class="doc"><div class="pr-bar"><i></i><i></i><i></i><span>.agents/skills/hely-case-form-schema/SKILL.md</span></div><div class="doc-body">{sk}</div></div>
      <div class="skl-side">
        <p class="skl-k">一个 Skill 文件夹里，还有：</p>
        <ul class="skl-tree">
          <li><b>SKILL.md</b><span>做法和硬规矩</span></li>
          <li><b>evals/</b><span>考试题：给几张图，看它拆得对不对</span></li>
          <li><b>failures/anti-patterns.md</b><span>错题本：<q>不要把看到的每个物体都当标签</q></span></li>
          <li><b>reports/quality-notes.md</b><span>质量记录</span></li>
        </ul>
        <div class="skl-81"><div><b>8</b><span>6 月 8 日<br>写了 8 个 Skill</span></div><i>→</i><div><b>1</b><span>6 月 11 日<br>合并成 hely-case-harness</span></div></div>
        <p class="skl-take">拆得太细反而难用，<span class="hl">Skill 也要迭代。</span></p>
      </div>
    </div></div>
    <div class="page-foot v2-src"><span>出处</span>hely 仓库提交 c0d4982（6/8）、34fa20f（6/11）中的真实文件，节选。</div>
  </div>
</section>''')

# ---- 热力图 ----
A2.append(rechapter(pv[4], C2, "05 / 一个人", "02 / hely · 一个人", 1))

# ---- 一个请求经过几个模型 ----
flow = [("你说一句", "“帮我做张中秋海报”", "u"), ("DeepSeek", "听懂需求、找案例、自动填表", ""),
        ("gpt-image-2", "画图、改图", "mf-hot"), ("视觉模型", "检查画出来的图对不对", ""), ("纯程序", "放大、抠图、切成五张", "")]
fl = "".join(f'<li class="{c}" style="--k:{i}"><b>{a}</b><span>{b}</span></li>' for i, (a, b, c) in enumerate(flow))
A2.append(f'''
<section class="slide" data-chapter="{C2}" data-title="每个模型只管一块" data-minutes="1" data-notes="一句“帮我做张中秋海报”，后面经过好几个模型：便宜的 DeepSeek 负责听懂和填表；最贵的画图模型只负责画；视觉模型负责检查；放大、抠图、切图这些，用纯程序就够了。贵的模型只用在刀刃上——这也是一个人能把成本控制住的原因。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">02 / hely · 一个请求的旅程</span><span class="leaf">MODEL ROUTING</span></div>
      <h2>每个模型只管一块，<em>贵的只用在刀刃上</em></h2>
    </header>
    <div class="body"><ol class="mflow">{fl}</ol>
      <p class="mflow-foot">另外：GPT-4.1 从图反推提示词 · BiRefNet 在本地抠图，保留原像素</p></div>
  </div>
</section>''')

# ---- 体验里的心思 ----
zoo = "".join(f'<img src="img/animals/a{i:02d}.jpg" alt="">' for i in range(1, 61))
A2.append(f'''
<section class="slide" data-chapter="{C2}" data-title="体验里的心思" data-minutes="1.5" data-notes="体验上的四个小心思，演示的时候大家会看到。一，生成的时候不是一直转圈：弹窗里是流动的渐变，写着已创作几秒、百分之几；进度是假的，前面快、后面慢，最多走到 96%，真完成才跳到 100%。收起来就变成底部这个浮球，等图的时候还能接着逛。二，60 只小动物头像，登录后选一只，就有了自己的头像——给用户一点情绪价值。三，登录页：手机号或 Google，一屏搞定。四，充值：生成前就告诉你这次要扣多少积分。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">02 / hely · 体验里的心思</span><span class="leaf">UX DETAILS</span></div>
      <h2>看不见的地方，<em>才见心思</em></h2>
    </header>
    <div class="body"><div class="ux4">
      <figure class="ux-a"><div class="ux-vis ux-gen"><img class="ux-modal" src="img/gen_modal.png" alt="生成中的弹窗"><div class="ux-ball"><img src="img/gen_orb.png" alt="浮球"><span>收起后变成浮球<br>等图时还能接着逛</span></div></div>
        <figcaption><b>生成中</b>流动渐变 + “已创作 5 秒 · 23%”；进度前面快、后面慢，最多到 96%，真完成才到 100%</figcaption></figure>
      <figure class="ux-b"><div class="ux-vis ux-zoo"><div class="zoo-track">{zoo}{zoo}</div></div>
        <figcaption><b>60 只小动物</b>登录后选一只，就有了自己的头像</figcaption></figure>
      <figure class="ux-c"><div class="ux-vis"><img src="img/shot_login.jpg" alt=""></div>
        <figcaption><b>登录页</b>手机号或 Google，一屏搞定</figcaption></figure>
      <figure class="ux-d"><div class="ux-vis"><img src="img/shot_recharge.jpg" alt=""></div>
        <figcaption><b>充值</b>生成前就告诉你这次扣多少积分</figcaption></figure>
    </div></div>
  </div>
</section>''')

# ---- 现场演示（旧页）----
demo = rechapter(old[16], C2, minutes=3)
demo = re.sub(r'<span class="kicker">[^<]*</span>', '<span class="kicker">02 / hely · 现场演示</span>', demo, count=1)
demo = re.sub(r'<span class="leaf">[^<]*</span>', '<span class="leaf">LIVE DEMO · HELY.FUN</span>', demo, count=1)
A2.append(demo)

# ---- 五联图（旧页）----
five = rechapter(old[22], C2, minutes=1.5)
five = re.sub(r'<span class="kicker">[^<]*</span>', '<span class="kicker">02 / hely · 五联图：真需求推动的迭代</span>', five, count=1)
five = re.sub(r'<span class="leaf">[^<]*</span>', '<span class="leaf">FIVE-PANEL · V4 → V7</span>', five, count=1)
A2.append(five)

# ---- 10/28 ----
A2.append(rechapter(pv[5], C2, "08 / 摔过的跤 · 真实对话回放", "02 / hely · 摔过的跤", 1.5))

# ---- 第一幕 / 三四幕章节号统一 ----
A1 = [rechapter(s, "01 / 我是谁") for s in act1[2:]]
A1 = [s.replace('<span class="kicker">00 / 我是谁', '<span class="kicker">01 / 我是谁') for s in A1]
cover = act1[0]
me = act1[1].replace('data-chapter="00 / 开场"', 'data-chapter="01 / 我是谁"').replace('<span class="kicker">00 / 先认识一下</span>', '<span class="kicker">01 / 我是谁 · 先认识一下</span>')

# 第四幕压时间
A34 = []
for s in act34:
    if 'data-title="十二句话"' in s:
        s = re.sub(r'data-minutes="[^"]*"', 'data-minutes="1.5"', s, count=1)
    if 'data-title="判断力 品味 信念 勇气 远见"' in s:
        s = re.sub(r'data-minutes="[^"]*"', 'data-minutes="2"', s, count=1)
    A34.append(s)

ALL = [cover, me] + A1 + A2 + A34
mins = sum(float(m) for s in ALL for m in re.findall(r'data-minutes="([\d.]+)"', s)[:1])

head = (T / "head.html").read_text(encoding="utf-8").replace(
    '<link rel="stylesheet" href="talk.css">',
    '<link rel="stylesheet" href="talk.css">\n<link rel="stylesheet" href="v2.css">\n<link rel="stylesheet" href="a1.css">\n<link rel="stylesheet" href="a34.css">\n<link rel="stylesheet" href="a2.css">')
tail = (T / "tail.html").read_text(encoding="utf-8").replace(
    '<script src="talk.js"></script>', '<script src="talk2.js"></script>\n<script src="v2.js"></script>\n<script src="a1.js"></script>\n<script src="a34.js"></script>')
(DECK / "index.html").write_text(head + "\n".join(ALL) + tail, encoding="utf-8")
print("ok slides", len(ALL), "minutes", round(mins, 1), "| act1", 2 + len(A1), "act2", len(A2), "act34", len(A34))
