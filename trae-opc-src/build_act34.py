# 第三幕「把自己做成资产」+ 第四幕「硅基领导力」样板：生成 trae-opc/act34.html
import html, io, json, re
from pathlib import Path

HERE = Path(__file__).parent
DECK = Path("E:/碳基/_deploy/teaching/trae-opc")
T = HERE / "tpl"
esc = html.escape
S = []
ROUTE = ["我是谁", "hely 怎么做出来", "把自己做成资产", "硅基领导力"]

def chapter(num, tag, title, q, on, notes):
    route = "".join(f'<li class="{"on" if i == on else ""}">{r}</li>' for i, r in enumerate(ROUTE))
    return f'''
<section class="slide v2-chapter" data-chapter="{num} / {tag}" data-title="章节：{tag}" data-minutes="0.5" data-notes="{notes}">
  <div class="frame"><div class="v2c">
    <div class="v2c-num">{num}</div>
    <div class="v2c-main"><span class="v2c-tag">{tag}</span><h2>{title}</h2><p class="v2c-q">{q}</p></div>
    <ol class="v2c-route">{route}</ol>
  </div></div>
</section>'''

def tile(cls, media, name, sub, full="", href=""):
    data = f' data-full="{full}"' if full else ""
    cap = f'<figcaption><b>{name}</b><span>{sub}</span></figcaption>'
    if href:
        return f'<a class="as-tile as-link {cls}" href="{href}" target="_blank" rel="noopener">{media}{cap}<i class="as-go">↗</i></a>'
    return f'<figure class="as-tile {cls}"{data}>{media}{cap}</figure>'

def vid(src, poster=""):
    p = f' poster="{poster}"' if poster else ""
    return f'<video src="{src}" muted loop playsinline preload="metadata" data-autoplay{p}></video>'

# =====================================================================
# 第三幕
# =====================================================================
S.append(chapter("03", "把自己做成资产", "AI 让做东西变便宜，<br><em>攒下来的才值钱</em>",
                 "这一章回答：做过的东西，怎么变成你的资产？", 2,
                 "章节页，停两秒。前面讲的是怎么做一个产品；这一章讲一个观念：每做一件事，都往柜子里放一件。"))

# ---- 五类资产总览 ----
kinds = [
    ("作品", "WORKS", "网站 · Demo · 设计 · 研究", "img/prod_coverflow.jpg", "做过的网站、组件、实验、研究"),
    ("产品", "PRODUCTS", "在线上跑、能收钱", "img/prod_hely.jpg", "hely · CardBot · Sea Space · 掌相 · 多平台发布"),
    ("IP 画作", "ILLUSTRATION", "MutedMEN", "img/mm/" + json.load(open(DECK / "img/mm/index.json", encoding="utf-8"))[6]["key"] + "_s.jpg", "#001–#096，74 张定稿"),
    ("音乐", "MUSIC", "H.O.T.L. Human on the Loop", "media/b2w/hotl.jpg", "一支虚构的乐队，发真的歌"),
    ("视频", "FILMS", "Back 2 Work Studio", "media/b2w/lianying.jpg", "35 支：品牌片 · 动效 · AI 短片"),
]
kh = "".join(
    f'<li style="--k:{i}"><figure><img src="{img}" alt=""></figure><em>{i+1:02d} · {en}</em><h3>{zh}</h3><b>{t}</b><p>{d}</p></li>'
    for i, (zh, en, t, img, d) in enumerate(kinds))
S.append(f'''
<section class="slide" data-chapter="03 / 资产" data-title="五类资产" data-minutes="1.5" data-notes="先给框架：我把自己做的东西分成五类。作品是平时做的网站、Demo、设计和研究；产品是真在线上跑、能收钱的；IP 画作是 MutedMEN；音乐是 H.O.T.L.；视频是 Back 2 Work 工作室。后面五页一类一页，快速过。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">03 / 把自己做成资产</span><span class="leaf">5 KINDS OF ASSETS</span></div>
      <h2>我的柜子里，<em>放着五类东西</em></h2>
      <p class="lead">一个人 + AI，做东西越来越快。<b>真正拉开差距的，是做完之后有没有留下来。</b></p>
    </header>
    <div class="body"><ol class="as5">{kh}</ol></div>
  </div>
</section>''')

