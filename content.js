const L = (k,t,d) => '<div class="slide-heading"><span class="kicker">'+k+'</span><h2 class="kinetic">'+t+'</h2><p>'+d+'</p></div>';
const S = (n,t,d) => '<div class="step"><b>'+n+'</b><div><strong>'+t+'</strong><p>'+d+'</p></div></div>';
const B = (t,d,c) => '<div class="brief '+(c||'')+'"><small>'+t+'</small><p>'+d+'</p></div>';
window.lessonAssets = {
  firstPrompt: [
    '请为「单位读书分享会」制作一张可直接使用的活动封面图',
    '用途：放在单位内部通知的首页，也适合投影展示',
    '画幅：横版 16:9，建议 1920×1080',
    '主标题：把阅读带回日常',
    '副标题：单位读书分享会',
    '视觉：国际瑞士风格，网格排版，暖白背景，深蓝文字，少量亮黄强调，留出清晰的文字安全区',
    '请生成真正的图片文件，并告诉我在右侧「产物」中从哪里打开或下载',
    '如果当前模型无法直接生图，请明确告诉我缺少什么能力，以及在当前界面如何切换到可生图的模式或模型',
    '中文标题请尽量准确，输出后提醒我人工核对文字'
  ].join('\n'),
  repairPrompt: [
    '请根据刚才的封面图修改，不要换主题',
    '保留横版 16:9 和整体配色',
    '把主标题严格改为「把阅读带回日常」',
    '让主标题更大，副标题更小，四周留出安全边距',
    '如果图片里的中文字无法准确生成，请先做无字背景图，并单独给我一版可复制的标题排版建议'
  ].join('\n'),
  skillPrompt: [
    '请创建一个名为「我的封面图助手」的 Skill，用于反复制作活动、课程或文章封面图',
    '先根据我提供的主题、主标题、副标题、受众、使用场景、画幅和偏好风格工作',
    '如果关键信息缺失，先用不超过 3 个问题向我确认，不要自行补写日期、地点、单位名称或人物身份',
    '每次先给出简短设计方案：信息层级、画幅、配色、画面元素、文字安全区',
    '确认后生成真正的图片文件，优先输出可下载的 PNG 或 JPG，并说明在产物区如何找到',
    '如果当前能力无法生图，明确说明原因和下一步，不要把文字描述冒充图片交付',
    '生成后自检：标题是否准确、中文字是否有错、主体是否被裁切、画幅是否适合使用场景',
    '对于无法保证准确的中文文字，优先输出无字背景和可复制的文字层建议',
    '最后交付图片、建议文件名、两项人工核对点',
    '请先展示 Skill 的名称、适用场景、输入项、工作步骤和输出标准，供我检查，再按当前界面完成创建或保存'
  ].join('\n'),
  reusePrompt: [
    '请调用我已安装的「我的封面图助手」Skill，制作一张新封面',
    '主题：社区亲子阅读日',
    '主标题：一起读，慢慢长大',
    '副标题：周末亲子阅读活动',
    '受众：有小学孩子的家长',
    '使用场景：微信群通知和活动投影',
    '画幅：横版 16:9',
    '风格：清爽、亲切，米白底色，深蓝标题，少量橙色点缀',
    '先按 Skill 的规则核对输入，再生成图片，最后告诉我哪里下载以及要人工核对什么'
  ].join('\n')
};
window.lessonSlides = [
  {
    chapter:'开场', title:'亲手做一个封面图 Skill', minutes:3, theme:'blue', layout:'cover',
    html:'<div class="cover-main"><div class="cover-kicker">90 分钟 · 现场动手 · 零基础</div><h1 class="kinetic">亲手做一个<br><em>封面图 Skill</em></h1><p class="cover-deck">今天不只听概念，每个人直接打开 WorkBuddy，做出一张封面图，再把自己的做法保存成可以反复使用的技能</p><div class="cover-actions"><a href="https://www.workbuddy.cn/" target="_blank" rel="noopener">现在打开 WorkBuddy ↗</a><span>约 30 人 · 建议两人互助</span></div></div><div class="cover-side"><div class="cover-number">01—16</div><div class="cover-route"><div><b>01</b><span>先出一张图</span></div><div><b>02</b><span>做成自己的 Skill</span></div><div><b>03</b><span>换主题复测</span></div></div><div class="cover-promise">离开前，你会拥有一张可用封面<br>和一套能再次调用的工作方法</div></div>',
    foot:'现在就打开 WorkBuddy，先登录，不等概念讲完',
    notes:'开场 3 分钟，先让所有人打开 WorkBuddy，投影二维码或官网链接，要求两人互相确认都进入主界面，再说明本课完成标准是新任务里成功调用自己的 Skill'
  },
  {
    chapter:'准备', title:'打开 WorkBuddy 并确认入口', minutes:6, theme:'paper', layout:'procedure',
    html:L('01 / 起步','先把软件打开','跟着屏幕做，做到右侧能看到 WorkBuddy 主界面')+'<div class="split"><div class="steps">'+S('01','打开官网或桌面程序','电脑打开 workbuddy.cn，安装并启动 WorkBuddy，已有程序就直接打开')+S('02','完成登录','按界面提示登录，若出现扫码入口，使用微信扫码并回到电脑')+S('03','点「新建任务」','在输入框附近确认当前为 Agent 模式，Ask 模式适合问答，今天需要交付图片文件')+S('04','找到两个位置','认识任务输入框和右侧「产物」，稍后图片完成后从产物区查看或下载')+'</div><div class="side-stack">'+B('现在的成功标志','你看到一个空白的新任务，可以在输入框打字，右侧能找到「产物」或任务结果区域','accent')+B('登录卡住时','先和同桌共用一台电脑操作，自己记录提示词，课后再用个人账号创建')+'<a class="text-link" href="https://www.workbuddy.cn/docs/workbuddy/FirstTask" target="_blank" rel="noopener">查看 WorkBuddy 官方首次任务指南 ↗</a></div></div>',
    foot:'全班确认：能看见「新建任务」的请举手', notes:'准备 6 分钟，逐排查看，约 30 人可按 15 组互助，若少数人登录失败，不拖住全班，先让同桌代操作并保留独立指令'
  },
  {
    chapter:'理解', title:'聊天机器人、Agent、Skill', minutes:4, theme:'paper', layout:'concept',
    html:L('02 / 只讲够用的概念','三个词，三种作用','豆包、元宝、WorkBuddy 是产品入口，聊天、Agent、Skill 是使用方式或能力')+'<div class="concept-grid"><div><span>01 / CHATBOT</span><strong>聊天机器人</strong><p>你问一个问题，它给解释、建议或一段内容</p><small>像请教同事</small></div><div class="active"><span>02 / AGENT</span><strong>智能体</strong><p>你给目标和材料，它安排步骤、使用工具、交付可检查的成果</p><small>像交办任务</small></div><div><span>03 / SKILL</span><strong>技能</strong><p>把反复用的工作规则保存下来，下次换主题还能按同一方法做</p><small>像保存工作手册</small></div></div><div class="bottom-note"><b>本课里的关系</b><span>WorkBuddy 是平台 → Agent 执行封面任务 → 封面图 Skill 提供固定做法 → 人检查最终图片</span></div>',
    foot:'产品功能会随版本变化，判断时看它具体能做什么', notes:'概念只讲 4 分钟，请学员口头复述一句：Agent 推进任务，Skill 保存做法，豆包或元宝也可能具备多种能力，不能简单说它们只会聊天'
  },
  {
    chapter:'动手做图', title:'先选一个真实主题', minutes:4, theme:'paper', layout:'topic',
    html:L('03 / 先有题目','你的第一张封面，要用在哪里','从真实工作或生活中选一个，一张图只服务一个具体用途')+'<div class="split"><div class="topic-list"><div><b>单位活动</b><span>读书分享会、志愿服务、培训通知</span></div><div><b>个人内容</b><span>公众号文章、读书笔记、课程封面</span></div><div><b>家庭生活</b><span>亲子阅读日、班级活动、生日邀请</span></div><div><b>先练公共题</b><span>单位读书分享会，主标题「把阅读带回日常」</span></div></div><div class="worksheet"><small>开始前，写下四项</small><div>① 主题是什么</div><div>② 图放在哪里</div><div>③ 主标题是什么</div><div>④ 横版还是竖版</div><p>不要上传单位未公开资料或他人隐私，课堂先用公开或自拟内容</p></div></div>',
    foot:'每个人先说给同桌听，同桌判断标题是否清楚', notes:'4 分钟，允许学员直接选公共题，不让选题拖住操作，若有单位保密材料，建议改写成公开主题或虚构练习'
  },
  {
    chapter:'动手做图', title:'第一次生成封面图', minutes:9, theme:'blue', layout:'prompt',
    html:L('04 / 第一次交付','复制指令，发给 Agent','先用公共题跑通流程，熟悉后再换成自己的主题')+'<div class="split prompt-layout"><div class="steps light">'+S('01','回到 WorkBuddy 新任务','确认在 Agent 模式，把下方完整指令粘贴到输入框')+S('02','点击发送，等待任务执行','如果软件请求允许使用图片工具，先阅读权限说明，再按课堂需要选择')+S('03','打开右侧「产物」','找到生成的 PNG 或 JPG，打开看实图，并尝试下载')+'</div><div class="prompt-box"><div class="prompt-head"><span>可直接复制的首轮指令</span><button type="button" data-copy="firstPrompt">复制完整指令 ↗</button></div><pre data-prompt-preview="firstPrompt"></pre></div></div>',
    foot:'成功标准：有真实图片文件，不是只有一段图片描述', notes:'9 分钟，投影上现场演示复制和发送，留 3 至 5 分钟等任务，强调右侧产物区，若模型不支持生图先按提示切换能力，不能把图片描述当成果'
  },
  {
    chapter:'动手做图', title:'把第一张图改到能用', minutes:6, theme:'paper', layout:'audit',
    html:L('05 / 验收','第一张图要检查什么','AI 做完只是初稿，人要用肉眼完成最后一步')+'<div class="split"><div class="audit-grid"><div><b>文字</b><p>主标题有没有错字、漏字、乱码</p></div><div><b>尺寸</b><p>横版是否适合投影或通知首页</p></div><div><b>层级</b><p>主标题是否一眼能看到，副标题是否退后</p></div><div><b>安全区</b><p>边缘是否太挤，手机预览会不会裁切</p></div><div><b>事实</b><p>有没有擅自写日期、单位名称或人物</p></div><div><b>可用性</b><p>能否下载，文件打开后是否清晰</p></div></div><div class="side-stack"><div class="prompt-box compact"><div class="prompt-head"><span>有错就让它修改</span><button type="button" data-copy="repairPrompt">复制修图指令 ↗</button></div><pre data-prompt-preview="repairPrompt"></pre></div>'+B('中文字总不准','让 AI 先交付无字背景，再把准确文字放进 PPT、Canva 或其他排版工具中叠加')+'</div></div>',
    foot:'同桌互看 30 秒，说出一个可改进点', notes:'6 分钟，两人互查，不追求完美画面，只要知道怎样验收和二次修改，特别提醒中文文字与活动信息要人工核对'
  },
  {
    chapter:'理解', title:'为什么要做 Skill', minutes:4, theme:'paper', layout:'recipe',
    html:L('06 / 从一次到多次','有了第一张图，才知道该保存什么','一次性提示词解决这次任务，Skill 保存下次仍要遵守的做法')+'<div class="recipe-flow"><div><span>这次封面</span><strong>主题、标题、画幅</strong><p>每次都会变化的输入</p></div><i>＋</i><div><span>稳定做法</span><strong>先问清 → 先规划 → 再出图 → 最后检查</strong><p>每次都要执行的规则</p></div><i>＝</i><div class="result"><span>我的 Skill</span><strong>可反复调用的封面图助手</strong><p>换一个主题，仍按同样方法交付</p></div></div><div class="bottom-note"><b>最容易搞混</b><span>把一段提示词粘贴一次，仍是单次任务，只有在技能入口创建并在新任务调用，才验证了复用</span></div>',
    foot:'Agent 负责推进，Skill 提供做法，人负责判断结果能否使用', notes:'4 分钟，用菜谱类比 Skill：菜名与食材可换，做法和检查项保留，为后面创建做好理解准备'
  },
  {
    chapter:'创建 Skill', title:'写出自己的封面需求', minutes:7, theme:'paper', layout:'builder',
    html:L('07 / 把你的要求写清楚','填六项，生成自己的指令','下面的内容只在这个网页组合成文字，复制后由你亲手贴进 WorkBuddy')+'<div class="builder-layout"><form class="builder-form" id="brief-form"><label>主题<input name="topic" value="单位读书分享会" autocomplete="off"></label><label>主标题<input name="title" value="把阅读带回日常" autocomplete="off"></label><label>副标题<input name="subtitle" value="单位读书分享会" autocomplete="off"></label><label>受众<input name="audience" value="单位同事" autocomplete="off"></label><label>使用场景<input name="use" value="内部通知首页与投影" autocomplete="off"></label><label>画幅<select name="ratio"><option>横版 16:9</option><option>竖版 3:4</option><option>方形 1:1</option></select></label><label class="full">风格偏好<input name="style" value="国际瑞士风格，暖白底色，深蓝文字，少量亮黄强调" autocomplete="off"></label></form><div class="generated"><div class="prompt-head"><span>根据你的填写实时生成</span><button type="button" data-copy-generated="task">复制我的首图指令 ↗</button></div><pre id="generated-task"></pre><div class="generated-actions"><button type="button" data-copy-generated="skill">复制我的 Skill 创建指令 ↗</button><button type="button" data-preview-generated="skill">查看 Skill 指令</button><small>Skill 保存固定规则，主题和标题每次再填</small></div></div></div>',
    foot:'先改成自己的真实主题，至少改主标题和受众', notes:'7 分钟，让每个人至少改两项，讲师走动确认不是全部沿用公共题，复制后可先粘贴到记事本备用，字段不需要涉及敏感信息'
  },
  {
    chapter:'创建 Skill', title:'找到创建技能入口', minutes:9, theme:'blue', layout:'path',
    html:L('08 / WorkBuddy 实际点击路径','从左侧进入技能，再创建','请学员看自己的电脑，一步一步点击，不用手写文件')+'<div class="path-line"><div><b>01</b><strong>左侧栏</strong><span>专家·技能·连接器</span></div><i>→</i><div><b>02</b><strong>进入</strong><span>技能</span></div><i>→</i><div><b>03</b><strong>点击</strong><span>添加技能</span></div><i>→</i><div><b>04</b><strong>选择</strong><span>创建技能</span></div></div><div class="split"><div class="steps light">'+S('A','看见创建对话后','把刚才复制的「Skill 创建指令」粘贴进去，或使用下一屏的通用版本')+S('B','让 WorkBuddy 生成技能','先看它展示的名称、用途和规则，再决定是否按界面按钮保存或安装')+S('C','回到技能页核对','在「已安装」里找到自己的封面图 Skill，名字与用途应能辨认')+'</div><div class="side-stack">'+B('界面与投影略有差异','先找左侧「专家·技能·连接器」，再找「技能」，创建入口可能在添加技能菜单里','accent')+B('暂时找不到入口','先用窗口搜索或扩大窗口，仍找不到就和同桌共用一个账号演示，课后再补建')+'<a class="text-link inverted" href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market" target="_blank" rel="noopener">查看官方技能入口说明 ↗</a></div></div>',
    foot:'讲师停在每一步，等待全班多数人跟上再继续', notes:'9 分钟，按 01 至 04 分步投影和口令，讲师每一步暂停并巡视，官方文档写明左侧专家·技能·连接器 → 技能 → 添加技能 → 创建技能，若产品界面更新以同名入口为准'
  },
  {
    chapter:'创建 Skill', title:'粘贴创建指令并检查', minutes:7, theme:'paper', layout:'prompt',
    html:L('09 / 创建技能','把规则交给 WorkBuddy','这段不是让它做一张图，而是让它保存以后每次做图时遵守的流程')+'<div class="split prompt-layout"><div class="steps">'+S('01','粘贴到「创建技能」对话','用上一屏生成的个人版，或点右侧复制通用版')+S('02','阅读生成的技能说明','核对名称、适用场景、输入项、工作步骤与输出标准')+S('03','缺了规则就当场补充','例如「不能虚构日期」「无生图能力时不能假装交付」「中文需核对」')+S('04','按当前界面完成保存','界面可能显示创建、保存或安装，完成后到「已安装」核验')+'</div><div class="prompt-box"><div class="prompt-head"><span>通用版创建指令</span><button type="button" data-copy="skillPrompt">复制通用版 ↗</button></div><pre data-prompt-preview="skillPrompt"></pre></div></div>',
    foot:'不要把尚未保存的对话当成已创建 Skill', notes:'7 分钟，优先使用个人版创建指令，通用版用于跟不上或字段不完整的学员，解释有的版本会先展示技能草稿，必须继续完成界面上的保存动作'
  },
  {
    chapter:'创建 Skill', title:'在已安装中找到它', minutes:4, theme:'paper', layout:'verification',
    html:L('10 / 保存后核验','你真的拥有这个 Skill 了吗','从当前对话离开，再回到技能页确认，比只看一句「已完成」更可靠')+'<div class="verification-grid"><div class="verify-yes"><b>看到了</b><strong>已安装 → 我的封面图助手</strong><p>点开后能看见它的用途或说明，这说明你已经有可再次选择的技能</p></div><div><b>没看到</b><strong>回到创建对话检查</strong><p>看是否还停在预览或等待确认，按界面完成创建、保存或安装，再刷新技能列表</p></div><div><b>名字不同</b><strong>先核对用途</strong><p>WorkBuddy 可能改写技能名称，重点看是否包含封面图工作流程，之后可按界面修改名称</p></div></div><div class="bottom-note"><b>此刻举手</b><span>请已经在「已安装」找到技能的同学举手，同桌协助还没找到的人</span></div>',
    foot:'保存成功需要从「已安装」重新找到', notes:'4 分钟，要求学员离开创建对话重新读取技能列表，讲师统计完成组数，未完成组先停在技能页继续排查'
  },
  {
    chapter:'复用验证', title:'开新任务调用 Skill', minutes:7, theme:'blue', layout:'prompt',
    html:L('11 / 第二次交付','换一个主题，再用一次','新任务能按相同规则做图，才说明 Skill 真能复用')+'<div class="split prompt-layout"><div class="steps light">'+S('01','点「新建任务」','不要继续刚才创建技能的对话，新任务更能检验调用是否成功')+S('02','选择已安装技能','在输入框附近选择「我的封面图助手」，或在任务指令里明确点名调用')+S('03','粘贴新主题指令','公共练习用「社区亲子阅读日」，也可以替换为自己的第二个真实主题')+S('04','发送并查看产物','观察是否先按技能规则核对输入，再生成图，并说明下载位置与检查项')+'</div><div class="prompt-box"><div class="prompt-head"><span>复用指令 · 第二个主题</span><button type="button" data-copy="reusePrompt">复制复用指令 ↗</button></div><pre data-prompt-preview="reusePrompt"></pre></div></div>',
    foot:'新任务里调用，是本课最关键的完成标准', notes:'7 分钟，讲师再次投影新建任务，从输入框选择技能，若界面无法明显选择就通过明确点名调用并查看任务执行过程，强调不能只在原对话里继续做第二张'
  },
  {
    chapter:'复用验证', title:'对照两张图检查复用', minutes:7, theme:'paper', layout:'compare',
    html:L('12 / 复用验收','比较第一次与第二次','不是看两张图长得一样，而是看工作规则有没有被重复执行')+'<div class="compare-table"><div class="thead"><span>检查项</span><span>第一张 · 读书分享会</span><span>第二张 · 亲子阅读日</span></div><div><b>标题</b><span>把阅读带回日常</span><span>一起读，慢慢长大</span></div><div><b>工作步骤</b><span>先明确用途与画幅</span><span>仍先核对主题、受众与画幅</span></div><div><b>交付内容</b><span>真实图片文件与下载位置</span><span>真实图片文件与下载位置</span></div><div><b>质量检查</b><span>文字、裁切、事实、清晰度</span><span>同样检查文字、裁切、事实、清晰度</span></div></div><div class="proof-grid"><div><b>通过</b><strong>规则被复用</strong><p>第二次任务先核对输入，再交付图片文件与下载位置，并提醒人工检查</p></div><div><b>部分完成</b><strong>能力暂时受限</strong><p>Skill 按规则工作，但当前模型不能生图，保留技能并按提示切换能力后重试</p></div><div><b>需要重试</b><strong>结果没有按规则来</strong><p>回输入框明确选择 Skill，让它先列出工作步骤，再重新执行第二张图</p></div></div><div class="checklist" id="reuse-checks"><label><input type="checkbox" data-check="installed"> 在已安装找到 Skill</label><label><input type="checkbox" data-check="invoked"> 新任务明确调用 Skill</label><label><input type="checkbox" data-check="image"> 第二张图已生成并核对</label><strong id="reuse-result">完成 0 / 3 项</strong></div>',
    foot:'换主题后规则仍在，这才是技能带来的效率', notes:'7 分钟，让同桌互相看两张图与任务过程，勾选是学员自检，不代表网站能读取 WorkBuddy 内部状态，要求真实打开第二张图检查文字与画幅'
  },
  {
    chapter:'排障', title:'卡住时怎么继续', minutes:6, theme:'paper', layout:'troubleshoot',
    html:L('13 / 现场排障','四种最常见的卡点','遇到问题先判断发生在哪一步，再做一个最小修正')+'<div class="trouble-grid"><div><b>01</b><strong>只给文字，没有图片</strong><p>检查当前模式或模型是否支持生图，明确要求生成图片文件，必要时切换到带图片能力的模型或设计入口</p></div><div><b>02</b><strong>图片中文字有错</strong><p>复制修图指令再试，仍不准就要无字背景，准确标题在排版工具里叠加</p></div><div><b>03</b><strong>技能没进「已安装」</strong><p>回创建对话，检查是否还差保存或安装动作，重新进入技能列表核对</p></div><div><b>04</b><strong>新任务没按技能规则做</strong><p>在输入框明确选择该技能，或点名「调用我的封面图助手」，让它先列出将遵守的步骤再执行</p></div></div><div class="bottom-note"><b>安全提醒</b><span>单位保密材料、个人信息、未授权人物照片先不要上传，课堂用公开或自拟素材</span></div>',
    foot:'任何一步卡住，都保留已写好的需求与指令', notes:'6 分钟，按实际现场问题选择讲哪几项，图片能力可能受账号、模型、额度和产品版本影响，不承诺所有学员现场一定能生图，保留技能规则与指令便于课后继续'
  },
  {
    chapter:'展示', title:'同桌展示我的 Skill', minutes:4, theme:'blue', layout:'showcase',
    html:L('14 / 两人互检','用 60 秒展示你的成果','把屏幕转给同桌，不用讲术语，只说明你让它做了什么、结果在哪里')+'<div class="showcase-columns"><div><span>操作人展示</span><strong>我做的封面图 Skill</strong><ol><li>这张图用于什么场景</li><li>我的 Skill 保存了哪些固定规则</li><li>第二张图如何从新任务调用出来</li></ol></div><div><span>同桌提问</span><strong>我来帮你验收</strong><ol><li>能找到图片文件并打开吗</li><li>标题有没有错字或虚构信息</li><li>换主题之后，规则还在吗</li></ol></div></div><div class="showcase-footer">每人 60 秒展示 + 60 秒互问，没做完的人展示当前做到哪一步与下一步</div>',
    foot:'成果可以是已完成 Skill，也可以是明确的未完成步骤', notes:'4 分钟，先让 A 展示 60 秒，B 提问 60 秒，再交换，时间不足时每组只挑一个关键问题，讲师请一组用 30 秒分享最有用的规则'
  },
  {
    chapter:'收束', title:'下次自己也能做', minutes:3, theme:'paper', layout:'closing',
    html:'<div class="closing-label">90 MIN / TAKE AWAY</div><h2 class="kinetic closing-title">从今天起，<br><em>把重复的做法<br>变成自己的 Skill</em></h2><div class="closing-bottom"><div><b>1</b><span>先做一次真实任务</span></div><div><b>2</b><span>把有效规则写清楚并保存</span></div><div><b>3</b><span>换主题，在新任务里验证</span></div></div><p class="closing-cta">今天带走：一张封面图 + 一个封面图 Skill + 一套验收方法</p>',
    foot:'课后可以把同样方法用在通知图、课程图、文章图', notes:'3 分钟，回顾今天的三步，提醒学员保存图片和技能名称，课后若因账号或图片能力未完成，可按课件入口和复制指令继续'
  }
];