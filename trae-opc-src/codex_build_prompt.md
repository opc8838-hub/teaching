你要做一份网页交互课件（中文），给一场 10–20 人的线下分享用：TRAE Friends · OPC Talk，主讲人讲自己一个人 + AI 搭建生图网站 hely.fun 的经过。主讲人不是程序员，课件文字要大白话、短句。

## 必读（按顺序）
1. 定稿大纲：E:\claude工作区\trae-opc-talk\OUTLINE_v0.3.md —— 28 页的页序、标题、屏幕内容、时长，以它为准。
2. 讲稿备注来源：E:\claude工作区\trae-opc-talk\OUTLINE_v0.2.md —— 每页"讲稿"一段写进该页 data-notes（页码与 v0.3 不同，按标题对应；v0.2 里的 ⚠️ 待确认内容一律不要放进课件，v0.3 顶部"这一版定下来的事"表格优先）。
3. 风格和框架模板：E:\碳基\_deploy\teaching\zhujiang\（index.html + course.css + course-v2.css + course-v3.css + course.js + details.js）。线上效果 https://opc8838-hub.github.io/teaching/zhujiang/ 。先通读 index.html 里几种页面写法（封面、放片页、可点开卡片、现场互动页如"数一数接手次数""找错：验收练习"、金句页、答疑页）和 course.js 的翻页/备注/目录/全屏/fit 逻辑。

## 产出
- 目录：E:\碳基\_deploy\teaching\trae-opc\ 。复制 zhujiang 的 css/js 过来复用，写新的 index.html；需要新样式就新建 talk.css / talk.js。不要改 zhujiang 目录里的任何文件。
- 每页 `<section class="slide" data-chapter data-title data-minutes data-notes>`，左上 kicker 写"00 / 开场"这种格式。保留 → / 空格翻页、N 备注、M 目录、F 全屏。
- 顶部品牌区改成 hely.fun / TRAE Friends · OPC Talk。
- 只在本地做：不要 git push、不要部署、不要改 E:\hely.fun\helyfun 仓库里的任何文件、不要登录 hely.fun。

## 素材
已经准备好、放在 trae-opc\img\ 里的（先检查能用再用，不合适可以重做）：
- img\animals\ 60 只动物头像（来自 E:\hely.fun\helyfun\public\avatars）
- img\wall\ 37 张案例图（做第 8 页图墙）
- img\case_dish.jpg（第 9 页"填一填"候选案例图）
- img\five_raw.jpg（第 22 页找错题面，无标注）、img\five_marked.jpg（揭晓，带标注）、img\five_v6v7.jpg（第 23 页 v6 对 v7）、img\five_v7_a.jpg / five_v7_b.jpg（v7 成品）
- img\shot_home / shot_plaza / shot_login / shot_recharge / shot_five / shot_five_gray / shot_five_orig .jpg（hely.fun 备用截图）
- img\me.jpg、img\wechat.jpg（主讲人照片、微信二维码）

还需要你做的：
- 开场片：E:\动物\hely整片_v5_iMac27.mp4（26 秒，18MB）→ 用 E:\视频拆解\tools\ffmpeg.exe 转成 H.264、1920 宽、crf 23 左右、-movflags +faststart，放 media\，另抽一帧当 poster。
- 第 5 页的长英文提示词、第 9 页案例的表单字段：从 E:\hely.fun\helyfun\data\hely-cases.json 里找（第 9 页要和 case_dish.jpg 是同一个案例；如果对不上就换一个变量清楚的餐饮/海报类案例，同时换图，图在 E:\hely.fun\helyfun\public\cases 下）。只读不改。
- 事实数据全部以大纲为准（377 次提交、65 天、4.8 万行、7.8 万行、1689 个案例、8 个 Skill、每月提交 5月64/6月102/7月133/8月22/9月1/10月32/11月约23、时间线节点、模型分工表、五联图 v4–v7、两次翻车经过）。不要编新数字。

## 重点页面的交互要求
- 第 2 页放片：点画面播放，和 zhujiang"开场一分钟"一样。
- 第 6 页：七个灰格，点一下收成"选 → 填 → 生成"三个亮格。
- 第 7 页：一张卡片可翻面（正面表单、背面 agent_schema 风格的 JSON）。
- 第 8 页：图墙 + 计数器从 24 滚到 1689。
- 第 9 页"填一填"：案例图上叠可点亮的框，最后一个按钮揭晓表单。
- 第 11 页：时间线节点可点开看说明 + 每月提交柱状图。
- 第 12 页"数一数"：点一下翻一张角色牌，计数器加一，最后一下全部盖上"我 + AI"。
- 第 13 页：6 张可点开的卡（可用 details.js 那套弹窗）。
- 第 17 页现场演示路线：8 个步骤，每步一个按钮 target=_blank 打开对应 hely.fun 页面（首页 https://hely.fun/ 、场景广场 https://hely.fun/?menu=plaza-open#cases 、登录 https://hely.fun/login 、充值 https://hely.fun/recharge ；头像选择器和生成浮球开首页，说明里写"登录后操作"），每步旁边一句"要讲的心思"；右侧放对应备用截图，点步骤时切换。
- 第 18 页进度条：一个"开始"按钮，模拟显示"已创作 N 秒 · xx%"，进度公式 progress = min(96, round(8 + 88*(1 - exp(-t/30))))（t 为秒，可 3 倍速播放），旁边用 SVG 画出这条曲线，有一个点沿曲线走；点"完成"跳到 100%。旁边对比一个一直转圈的 spinner。
- 第 19 页：60 只头像一只只弹出、排成波浪流动。
- 第 20 页：4 个能点的对比小演示（按压缩 0.97 / 弹窗 scale(0.95)+opacity 淡入 vs scale(0) / 从按钮方向展开 / 120ms vs 600ms）。
- 第 22 页"找错"：先显示无标注长图，按钮"揭晓"切换成标注图，并列出三条问题。
- 第 24 页：按钮打开 https://hely.fun/five-panel + 三张备用截图可切换（原版 / 紫色玻璃 / 灰色玻璃）。
- 第 27 页：三格 + 30 秒倒计时（点击开始/重置）+ 备用引导问题。
- 其余页按大纲做成干净的版式；风格沿用 zhujiang（米白底、黑字、克制的强调色），不要花哨渐变。

## 自检（必须做）
- 用 Python Playwright 以 1920×1080 和 1366×768 逐页截图到 trae-opc\_check\，逐张看：不能有文字溢出、被裁、重叠、图片裂开；交互页至少点一下截一张"点开后"的状态。
- 浏览器控制台不能有报错。
- 本地预览用 python -m http.server。

## 最后汇报（中文）
列出：每页做了什么（一行一个）、用了哪些素材文件、哪些地方没把握或偷了懒、截图目录路径、本地预览方法。