# ---- 作品 ----
works = "".join([
    tile("w-big", vid("media/universe-hero.mp4"), "个人网站", "作品 · 产品 · Skills 的总入口", href="https://personal-universe-taupe.vercel.app/"),
    tile("", vid("media/ah_todayonearth-web.mp4", "img/a1/ah_todayonearth.png"), "Today on Earth", "每天六个国家 + 空间站的实时影像", href="https://personal-universe-taupe.vercel.app/today-on-earth"),
    tile("", vid("media/ah_cellmotion-web.mp4"), "CellMotion", "可编辑动效站 · 514 次提交 · 33 ★", href="https://cellmotion.cn"),
    tile("", '<img src="img/prod_coverflow.jpg" alt="">', "Glass Cover Flow", "开源 React 组件 · 79 ★", href="https://github.com/opc8838-hub/cover-flow-showcase"),
    tile("", vid("media/qi.mp4", "media/qi.jpg"), "契 · 甲骨文交互", "1265 个已释读字 + 3000 个未释读字", "media/qi.mp4"),
    tile("", vid("media/b2w/your-present.prev.mp4", "media/b2w/your-present.jpg"), "your present 衣架", "AI 视频倒放做的衣服转身", href="https://opc8838-hub.github.io/clothes/"),
    tile("", vid("media/b2w/keynote-talk.prev.mp4", "media/b2w/keynote-talk.jpg"), "keynote 制作手记", "连盈片的工作流，做成一个网站", href="https://opc8838-hub.github.io/keynote/"),
])
S.append(f'''
<section class="slide" data-chapter="03 / 资产" data-title="作品" data-minutes="1.5" data-notes="作品：平时做的网站、Demo、设计和研究。不一定赚钱，但每一个都是能力的证据。个人网站是总入口；Today on Earth 每天自动生成一条地球影像；CellMotion 是动效站；Glass Cover Flow 开源后拿了 79 颗星；契是甲骨文交互，点一下可以放演示片；衣架是我自己服装品牌的作品集。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">03 / 资产 · 01 作品</span><span class="leaf">WORKS</span></div>
      <h2>作品：<em>能力的证据</em></h2>
    </header>
    <div class="body"><div class="as-works">{works}</div></div>
    <div class="page-foot v2-src"><span>链接</span>personal-universe-taupe.vercel.app · cellmotion.cn · github.com/opc8838-hub</div>
  </div>
</section>''')

# ---- 产品 ----
prods = "".join([
    tile("p-big", vid("media/ah_hely-fun-preview.mp4", "img/prod_hely.jpg"), "hely.fun", "AI 生图站：1689 个案例，选、填、出图 · 已收费", "media/ah_hely-fun-preview.mp4"),
    tile("", vid("media/ah_cardbot-web.mp4", "img/a1/ah_cardbot-cover.jpg"), "CardBot", "外贸 AI 客户开发 · 黑客松冠军", "media/ah_cardbot-web.mp4"),
    tile("", vid("media/ah_sea-space-preview.mp4", "img/a1/hk_seaspace_site.jpg"), "Sea Space", "出海内容增长工作台", "media/ah_sea-space-preview.mp4"),
    tile("", vid("media/ah_multiplatform-web.mp4"), "多平台发布助手", "一条视频 → 字幕、封面、多平台适配", "media/ah_multiplatform-web.mp4"),
    tile("", vid("media/ah_palm-web.mp4", "img/a1/zxai_poster.jpg"), "掌相 ZXAI", "六国语言 + 海外支付 · 已下线", "media/zxai.mp4"),
])
S.append(f'''
<section class="slide" data-chapter="03 / 资产" data-title="产品" data-minutes="1.5" data-notes="产品和作品的区别：产品是真在线上跑的，有用户、有登录、有支付。hely 是主力；CardBot 和 Sea Space 是比赛里长出来的；多平台发布助手是给内容创作者的工作台；掌相是第一个，已经下线，但它留下了整套部署和支付的经验。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">03 / 资产 · 02 产品</span><span class="leaf">PRODUCTS</span></div>
      <h2>产品：<em>能跑的证据</em></h2>
    </header>
    <div class="body"><div class="as-prods">{prods}</div></div>
  </div>
</section>''')

# ---- IP 画作 MutedMEN ----
mm = json.load(open(DECK / "img/mm/index.json", encoding="utf-8"))
cols = [mm[i::6] for i in range(6)]
col_html = ""
for ci, col in enumerate(cols):
    imgs = "".join(f'<img src="img/mm/{m["key"]}_s.jpg" data-big="img/mm/{m["key"]}.jpg" alt="#{m["no"]}" title="#{m["no"]} {esc(m["name"])}">' for m in col)
    col_html += f'<div class="mm-col {"up" if ci % 2 == 0 else "down"}" style="--d:{38 + ci * 5}s"><div class="mm-track">{imgs}{imgs}</div></div>'
