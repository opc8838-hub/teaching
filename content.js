/* All 31 screens live in one document. Short on-screen copy is paired with
   speaker notes so the class can stay readable on a projector. */
window.lessonAssets = {
  notesA: '活动筹备会，10 月 12 日。\n大家讨论下个月办一场分享活动，具体日期还没确定。王老师说下周带来两个场地候选方案。宣传文案周五前要出初稿。物料清单还需要有人认领，李老师说先把要买的东西列出来，负责人下次会上再定。',
  notesB: '培训筹备会，10 月 18 日。\n下个月计划办一次新员工培训，日期待定。陈老师负责收集报名问题，周三前整理第一版。培训资料需要更新，但负责人还没确定。小周建议安排一个现场问答环节，是否采用还要讨论。',
  taskPrompt: '请根据下面的会议记录，整理一份简明会议纪要和待办表。\n\n要求：\n1. 只依据原始记录，不猜测活动日期、负责人或截止时间。\n2. 区分“已经决定”和“仍在讨论”。\n3. 待办表包含事项、负责人、截止时间；缺失的信息写“待确认”。\n4. 最后列出需要继续确认的问题。\n5. 语言简洁，便于复制进办公文档。\n\n会议记录：\n活动筹备会，10 月 12 日。\n大家讨论下个月办一场分享活动，具体日期还没确定。王老师说下周带来两个场地候选方案。宣传文案周五前要出初稿。物料清单还需要有人认领，李老师说先把要买的东西列出来，负责人下次会上再定。',
  skillPrompt: '请创建一个名为“会议纪要与待办整理”的 Skill。\n\n用途：把零散会议记录整理成简明纪要和待办表。\n\n工作规则：\n1. 仅依据用户提供的会议材料，不补充未经确认的事实。\n2. 区分已确定事项、讨论建议和待确认事项。\n3. 待办表固定包含“事项、负责人、截止时间”三列；缺失内容写“待确认”。\n4. 单列需要继续确认的问题。\n5. 输出清楚、简洁，适合单位日常办公。\n\n请先展示这个 Skill 的使用说明，让我检查后再保存。',
  reusePrompt: '请调用我保存的“会议纪要与待办整理” Skill，处理下面这份新记录。完成后请显示纪要、待办表和待确认问题。\n\n培训筹备会，10 月 18 日。\n下个月计划办一次新员工培训，日期待定。陈老师负责收集报名问题，周三前整理第一版。培训资料需要更新，但负责人还没确定。小周建议安排一个现场问答环节，是否采用还要讨论。'
};