S.append(f'''
<section class="slide mm-slide" data-chapter="03 / 资产" data-title="IP 画作 MutedMEN" data-minutes="2" data-notes="MutedMEN 是我的原创视觉 IP，一本关于现代生活情绪的视觉日记：在喧嚣的世界里，记录安静的情绪。它不是一个固定的角色，而是一种审美、一种情绪；内核是平静、从容，温柔而坚定。从 #001 画到 #096，日更过 X、Instagram 和小红书。墙上随便点一张可以放大。右下角可以放盆栽园 DJ 的 MV——这是初稿，音乐是现成的歌；下一步我们会用 Suno 做自己的音乐。">
  <div class="frame">
    <div class="body"><div class="mm">
      <div class="mm-wall" data-mm-wall>{col_html}</div>
      <div class="mm-side">
        <span class="kicker">03 / 资产 · 03 IP 画作</span>
        <h2>Muted<em>MEN</em></h2>
        <p class="mm-tag">Quiet emotions in a loud world.<span>在喧嚣的世界里，记录安静的情绪。</span></p>
        <p class="mm-lead">一本关于现代生活情绪的视觉日记。简洁的线条、克制的色彩，记下城市里那些平静、从容、孤独与温度的瞬间。</p>
        <p class="mm-not">它不是一个固定的角色，<br>而是<b>一种审美、一种情绪、一种看世界的方式</b>。</p>
        <dl class="mm-core"><div><dt>内核</dt><dd>平静 · 从容<small>温柔而坚定</small></dd></div><div><dt>视觉</dt><dd>Soft · Calm · Warm<small>柔和、克制、有温度</small></dd></div></dl>
        <div class="mm-stats"><div><b>#001–#096</b><span>编号作品</span></div><div><b>74</b><span>张定稿在墙上</span></div></div>
        <ul class="mm-series"><li>daily</li><li>全球街角 Global Corners</li><li>Breathing Blue</li><li>SilverGaze</li><li>infinity</li></ul>
        <button type="button" class="mm-mv" data-full="media/mutedmen-garden.mp4"><img src="media/b2w/mutedmen-garden.jpg" alt=""><span>▶ 盆栽园 DJ · MV 初稿 0:32</span></button>
      </div>
    </div></div>
  </div>
</section>''')

# ---- 音乐 H.O.T.L. ----
lineup = [("00", "The Human", "你", "定主题、改词、选版本、一票否决。唯一的蓝笔"),
          ("01", "Voice", "Suno", "一把固定的声线"),
          ("02", "Words", "Claude", "只写草稿，必须被 00 改过"),
          ("03", "Score", "Suno + 人工", "一首歌多版，00 挑段落"),
          ("04", "Memory", "Music Brain", "我的听歌数据，乐队的品味从这来"),
          ("05", "Eyes", "back to work", "封面、MV、动效")]
lu = "".join(f'<li class="{"me" if n == "00" else ""}"><b>{n}</b><span><em>{p}</em>{w}</span><small>{d}</small></li>' for n, p, w, d in lineup)
S.append(f'''
<section class="slide a1-dark" data-chapter="03 / 资产" data-title="音乐 H.O.T.L." data-minutes="2" data-notes="H.O.T.L.，Human on the Loop，是一支虚构的乐队，发真的歌。它有一条规矩：黑色印刷的字是机器做的，蓝色笔迹是人动过的手。成员没有脸，只有球衣号码：00 号是人，也就是我，是唯一的蓝笔；01 号主唱是 Suno，02 号作词是 Claude……位置固定，工具可以换。现在这首是初稿，用的是现成的歌；下一步我们用 Suno 写自己的歌。你们也可以——Suno 谁都能用。这张阵容表也是下一章的伏笔：人怎么带 AI 干活。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">03 / 资产 · 04 音乐</span><span class="leaf">HUMAN ON THE LOOP</span></div></header>
    <div class="body"><div class="hotl">
      <div class="hotl-film"><video src="media/hotl.mp4" muted loop playsinline preload="metadata" data-autoplay poster="media/b2w/hotl.jpg"></video>
        <button type="button" class="hotl-sound" data-full="media/hotl.mp4">▶ 有声播放 0:25</button></div>
      <div class="hotl-side">
        <h2>H.O.T.L.</h2>
        <p class="hotl-rule"><span class="ink">黑字是机器，</span><span class="pen">蓝笔是人。</span></p>
        <p class="hotl-lead">一支虚构的乐队，发真的歌。成员没有脸，只有号码：</p>
        <ol class="hotl-lu">{lu}</ol>
        <p class="hotl-next">现在是初稿。下一步，用 <b>Suno</b> 写我们自己的歌——<span>你也可以。</span></p>
      </div>
    </div></div>
  </div>
</section>''')

# ---- 视频 B2W ----
mv = io.open(DECK / "media/b2w/movie.html", encoding="utf-8").read()
cards = re.findall(r'<a class="card" href="([^"]+)" data-line="([^"]*)" data-prev="media/([a-z0-9-]+)\.prev\.mp4">.*?<h3>(.*?)</h3>\s*<p class="meta"><span>[^<]*</span><span>([^<]*)</span>', mv, re.S)
cards = [c for c in cards if c[2] != "fairy-linda"]   # 11-21 用户要求去掉羊毛打底衫
n_films = len(cards)
# 11-21 墙上 keynote 网站讲解 换成 Vision 大屏字（同一个位置）
_ki = next(i for i, c in enumerate(cards) if c[2] == "keynote-talk")
_vi = next(i for i, c in enumerate(cards) if c[2] == "vision")
cards[_ki], cards[_vi] = cards[_vi], cards[_ki]
# 11-22 墙上 hely 整片 换成 流光公路（同一个位置，hely 整片挪到墙外，总数照算）
_pi = next(i for i, c in enumerate(cards) if c[2] == "prism-road")
_pc = cards.pop(_pi)
_hi = next(i for i, c in enumerate(cards) if c[2] == "hely-film")
cards.append(cards[_hi]); cards[_hi] = _pc
lines = {}
for c in cards:
    lines[c[1]] = lines.get(c[1], 0) + 1
wall = "".join(
    f'<figure data-full="media/b2w/full/{slug}.mp4" data-alt="https://opc8838-hub.github.io/movie/media/{slug}.mp4"><video src="media/b2w/{slug}.prev.mp4" poster="media/b2w/{slug}.jpg" muted loop playsinline preload="none" data-autoplay></video><figcaption>{esc(title)}<i>{dur}</i></figcaption></figure>'
    for href, line, slug, title, dur in cards[:24])
line_html = " · ".join(f"{k} {v}" for k, v in lines.items())
S.append(f'''
<section class="slide" data-chapter="03 / 资产" data-title="视频 B2W" data-minutes="1.5" data-notes="视频资产：Back 2 Work 工作室，一共 {n_films} 支。规矩只有一句：人定故事和审美，模型把它做出来。有给客户做的品牌片，有原创，也有大量复刻练习——复刻是最快的学习方式。墙上的视频都在播，点任意一个可以放大。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">03 / 资产 · 05 视频</span><span class="leaf">BACK 2 WORK STUDIO · {n_films} FILMS</span></div>
      <h2>Back 2 Work：<em>人定故事和审美，模型把它做出来</em></h2>
      <p class="lead">{n_films} 支作品：{line_html}。<b>点任意一支放大。</b></p>
    </header>
    <div class="body"><div class="b2w-wall">{wall}</div></div>
    <div class="page-foot v2-src"><span>网址</span>opc8838-hub.github.io/movie</div>
  </div>
</section>''')

# ---- 为什么要攒 ----
S.append('''
<section class="slide" data-chapter="03 / 资产" data-title="为什么要攒" data-minutes="1" data-notes="收一句：作品证明你能做，产品证明它能跑，IP、音乐、视频证明你的品味。AI 让做一件东西变得很便宜，所以单件不值钱；值钱的是你攒了多少、攒的东西像不像同一个人做的。今天回去，就可以开始往自己的柜子里放第一件。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">03 / 资产 · 收一句</span><span class="leaf">WHY KEEP IT</span></div>
      <h2>每做一件事，<em>都往柜子里放一件</em></h2>
    </header>
    <div class="body"><ol class="why3">
      <li><b>作品</b><span>证明你<strong>能做</strong></span></li>
      <li><b>产品</b><span>证明它<strong>能跑</strong></span></li>
      <li><b>IP · 音乐 · 视频</b><span>证明你的<strong>品味</strong></span></li>
    </ol>
    <p class="why-line">AI 让做一件东西变得很便宜。<br><span class="hl">单件不值钱，攒下来的才值钱。</span></p></div>
  </div>
</section>''')

# =====================================================================
# 第四幕
# =====================================================================
S.append(chapter("04", "硅基领导力", "Silicon<br><em>Leadership</em>",
                 "这一章回答：同样用 AI，为什么有人做得出来，有人做不出来？", 3,
                 "章节页。今天最想讲的就是这一章。停两秒，问台下：你们觉得，同样用 AI，差距在哪？"))

# ---- 冰山 ----
layers = [("背景", "这件事是给谁做的、为什么做"), ("要什么", "做成什么样，交付什么"), ("怎么干", "先做哪步、哪里最难"),
          ("计划", "分几步、每步怎么验收"), ("检查标准", "什么算对、什么算错"), ("你的经验", "管过团队、做过生意、会表达")]
lay = "".join(f'<li style="--k:{i}"><b>{a}</b><span>{b}</span></li>' for i, (a, b) in enumerate(layers))
S.append(f'''
<section class="slide" data-chapter="04 / 硅基领导力" data-title="一个误会" data-minutes="2" data-notes="很多人以为，用不好 AI 是提示词没写好。我认为提示词只是基准线，水面上那一小块。真正决定交付质量的，是水面下的东西：你有没有把背景、要什么、怎么干、计划、检查标准讲清楚——点一下，一层层翻出来。最下面一层是你的经验：管没管过团队、懂不懂生意、会不会表达。如果不看每个人和 AI 的对话，你根本看不到这个差距有多大。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">04 / 硅基领导力 · 一个误会</span><span class="leaf">THE ICEBERG</span></div>
      <h2>差距不在提示词，<em>在水面下</em></h2>
      <p class="lead">提示词的质量，只是 AI 交付的<b>基准线</b>。<b>点一下，往下翻一层。</b></p>
    </header>
    <div class="body"><div class="ice" data-steps>
      <div class="ice-top"><span>提示词</span><small>大家以为的差距</small></div>
      <div class="ice-water"><i>水面</i></div>
      <ol class="ice-low">{lay}</ol>
    </div></div>
  </div>
</section>''')