window.lessonSlides = [
  {
    chapter:'开场', title:'AI 会聊天，也能办事', theme:'mint', layout:'cover', footer:'今天的目标：听懂、做出、带走。',
    html:'<div class="cover-copy"><div class="eyebrow">一堂给普通人的 AI 实用课 <span class="small-dot"></span> 90 MIN</div><h1 class="kinetic display-title">AI 会聊天，<br><em>也能办事。</em></h1><p class="reveal lead">Agent、Skill 到底是什么？<br>90 分钟，亲手做一个会整理会议的小帮手。</p><span class="cover-micro">35—45 岁职场 · 零基础 · 两人一组</span></div><div class="cover-dashboard"><div class="dash-label"><span>今日学习路线</span><span>01 / 03</span></div><div class="dash-big">CHAT <span>→</span><br>AGENT <span>→</span><br>SKILL</div><svg class="wave" viewBox="0 0 560 120" aria-hidden="true"><path d="M0 76 C55 76 60 45 108 52 S180 103 226 78 S292 20 340 44 S410 101 460 66 S515 30 560 44" fill="none" stroke="#b8e9d0" stroke-width="2"/><path d="M0 88 C60 88 74 60 123 65 S184 112 235 90 S306 32 356 56 S423 114 475 81 S529 48 560 58" fill="none" stroke="#5d978b" stroke-width="1"/></svg><div class="dash-bottom"><span>会提问</span><span>会交代任务</span><span>会保存方法</span></div></div>',
    notes:'开场不要讲技术。请大家先想一件最近重复做过、又有点烦的工作。告诉学员：今天结束时，每组会完成一个可复用的会议整理 Skill。'
  },
  {
    chapter:'开场', title:'这节课带走什么', theme:'paper', layout:'three-outcomes', footer:'完成标准：在新任务中再次调用自己的 Skill。',
    html:'<div class="slide-intro"><span class="eyebrow">学习成果</span><h2 class="kinetic">离开教室时，<br><em>你会这三件事。</em></h2></div><div class="outcome-list"><div class="outcome"><b>01</b><strong>讲得清</strong><p>聊天机器人、Agent、Skill 各自做什么。</p></div><div class="outcome"><b>02</b><strong>做得出</strong><p>用 WorkBuddy 完成一个会议整理任务。</p></div><div class="outcome"><b>03</b><strong>用得回</strong><p>把方法存成 Skill，换份材料再试一次。</p></div></div>',
    notes:'让学员选一个自己最在意的收获。口头约定：会说概念不算完成，第二次调用技能并检查结果才算完成。'
  },
  {
    chapter:'开场', title:'从一份杂乱记录开始', theme:'paper', layout:'story', footer:'相同材料，试试看 AI 能帮到哪一步。',
    html:'<div class="story-head"><span class="eyebrow">真实任务</span><h2 class="kinetic">会开完了。<br><em>记录还乱着。</em></h2><p class="reveal">日期没定、负责人没定、宣传文案要在周五前出。现在你要发一份清楚的纪要。</p></div><div class="raw-note"><div class="raw-top"><span>活动筹备会 / 10 月 12 日</span><span>未整理</span></div><p>“下个月想办分享活动……王老师下周给场地方案……宣传文案周五前出初稿……物料清单李老师先列一列，谁负责下次再说……”</p><div class="raw-foot">问题：哪些是决定？哪些仍需确认？</div></div>',
    notes:'可请一位学员读这段口语化记录，再问全班：如果直接发出去，最容易造成什么误会？此处为后面的验收埋伏笔。'
  },
  {
    chapter:'开场', title:'从回答走向交付', theme:'dark', layout:'statement', footer:'衡量 AI 的价值，要看结果能否检查、能否复用。',
    html:'<div class="statement-top"><span>一个转变</span><span>CHAT → WORK</span></div><h2 class="kinetic statement-title">从“它能回答什么”<br>走向<em>“它替我完成了什么”</em></h2><div class="statement-bottom"><div><strong>回答</strong><p>得到一段建议或文字。</p></div><div class="statement-arrow">→</div><div><strong>交付</strong><p>得到纪要、待办表，并能对照原文验收。</p></div></div>',
    notes:'强调聊天也是有用的，只是任务复杂时需要进一步明确目标、步骤和交付物。这里不把具体产品硬分成“只会聊”和“只会做”。'
  },
  {
    chapter:'认识概念', title:'先看清四个层次', theme:'mint', layout:'layers', footer:'产品名与能力名，不在同一个层次。',
    html:'<div class="slide-intro"><span class="eyebrow">概念地图</span><h2 class="kinetic">先看清<br><em>四个层次。</em></h2></div><div class="layer-list"><div><span>底层能力</span><strong>大模型</strong><small>理解与生成文字、图片等内容</small></div><div><span>使用入口</span><strong>产品</strong><small>豆包、元宝、WorkBuddy 等</small></div><div><span>办事方式</span><strong>Agent</strong><small>围绕目标安排步骤、使用工具</small></div><div><span>复用方法</span><strong>Skill</strong><small>把某种任务的做法保存下来</small></div></div>',
    notes:'这里最重要的是“产品名”和“能力名”不能直接比较。豆包是产品，Agent 是做事机制；同一个产品里也可能同时提供聊天与 Agent 能力。'
  },
  {
    chapter:'认识概念', title:'聊天机器人是什么', theme:'paper', layout:'chat-layout', footer:'擅长解释、讨论、改写和快速给建议。',
    html:'<div class="slide-intro"><span class="eyebrow">CHATBOT</span><h2 class="kinetic">聊天机器人：<br><em>你问，它答。</em></h2><p class="reveal">你补一轮，它再改一轮。对话是最熟悉的使用方式。</p></div><div class="chat-demo"><div class="chat-bubble user">请帮我整理这份会议记录。</div><div class="chat-bubble ai"><span>AI 回复</span><p>本次会议讨论了活动日期、场地方案、宣传文案与物料准备……</p></div><div class="chat-tag">输出常常是一段对话文字</div></div>',
    notes:'现场请一位学员说说用豆包或元宝最常问什么。提醒大家：聊天机器人也可以处理文件、搜索资料，具体能力取决于产品与版本。'
  },
  {
    chapter:'认识概念', title:'Agent 是什么', theme:'dark', layout:'agent-layout', footer:'关键不是“自动”，而是目标、授权范围与可验收结果。',
    html:'<div class="slide-intro"><span class="eyebrow">AGENT</span><h2 class="kinetic">智能体：<br><em>你给目标，它推进任务。</em></h2><p class="reveal">在你授权的范围里，它拆步骤、调用工具、检查进度，再交付成果。</p></div><div class="agent-visual"><div class="agent-core">GOAL<span>整理会议<br>并交付待办</span></div><div class="agent-steps"><span>01 读取材料</span><span>02 识别决定</span><span>03 整理文件</span><span>04 交付验收</span></div></div>',
    notes:'Agent 不是神奇的“全自动员工”。它能做什么，受工具、权限和材料影响。任务结果仍由人验收。'
  },
  {
    chapter:'认识概念', title:'Agent 的工作循环', theme:'paper', layout:'flow-layout', footer:'任务越长，越要设置检查点。',
    html:'<div class="slide-intro"><span class="eyebrow">AGENT 的四步循环</span><h2 class="kinetic">Agent 办事，<br><em>有四个步骤。</em></h2></div><div class="process-flow"><div><b>01</b><strong>理解目标</strong><p>你到底要交付什么？</p></div><i>→</i><div><b>02</b><strong>规划步骤</strong><p>先做什么，后做什么？</p></div><i>→</i><div><b>03</b><strong>使用工具</strong><p>处理文件、查找、整理。</p></div><i>→</i><div><b>04</b><strong>检查交付</strong><p>结果是否符合要求？</p></div></div>',
    notes:'请学员用自己的工作任务替换“整理会议”：例如把每周问题整理成报告。每一步都要能说出人工检查什么。'
  },
  {
    chapter:'认识概念', title:'Skill 是什么', theme:'mint', layout:'skill-layout', footer:'Skill 可以有说明、模板、参考资料，也可以包含脚本。',
    html:'<div class="slide-intro"><span class="eyebrow">SKILL</span><h2 class="kinetic">技能：<br><em>把好方法存下来。</em></h2><p class="reveal">这次告诉 AI 的规则，下次不用再从头解释。</p></div><div class="skill-card"><div class="skill-card-head"><span>会议纪要与待办整理</span><b>已保存的方法</b></div><div class="skill-card-body"><p>只依据原文</p><p>区分决定与建议</p><p>缺失信息写“待确认”</p><p>固定输出纪要、待办和问题</p></div><div class="skill-card-bottom">换一份记录，仍按同样规则处理 ↗</div></div>',
    notes:'用“常用菜谱”或“单位办文规范”类比 Skill。注意：把一段提示词粘贴一次，还没完成“可复用”；需要保存并在新任务中调用。'
  },
  {
    chapter:'认识概念', title:'Agent 与 Skill 的关系', theme:'paper', layout:'relationship', footer:'Agent 可以调用 Skill；一个 Agent 也可以用多个 Skill。',
    html:'<div class="slide-intro"><span class="eyebrow">不是二选一</span><h2 class="kinetic">Agent 负责推进。<br><em>Skill 负责做法。</em></h2></div><div class="relationship-demo"><div class="relation-agent"><span>AGENT</span><strong>把会议记录<br>变成可用文件</strong><small>确定目标、调用工具、交付结果</small></div><div class="relation-link">调用 →</div><div class="relation-skill"><span>SKILL</span><strong>会议整理规范</strong><small>字段、顺序、质量要求</small></div></div>',
    notes:'不要把 Agent 和 Skill 讲成同一级产品。一个是能推动任务的系统，一个是执行某类任务时可复用的说明与能力。'
  },
  {
    chapter:'认识概念', title:'三个概念，一张表', theme:'dark', layout:'compare-table', footer:'先说目标，再选工具；不要为了用 Agent 而用 Agent。',
    html:'<div class="slide-intro"><span class="eyebrow">30 秒区分</span><h2 class="kinetic">这三个词，<br><em>放在一起看。</em></h2></div><div class="comparison"><div class="comp-head"><span>你在问什么</span><span>聊天机器人</span><span>Agent</span><span>Skill</span></div><div><span>核心作用</span><strong>交流与生成</strong><strong>推进并交付</strong><strong>保存工作方法</strong></div><div><span>典型输入</span><strong>一个问题</strong><strong>一个目标</strong><strong>一套规则</strong></div><div><span>本课案例</span><strong>整理文字</strong><strong>产出纪要文件</strong><strong>纪要整理规范</strong></div></div>',
    notes:'让学员先看第一列“你在问什么”，再横向比较。不要把表格当作产品能力的绝对边界；它是理解三种概念的教学模型。'
  },
  {
    chapter:'认识概念', title:'豆包、元宝与工作台', theme:'paper', layout:'product-layout', footer:'不要用品牌名代替能力判断。',
    html:'<div class="slide-intro"><span class="eyebrow">产品怎么放进地图</span><h2 class="kinetic">豆包、元宝、WorkBuddy<br><em>是入口，不是概念。</em></h2></div><div class="product-list"><div><strong>豆包 / 元宝</strong><p>大家熟悉的 AI 产品。可以对话；具体功能会随版本、终端与权限变化。</p></div><div><strong>WorkBuddy</strong><p>本课选用的工作台，用来演示任务交付以及 Skill 的创建与调用。</p></div><div><strong>判断方法</strong><p>看它能否按目标调用工具、产出结果，以及能否保存可复用的工作方法。</p></div></div>',
    notes:'这一页避免“某产品只能聊天”的误解。现场只教一个平台的按钮路径，减少学员切换工具造成的负担。'
  },
  {
    chapter:'认识概念', title:'什么时候用哪一种', theme:'mint', layout:'decision-layout', footer:'先判断任务，再选择用法。',
    html:'<div class="slide-intro"><span class="eyebrow">你来判断</span><h2 class="kinetic">这件事，<br><em>该怎么交给 AI？</em></h2><p class="reveal">“每周都要按同一格式整理会议记录，还要输出待办。”</p></div><div class="choice-row" data-interaction="choice"><button type="button" data-choice="chat">只聊一次</button><button type="button" data-choice="agent">只让 Agent 做一次</button><button type="button" data-choice="skill">用 Agent 完成任务，再把做法存成 Skill</button></div><div class="choice-feedback" role="status">点一个你认为合适的做法。</div>',
    notes:'先让大家举手选，再点击揭晓。正确方向是“Agent 做任务，Skill 存方法”。如果工作任务只有一次且很简单，单次对话也足够。'
  },
  {
    chapter:'学会交代任务', title:'任务说明的四个要素', theme:'paper', layout:'formula-layout', footer:'信息不够时，让 AI 先提问或标注待确认。',
    html:'<div class="slide-intro"><span class="eyebrow">实用公式</span><h2 class="kinetic">把需求说清楚，<br><em>只要四块。</em></h2></div><div class="formula-grid"><div><b>01</b><strong>目标</strong><p>最后要得到什么？</p></div><div><b>02</b><strong>材料</strong><p>依据哪份记录或文件？</p></div><div><b>03</b><strong>规则</strong><p>哪些不能猜，怎样判断？</p></div><div><b>04</b><strong>交付</strong><p>用什么格式给我？</p></div></div>',
    notes:'让学员拿自己的任务口头套用四格。比如“整理本周值班问题，依据群里的脱敏记录，不能补数字，输出问题清单”。'
  },
  {
    chapter:'学会交代任务', title:'同一个任务，两种说法', theme:'dark', layout:'prompt-contrast', footer:'任务说得清，结果更容易验收。',
    html:'<div class="slide-intro"><span class="eyebrow">提示词对照</span><h2 class="kinetic">少说一句，<br><em>可能多改十次。</em></h2></div><div class="prompt-compare"><div class="prompt-weak"><span>含糊</span><p>“帮我整理一下会议。”</p><small>AI 不知道你要什么格式，也不知道哪些信息不能猜。</small></div><div class="prompt-good"><span>清楚</span><p>“依据原始记录，输出简明纪要与待办表。负责人、时间没写的标待确认。”</p><small>有目标、有材料、有规则、有交付。</small></div></div>',
    notes:'不要讲“神奇提示词”。强调提供可核对的材料、边界和交付格式，比堆砌身份设定更重要。'
  },
  {
    chapter:'学会交代任务', title:'90 分钟怎么走', theme:'mint', layout:'agenda-layout', footer:'实操与复用占 37 分钟，是这堂课的重心。',
    html:'<div class="slide-intro"><span class="eyebrow">课堂路线</span><h2 class="kinetic"><em>90 分钟。</em><br>从听懂到做出。</h2></div><div class="agenda-list"><div><time>00—08′</time><strong>从杂乱记录切入</strong><span>看见问题</span></div><div><time>08—23′</time><strong>聊天、Agent、Skill</strong><span>讲清概念</span></div><div><time>23—40′</time><strong>演示与任务表达</strong><span>学会交代</span></div><div class="is-emphasis"><time>40—77′</time><strong>跟做、保存、复用</strong><span>亲手实践</span></div><div><time>77—90′</time><strong>验收与测验</strong><span>带回去用</span></div></div>',
    notes:'如果前半节课超时，缩短产品介绍，保留换材料再做一次的时间。第二次调用成功是教学关键。'
  },
  {
    chapter:'动手实操', title:'实操目标', theme:'dark', layout:'workshop-start', footer:'两人一组；第一轮操作与核对，第二轮交换。',
    html:'<div class="workshop-number">01</div><div class="workshop-statement"><span class="eyebrow">进入实操 / WORKSHOP</span><h2 class="kinetic">做一个<br><em>会议整理小助手。</em></h2><p class="reveal">先做一次 → 存成 Skill → 换材料再做一次。</p></div><div class="workshop-mini"><span>平台</span><strong>WorkBuddy</strong><span>成果</span><strong>纪要 + 待办 + 待确认</strong></div>',
    notes:'现在请所有学员打开电脑。投屏演示一步，学员做一步；不要连续演示完所有步骤再让学员追赶。'
  },
  {
    chapter:'动手实操', title:'开始前准备', theme:'paper', layout:'prep-layout', footer:'只使用练习材料；单位真实文件先脱敏。',
    html:'<div class="slide-intro"><span class="eyebrow">实操前 2 分钟</span><h2 class="kinetic">准备好这三样，<br><em>就可以开始。</em></h2></div><div class="prep-list"><div><b>01</b><strong>能登录 WorkBuddy</strong><p>找到“新建任务”和“技能”入口。</p></div><div><b>02</b><strong>两人一组</strong><p>一人操作，一人对照材料核查；第二轮交换。</p></div><div><b>03</b><strong>只用虚构材料</strong><p>课堂不上传单位机密或个人敏感信息。</p></div></div>',
    notes:'如果学员登录遇到问题，先和同伴共用一台电脑，不让全班等待。讲师课前应走通所用版本的创建 Skill 入口。'
  },
  {
    chapter:'动手实操', title:'练习材料 A', theme:'mint', layout:'material-layout', footer:'先找“确定”和“待定”，再交给 AI。',
    html:'<div class="slide-intro"><span class="eyebrow">材料 A / 活动筹备会</span><h2 class="kinetic">先读材料，<br><em>不要急着复制。</em></h2></div><div class="material-paper"><div class="material-top"><strong>10 月 12 日 · 活动筹备会</strong><span>会议记录</span></div><p>下个月想办一场分享活动，具体日期还没确定。王老师下周带来两个场地候选方案。宣传文案周五前出初稿。李老师先列物料清单，负责人下次会上再定。</p><div class="material-bottom"><span>日期未定</span><span>物料负责人未定</span><button type="button" data-copy="notesA">复制材料 A ↗</button></div></div>',
    notes:'请学员用手指出两处不能擅自补写的信息：活动日期和物料负责人。确保之后所有人都用同一份材料，方便集体验收。'
  },
  {
    chapter:'动手实操', title:'第一次交代任务', theme:'paper', layout:'task-layout', footer:'运行后先看结构，再核对事实。',
    html:'<div class="slide-intro"><span class="eyebrow">第一次运行</span><h2 class="kinetic">把目标、规则、<br><em>交付一起说清。</em></h2></div><div class="task-board"><div><small>01 / 目标</small><strong>整理会议纪要和待办表</strong></div><div><small>02 / 规则</small><strong>只依据原文；缺失写“待确认”</strong></div><div><small>03 / 交付</small><strong>纪要、待办表、待确认问题</strong></div></div><button class="action-button" type="button" data-copy="taskPrompt">复制完整任务指令 <span>↗</span></button>',
    notes:'请学员在 WorkBuddy 新建任务，粘贴完整指令并运行。讲师先演示一次复制、粘贴、提交，再暂停让各组完成。'
  },
  {
    chapter:'动手实操', title:'怎样验收第一次结果', theme:'dark', layout:'audit-layout', footer:'流畅不等于准确；关键事实要回到材料核对。',
    html:'<div class="slide-intro"><span class="eyebrow">人工验收</span><h2 class="kinetic">先别急着说“不错”。<br><em>查四个地方。</em></h2></div><div class="audit-list"><div><b>01</b><p>日期有没有被 AI 擅自写死？</p></div><div><b>02</b><p>负责人有没有被 AI 猜出来？</p></div><div><b>03</b><p>“建议”有没有变成“已决定”？</p></div><div><b>04</b><p>待办表能不能直接拿来用？</p></div></div>',
    notes:'让每组用原始记录逐项核对。发现错误时不要重做整个任务，先指出具体错误，要求 AI 改正并解释依据。'
  },
  {
    chapter:'动手实操', title:'结果应该长什么样', theme:'paper', layout:'output-layout', footer:'这是一种参考结构；以原始记录和实际核对结果为准。',
    html:'<div class="slide-intro"><span class="eyebrow">参考输出</span><h2 class="kinetic">一份可用的结果，<br><em>结构要清楚。</em></h2></div><div class="output-document"><div class="output-head"><strong>活动筹备会 · 纪要</strong><span>10 月 12 日</span></div><div class="output-summary">已明确：王老师下周提供场地候选方案；宣传文案周五前出初稿。</div><div class="output-table"><span>事项</span><span>负责人</span><span>截止时间</span><span>场地方案</span><span>王老师</span><span>下周</span><span>物料清单</span><span>待确认</span><span>待确认</span></div><p>待确认：活动具体日期；物料负责人；宣传文案负责人。</p></div>',
    notes:'这页展示结构而非唯一标准答案。原记录没有说宣传文案负责人，因此也要标待确认。提醒大家区分会议日期和活动日期。'
  },
  {
    chapter:'动手实操', title:'把方法保存成 Skill', theme:'mint', layout:'save-layout', footer:'保存前，先读一遍平台生成的使用说明。',
    html:'<div class="slide-intro"><span class="eyebrow">第二步 / 保存方法</span><h2 class="kinetic">一次讲清楚，<br><em>以后直接调用。</em></h2></div><div class="save-route"><div><span>01</span><strong>打开“技能”</strong><small>找到添加技能入口</small></div><i>→</i><div><span>02</span><strong>选择“创建技能”</strong><small>描述你要保存的做法</small></div><i>→</i><div><span>03</span><strong>检查后保存</strong><small>先核对规则，再完成创建</small></div></div><div class="save-actions"><button class="action-button" type="button" data-copy="skillPrompt">复制技能创建说明 <span>↗</span></button><a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market" target="_blank" rel="noopener noreferrer">查看官方说明 ↗</a></div>',
    notes:'WorkBuddy 官方文档提供“技能”与“创建技能”路径；界面可能更新，授课前用实际账号确认。不要让学员手写技术文件，用自然语言说明任务即可。'
  },
  {
    chapter:'动手实操', title:'一个好 Skill 需要什么', theme:'paper', layout:'skill-spec', footer:'规则写到足以复用；不要堆不相关的人设。',
    html:'<div class="slide-intro"><span class="eyebrow">技能说明书</span><h2 class="kinetic">好的 Skill，<br><em>有清楚的边界。</em></h2></div><div class="spec-sheet"><div><span>名字</span><strong>会议纪要与待办整理</strong></div><div><span>何时使用</span><strong>收到零散会议记录时</strong></div><div><span>工作规则</span><strong>仅依据原文；区分决定与建议</strong></div><div><span>固定交付</span><strong>纪要、待办表、待确认问题</strong></div><div><span>遇到缺失</span><strong>写“待确认”，不要猜</strong></div></div>',
    notes:'请各组检查平台生成的 Skill 是否包含五项，尤其“遇到缺失”这一条。若缺失，继续对话补充规则再保存。'
  },
  {
    chapter:'动手实操', title:'练习材料 B', theme:'dark', layout:'material-layout', footer:'换材料，是为了验证“复用”真的发生。',
    html:'<div class="slide-intro"><span class="eyebrow">材料 B / 培训筹备会</span><h2 class="kinetic">换一份记录，<br><em>规则还能用吗？</em></h2></div><div class="material-paper dark-paper"><div class="material-top"><strong>10 月 18 日 · 培训筹备会</strong><span>新任务</span></div><p>下个月计划办新员工培训，日期待定。陈老师周三前整理报名问题。培训资料需要更新，负责人未定。小周建议安排现场问答，是否采用还要讨论。</p><div class="material-bottom"><span>日期待定</span><span>问答未决定</span><button type="button" data-copy="notesB">复制材料 B ↗</button></div></div>',
    notes:'这一轮请两人交换角色。先不要直接用旧对话，必须新建任务，才能证明技能已经保存并能被调用。'
  },
  {
    chapter:'动手实操', title:'第二次调用与检查', theme:'mint', layout:'reuse-layout', footer:'第二次调用成功，才算真正学会。',
    html:'<div class="slide-intro"><span class="eyebrow">新任务 / 调用技能</span><h2 class="kinetic">这一次，<br><em>让 Skill 带着规则来。</em></h2></div><div class="reuse-checklist"><label><input type="checkbox" data-check="reuse-1"><span>已在新任务中调用保存的 Skill</span></label><label><input type="checkbox" data-check="reuse-2"><span>得到了纪要、待办表、待确认问题</span></label><label><input type="checkbox" data-check="reuse-3"><span>核对了日期、负责人和“建议”</span></label></div><button class="action-button" type="button" data-copy="reusePrompt">复制第二次任务指令 <span>↗</span></button><div class="reuse-result" id="reuse-result" role="status">完成三项检查后，告诉同伴你发现了什么。</div>',
    notes:'走到每组旁边看实际输出。询问“现场问答是否已经决定？”正确答案是尚未决定。鼓励学员修正 Skill 规则，而不是只修正这次输出。'
  },
  {
    chapter:'动手实操', title:'找出两处 AI 擅自补写', theme:'paper', layout:'find-error', footer:'关键日期、人名、数字，永远回到原始材料核对。',
    html:'<div class="slide-intro"><span class="eyebrow">全班一起找错</span><h2 class="kinetic">这份结果里，<br><em>有两处不能信。</em></h2></div><div class="error-document"><div class="error-top">活动筹备会 / AI 整理后的待办</div><p>活动确定于 <button type="button" class="error-token" data-error="date">11 月 15 日</button> 举办。物料清单由 <button type="button" class="error-token" data-error="owner">李老师负责</button>。场地方案由王老师下周提供，宣传文案周五前出初稿。</p><div class="error-feedback" role="status">点击两处被 AI 擅自补上的信息。</div></div>',
    notes:'第一次点击后不要马上揭晓第二处，让全班再看一次原文。最终结论：活动日期未定，李老师只是先列物料，物料负责人尚未定。'
  },
  {
    chapter:'复盘', title:'判断题一', theme:'dark', layout:'quiz-layout', footer:'判断时先看：品牌名还是能力名？',
    html:'<div class="quiz-number">01 / 03</div><h2 class="kinetic">豆包、元宝是产品名；<br>一个产品可能同时提供<br><em>聊天和 Agent 能力。</em></h2><div class="quiz-options" data-quiz="1"><button type="button" data-answer="correct">对</button><button type="button" data-answer="wrong">错</button></div><div class="quiz-feedback" role="status">请选择你的判断。</div>',
    notes:'正确答案是“对”。各产品具体能力会随版本变化，因此不要把品牌和能力类型画上等号。'
  },
  {
    chapter:'复盘', title:'判断题二', theme:'mint', layout:'quiz-layout', footer:'Skill 的关键是保存并在新任务里复用。',
    html:'<div class="quiz-number">02 / 03</div><h2 class="kinetic">把一段提示词发给 AI，<br>就已经拥有一个<br><em>可复用的 Skill。</em></h2><div class="quiz-options" data-quiz="2"><button type="button" data-answer="wrong">对</button><button type="button" data-answer="correct">错</button></div><div class="quiz-feedback" role="status">请选择你的判断。</div>',
    notes:'正确答案是“错”。一次性提示词可以是 Skill 的原料，但需要按平台机制保存并在新任务里再次调用。'
  },
  {
    chapter:'复盘', title:'判断题三', theme:'paper', layout:'quiz-layout', footer:'AI 是帮手；你负责最后的事实把关。',
    html:'<div class="quiz-number">03 / 03</div><h2 class="kinetic">AI 写出记录里<br>没有的负责人，<br><em>你怎么处理？</em></h2><div class="quiz-options wide" data-quiz="3"><button type="button" data-answer="wrong">直接发出去，文字看起来很完整</button><button type="button" data-answer="correct">改为“待确认”，对照原文核实</button></div><div class="quiz-feedback" role="status">请选择你的判断。</div>',
    notes:'正确答案是核实后标注待确认。把核查做成工作习惯：日期、人名、数字、结论都要回到来源。'
  },
  {
    chapter:'复盘', title:'明天就用一次', theme:'dark', layout:'closing', footer:'今天带走一个任务、一套方法，以及核实结果的习惯。',
    html:'<div class="closing-label">课程结束 / 从明天开始</div><h2 class="kinetic">一个任务。<br>一个方法。<br><em>一次认真验收。</em></h2><p class="reveal">选一件你下周还会重复做的工作，<br>用今天的四要素重新交代给 AI。</p><div class="closing-links"><a href="https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market" target="_blank" rel="noopener noreferrer">WorkBuddy 技能说明 ↗</a></div>',
    notes:'请每个人写下明天要试的一个任务，不要求复杂。课程收束到三个动作：明确任务、复用方法、核实结果。'
  }
];