# ---- 两种说法 ----
real = [("给谁", "我要开发一个针对本地生活商家，主要解决是餐饮线下门店，"),
        ("要什么 ①", "一个是节假日的海报图，……用户填加自己的品牌名、Slogan，还有一些菜品图或者二维码，然后就可以自动生成了，"),
        ("要什么 ②", "还有一个就是门店菜品图，……节假日上新啊，换个菜品图上去，因为这些都是展示在移动互联网平台的"),
        ("重点", "最重要的是一个五联图，主要平台还是抖音以及大众点评，五联图它是一个长图，然后切割适配到平台里面，这个你要找资料了解清楚"),
        ("难点", "这个可能困难点就是，首先要生成一个五联图的长图，然后自动切割，把五张图返回给到用户"),
        ("标准", "五连图尺寸 5000px*750px，单张 1000px*750px，参考下视频，大众点评，抖音都是这个尺寸")]
rh = "".join(f'<p style="--k:{i}"><mark>{a}</mark>{esc(b)}</p>' for i, (a, b) in enumerate(real))
S.append(f'''
<section class="slide" data-chapter="04 / 硅基领导力" data-title="同一件事，两种说法" data-minutes="2" data-notes="同一件事，两种说法。左边是大多数人会说的一句话。右边是我 10 月 7 日下午真实发给 Codex 的话——就是后来五联图功能的起点。点一下，右边标出每句话在干什么：给谁、要什么、重点、难点，最后补上尺寸标准。这里面没有任何提示词技巧，就是把一件事讲清楚。这背后是你过往的经验、管没管过团队、你的表达能力。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">04 / 硅基领导力 · 同一件事</span><span class="leaf">CODEX · 2026-10-07 17:57</span></div>
      <h2>同一件事，<em>两种说法</em></h2>
    </header>
    <div class="body"><div class="two">
      <div class="two-a"><em>常见的说法</em><p>“帮我做一个五联图功能。”</p><small>AI 会做，但做出来的，大概率不是你要的。</small></div>
      <div class="two-b" data-steps><em>我那天真实发给 Codex 的话<span>（原文节选）</span></em><div class="two-msg">{rh}</div></div>
    </div></div>
    <div class="page-foot v2-src"><span>出处</span>2026-10-07 hely 项目 Codex 对话原文（北京时间 17:57、18:18 两条），省略号处为删节。</div>
  </div>
</section>''')

# ---- 为什么懂业务的人更会用 AI ----
S.append('''
<section class="slide" data-chapter="04 / 硅基领导力" data-title="谁更会驾驭 AI" data-minutes="1.5" data-notes="所以你会发现一个现象：在 AI 圈，做应用层、做设计、做产品经理的人，某种程度上比做纯技术的人更会驾驭 AI。不是说懂技术、懂算法没用，而是只懂这些，不够让 AI 交付出满意的结果。因为他们懂痛点、懂需求、懂表达。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">04 / 硅基领导力 · 一个现象</span><span class="leaf">WHO LEADS AI</span></div>
      <h2>为什么做产品、设计的人，<em>更会驾驭 AI</em></h2>
      <p class="lead">懂一点技术、懂算法，<b>不等于</b>能让 AI 交付出满意的结果。</p>
    </header>
    <div class="body"><div class="who">
      <div class="who-l"><em>只懂</em><ul><li>技术</li><li>算法</li><li>工具</li></ul><p>能把事情<b>做出来</b></p></div>
      <div class="who-x">vs</div>
      <div class="who-r"><em>还懂</em><ul><li><b>痛点</b><span>知道谁难受、难受在哪</span></li><li><b>需求</b><span>知道要什么、不要什么</span></li><li><b>表达</b><span>能把它讲清楚</span></li></ul><p>能把<b>对的</b>事情做出来</p></div>
    </div></div>
  </div>
</section>''')

# ---- 定义 ----
S.append('''
<section class="slide a1-dark sl-def" data-chapter="04 / 硅基领导力" data-title="硅基领导力" data-minutes="1.5" data-notes="抛开开发、想法、产品，今天我最想留给大家的一个词：硅基领导力，Silicon Leadership。就是带领 AI 干活的能力。它有三根柱子：提需求的能力、提检验标准的能力、跨界的学习能力。还记得开头那页吗？带团队的方法，拿来带 Agent——这就是同一件事。">
  <div class="frame">
    <div class="body"><div class="sl">
      <span class="kicker">04 / 今天最想留给你的一个词</span>
      <h2 class="sl-zh">硅基领导力</h2>
      <p class="sl-en">SILICON LEADERSHIP</p>
      <p class="sl-def">带领 AI 干活的能力。</p>
      <ol class="sl-pillars">
        <li style="--k:0"><em>01</em><b>提需求</b><span>知道要干什么，说清楚</span></li>
        <li style="--k:1"><em>02</em><b>提检验标准</b><span>AI 一定会错，你要知道什么算对</span></li>
        <li style="--k:2"><em>03</em><b>跨界学习</b><span>how 交给 AI，你往上走</span></li>
      </ol>
    </div></div>
  </div>
</section>''')

# ---- 能力一：提需求 ----
handoff = [("# HANDOFF：用 AI 攻一个“大问题”", "h"),
           ("> 交接人：Claude（2026-11-01）→ 接手：Codex", "m"),
           ("## 0. 一句话", "h2"),
           ("用户想做一件有野心、有商业价值的事：照搬“产品经理帕维尔用 AI 发现行星候选体”的方法论……", "t"),
           ("你的第一个任务是摸底和小样本试跑，拿真实结果给用户做决定，不是直接开干。", "k"),
           ("## 1. 用户是谁（必读，决定你怎么沟通）", "h2"),
           ("非技术负责人，自称小白。跟用户说话要白话、给手把手步骤……", "t"),
           ("## 2. 帕维尔方法论（要迁移的东西）", "h2"),
           ("最值得学的是“预注册”……", "t")]
hd = "".join(f'<p class="{c}">{esc(t)}</p>' for t, c in handoff)
S.append(f'''
<section class="slide" data-chapter="04 / 硅基领导力" data-title="能力一：提需求" data-minutes="2" data-notes="第一种能力：提需求。知道要干什么，向 AI 准确地描述清楚：能总结、能抓重点、目标是什么。左边是我真实的一份交接文档，交给 Codex 一个新项目之前写的。注意它的结构：先一句话说目标，再说用户是谁、决定怎么沟通，再交代方法，最后明确第一步是摸底，不是直接开干。这和在公司里给同事派活一模一样。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">04 / 硅基领导力 · 能力一</span><span class="leaf">01 · BRIEF</span></div>
      <h2>能力一：<em>提需求</em></h2>
      <p class="lead">知道要干什么，向 AI 准确描述清楚。<b>能总结、抓重点、说清目标。</b></p>
    </header>
    <div class="body"><div class="cap1">
      <div class="doc"><div class="pr-bar"><i></i><i></i><i></i><span>big-problem / HANDOFF.md</span></div><div class="doc-body">{hd}</div></div>
      <ol class="cap1-list">
        <li><b>一句话说目标</b><span>做成什么、为什么做</span></li>
        <li><b>交代背景和对象</b><span>给谁用、他是什么样的人</span></li>
        <li><b>说清要什么、不要什么</b><span>边界比愿望更重要</span></li>
        <li><b>第一步是什么</b><span>先摸底、先小样本，不是直接开干</span></li>
      </ol>
    </div></div>
    <div class="page-foot v2-src"><span>出处</span>E:\\claude工作区\\big-problem\\HANDOFF.md 原文节选（2026-11-01）。</div>
  </div>
</section>''')

# ---- 能力二：定标准 ----
rules = ["新数据和预测对得上 → 符合", "对不上 → 预测错了", "出现某种信号 → 排除候选体", "数据不够 → 只能算不知道"]
rl = "".join(f"<li>{r}</li>" for r in rules)
S.append(f'''
<section class="slide" data-chapter="04 / 硅基领导力" data-title="能力二：提检验标准" data-minutes="2.5" data-notes="第二种能力：提检验标准。AI 一定会错，它不是万能的。就像老板管公司：要干什么、为什么干、干成什么样，这三件事老板说清楚；怎么干是下面的事，老板不盯细节，但一定给清楚的检查标准。没有标准，AI 也是瞎逛。右边是一个真实例子：一个 28 岁、没有天文背景的产品经理帕维尔，用 Claude Code 和 Codex 在 NASA 的公开数据里找行星。他最厉害的不是写脚本，是在新数据回来之前，先把 9 次凌日的时间写死、精确到分钟，再写死 4 条判定规则——什么算对、什么算错。人定义“什么情况下我是错的”，AI 负责执行。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">04 / 硅基领导力 · 能力二</span><span class="leaf">02 · STANDARD</span></div>
      <h2>能力二：<em>提检验标准</em></h2>
      <p class="lead">AI 一定会错。<b>没有标准，AI 也是瞎逛。</b></p>
    </header>
    <div class="body"><div class="cap2">
      <div class="boss">
        <p class="boss-k">像老板管公司</p>
        <ol><li><b>干什么</b><span>方向</span></li><li><b>为什么干</b><span>理由</span></li><li class="bs-hot"><b>干成什么样</b><span>检查标准</span></li></ol>
        <p class="boss-low"><s>怎么干</s> 是下面的事——交给 AI。</p>
      </div>
      <div class="pavel">
        <p class="pv-k">真实例子 · 用 AI 找行星</p>
        <h3>先写死答案，<em>再让 AI 去跑</em></h3>
        <p class="pv-t">28 岁产品经理帕维尔，没有天文背景。用 Claude Code + Codex，在 NASA TESS 卫星的公开数据里，从 12 万颗恒星中找到一颗每 3.18 天变暗一次的星——可能是一颗行星候选体。</p>
        <div class="pv-pre"><b>新数据回来之前，他先写死：</b><p><span class="n">9</span> 次凌日的时间，精确到分钟</p><p><span class="n">4</span> 条判定规则：</p><ul>{rl}</ul></div>
        <p class="pv-take">人定义“什么情况下我是错的”，<span class="hl">AI 负责执行。</span></p>
      </div>
    </div></div>
  </div>
</section>''')