window.lessonGuide = [[1,"请学员说出一件每周都会重复处理的小事；把答案留到结尾再回看。"],[2,"请全班复述今天的完成标准：新材料里成功调用一次自己保存的 Skill。"],[2,"让一位学员读原始记录，问“你敢把它原样发给同事吗？为什么？”"],[2,"现场指出纪要、待办表和待确认问题是三个可检查的交付物。"],[2,"请学员给“豆包”和“Skill”分别找一层，避免把产品名与能力名混为一谈。"],[2,"请大家举一个今天已经用聊天机器人完成的小任务，如改写通知。"],[2,"用“整理这份会议记录”解释目标、步骤、工具与结果，不必讲技术架构。"],[2,"让学员按四步口头复述：明确目标、规划、使用工具、检查结果。"],[2,"举例：每周会议纪要要按同样格式处理，保存规则后下次不用重写。"],[2,"问“Agent 会做事，那 Skill 会做什么？”引导回答：提供可调用的做法。"],[3,"请两人一组对照表格说出三者的输入、动作和结果各是什么。"],[3,"强调豆包、元宝是产品入口；是否具备智能体或技能能力，要看具体功能和版本。"],[2,"让学员选：解释一个名词、完成一份纪要、每周反复整理纪要分别用什么。"],[3,"四要素分别对应：要做什么、依据什么、遵守什么规则、交付成什么样。"],[3,"先读含糊说法，再请学员指出缺少的依据、边界与输出格式。"],[2,"介绍时间安排；提醒 30 人按两人一组，遇到界面不同先找同桌讨论。"],[2,"展示最终成果：一份纪要、一张待办表、一个可复用的 Skill。"],[3,"确认账号和网络；请每组一人操作、一人负责对照原文验收，后半程交换。"],[2,"请学员复制材料 A；让大家用笔圈出日期、负责人、截止时间的缺口。"],[7,"两人一组复制完整指令到 WorkBuddy，粘贴材料 A，运行并保存第一版结果。"],[4,"让验收者逐行对照原文；凡没有依据的具体日期或负责人，都改为“待确认”。"],[3,"对照版式示例检查是否有纪要、待办表和待确认问题三部分。"],[8,"演示把刚才有效的做法写成 Skill；学员在自己账号中创建并保存。"],[4,"同桌互看 Skill 规则：输入是什么，固定输出什么，缺失信息怎样处理。"],[2,"复制材料 B；先猜这次哪些字段会是“待确认”，再运行。"],[8,"在新任务中调用自己保存的 Skill，三项检查表逐项勾选；交换操作者。"],[4,"先让大家独立点出两处错误，再说明：模型流畅不代表事实准确。"],[2,"全班作答后请一位学员解释“产品名”和“能力类型”的区别。"],[2,"强调保存规则不等于验证复用；必须换一份新材料再调用。"],[2,"请学员说出遇到缺失字段时该怎么写，以及下一步找谁确认。"],[2,"每人写下明天会再次使用的一个具体任务，并带走今天的四要素模板。"]];