# ---- Taste ----
S.append('''
<section class="slide" data-chapter="04 / 硅基领导力" data-title="Taste" data-minutes="1.5" data-notes="大家经常说，人要有 taste，品味。taste 很难量化，很宽泛。大众说的 taste 是好不好看，这是第一层。我觉得还有两层：知识的品味——你知道什么是好的做法；最重要的是判断方向——知道干什么，知道不干什么，然后干到我的标准。所以 taste 和检验标准是一回事：标准，就是你写下来的 taste。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">04 / 硅基领导力 · 说说 taste</span><span class="leaf">TASTE</span></div>
      <h2>Taste，<em>不只是好不好看</em></h2>
    </header>
    <div class="body"><ol class="taste">
      <li style="--k:0"><em>第一层</em><b>审美</b><span>这个东西好不好看</span></li>
      <li style="--k:1"><em>第二层</em><b>知识的品味</b><span>知道什么是好的做法</span></li>
      <li style="--k:2" class="top"><em>第三层</em><b>判断方向</b><span>知道干什么，<strong>知道不干什么</strong>，干到我的标准</span></li>
    </ol>
    <p class="taste-line">检验标准，<span class="hl">就是你写下来的 taste。</span></p></div>
  </div>
</section>''')

# ---- 能力三：跨界 ----
S.append('''
<section class="slide" data-chapter="04 / 硅基领导力" data-title="能力三：跨界学习" data-minutes="2" data-notes="第三种能力：跨圈的学习能力。以前我们大量时间花在 how 上：写代码、写文案、写文字，具体的工作。现在具体工作被 AI 代劳了，你的层级就提上去了——你每天关心的是 why 和 what。这时候你会发现，你的能力完全可以跨界：做产品的可以做设计，做设计的可以去编程。我自己就是例子：阿里做销售出身，开过餐厅，今年写了 895 次提交。所以要突破自己。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">04 / 硅基领导力 · 能力三</span><span class="leaf">03 · CROSS OVER</span></div>
      <h2>能力三：<em>跨界学习</em></h2>
      <p class="lead">how 交给 AI 之后，<b>你的层级就提上去了。</b></p>
    </header>
    <div class="body"><div class="cap3">
      <div class="lvl">
        <div class="lvl-col"><em>以前</em><div class="bar why"><b>why</b></div><div class="bar what"><b>what</b></div><div class="bar how big"><b>how</b><span>写代码 · 写文案 · 写文字</span></div></div>
        <div class="lvl-arrow">→</div>
        <div class="lvl-col now"><em>现在</em><div class="bar why big"><b>why</b><span>为什么做</span></div><div class="bar what big"><b>what</b><span>做成什么样</span></div><div class="bar how ai"><b>how</b><span>交给 AI</span></div></div>
      </div>
      <div class="cross">
        <p class="cross-k">于是可以跨界</p>
        <ul><li>做产品的 <i>→</i> 做设计</li><li>做设计的 <i>→</i> 去编程</li><li class="me">阿里销售 · 开过餐厅 <i>→</i> 写了 895 次提交</li></ul>
        <p class="cross-take">要求我们，<span class="hl">突破自己。</span></p>
      </div>
    </div></div>
  </div>
</section>''')

# ---- 十二句话（珠江第 50 页）----
zj50 = (T / "zj50.html").read_text(encoding="utf-8")
zj50 = zj50.replace('data-chapter="收尾 · 思维"', 'data-chapter="04 / 硅基领导力"').replace(
    '<span class="kicker">收尾 / 核心思想与金句</span>', '<span class="kicker">04 / 硅基领导力 · 我常听的十二句话</span>').replace(
    '今天最想留给你们的<em>十二句话</em>', '我常拿来对照自己的<em>十二句话</em>').replace(
    '其余让学生拍照', '其余让大家拍照').replace('推荐同学们自己去听', '推荐大家自己去听')
S.append(zj50)

# ---- 李开复（珠江第 51 页）----
zj51 = (T / "zj51.html").read_text(encoding="utf-8")
zj51 = zj51.replace('data-chapter="收尾 · 思维"', 'data-chapter="04 / 硅基领导力"').replace(
    '<span class="kicker">收尾 / 给想成为引导者的年轻人</span>', '<span class="kicker">04 / 硅基领导力 · 李开复的五个词</span>')
S.append(zj51)

# ---- Something bigger ----
S.append('''
<section class="slide a1-dark" data-chapter="04 / 硅基领导力" data-title="Something bigger than yourself" data-minutes="2.5" data-notes="最后一个观念：something bigger than yourself，做一些比你自己更大的事。我会留一部分时间给长期项目、大问题，不为了马上赚钱。一个是甲骨文：几千个甲骨文字，三分之二到今天都没有被释读，我把一千多个已释读的和三千个未释读的真实字形做成了可以玩的字海——点一下放演示。一个是行星：照着帕维尔的方法，看 AI 能不能在公开数据里找到专家看不过来的东西。还有 H.O.T.L.，一支要长期做下去的乐队。还记得 2019 年那行字吗？让天下没有难做的生意。我的那一句是：让没有设计团队的企业，也能做出苹果级的表达。">
  <div class="frame">
    <header class="s-head"><div class="folio"><span class="kicker">04 / 硅基领导力 · 最后一个观念</span><span class="leaf">LONG-TERM PROJECTS</span></div>
      <h2>Something <em>bigger than yourself</em></h2>
    </header>
    <div class="body"><div class="big">
      <article class="big-a" data-full="media/qi.mp4"><div class="big-vis"><video src="media/qi.mp4" muted loop playsinline preload="metadata" data-autoplay poster="media/qi.jpg"></video><span class="aw-play">▶ 有声演示</span></div><em>研究 · 古文字</em><h3>契 · 甲骨文</h3><p>1265 个已释读 + 3000 个未释读的真实字形，做成能玩的字海。</p></article>
      <article class="big-b"><div class="big-vis big-sky"><i></i><i></i><i></i><b>TIC 4206066</b><span>每 3.18 天，变暗万分之五</span></div><em>研究 · 公开数据</em><h3>用 AI 找行星</h3><p>NASA TESS 公开数据，12 万颗恒星，专家看不过来的地方，AI 能不能先看一遍。</p></article>
      <article class="big-c"><div class="big-vis"><img src="media/b2w/hotl.jpg" alt=""></div><em>长期 · 音乐</em><h3>H.O.T.L. 乐队</h3><p>一支一直往里放作品的乐队：歌、MV、T 恤，每一件都有编号。</p></article>
    </div>
    <div class="amb"><span>2019 年那行字：让天下没有难做的生意。</span><b>我的那一句：<em>让没有设计团队的企业，也能做出苹果级的表达。</em></b></div></div>
  </div>
</section>''')

# ---- 收尾 ----
S.append('''
<section class="slide end2" data-chapter="收尾" data-title="谢谢" data-minutes="2" data-notes="最后留一个问题，不用现在回答：你的 something bigger 是什么？想聊的，扫码加我微信。谢谢大家。">
  <div class="frame">
    <div class="body"><div class="end">
      <div class="end-l">
        <span class="kicker">THANKS · TRAE Friends OPC Talk</span>
        <p class="end-q">留一个问题，不用现在回答：</p>
        <h2>你的 <em>something bigger</em> 是什么？</h2>
        <ol class="end-sl"><li>提需求</li><li>提检验标准</li><li>跨界学习</li></ol>
        <p class="end-by"><b>黎健堂</b> · 碳基社区 · 广州德宝里科技 &nbsp;|&nbsp; hely.fun · cellmotion.cn</p>
      </div>
      <div class="end-r"><img src="img/wechat.jpg" alt="微信二维码"><span>扫码加微信 · allen_8838</span></div>
    </div></div>
  </div>
</section>''')

head = (T / "head.html").read_text(encoding="utf-8").replace(
    '<link rel="stylesheet" href="talk.css">',
    '<link rel="stylesheet" href="talk.css">\n<link rel="stylesheet" href="v2.css">\n<link rel="stylesheet" href="a1.css">\n<link rel="stylesheet" href="a34.css">')
tail = (T / "tail.html").read_text(encoding="utf-8").replace(
    '<script src="talk.js"></script>', '<script src="v2.js"></script>\n<script src="a1.js"></script>\n<script src="a34.js"></script>')
(DECK / "act34.html").write_text(head + "\n".join(S) + tail, encoding="utf-8")
print("ok", len(S), "films", n_films, lines)
