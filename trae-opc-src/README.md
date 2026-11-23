# TRAE Friends · OPC Talk 课件源文件

这场演讲于 2026-11-22 举行，课件共 42 页。GitHub Pages 的发布流程不包含本目录。

在本目录设置 `PYTHONIOENCODING=utf-8`（PowerShell 中运行 `$env:PYTHONIOENCODING = 'utf-8'`），依次运行 `python build_act1.py` → `python build_act34.py` → `python build_all.py`，输出在 `../trae-opc/`。
脚本使用绝对路径 `E:/碳基/_deploy/teaching/trae-opc`，换电脑要先改路径。合成时会读取仓库已有的 `../trae-opc/preview.html`。
运行 `python build_script.py` 可生成排练讲稿（需安装 `python-docx`）。

- `build_act1.py` 生成第一幕「我是谁」的 `act1.html`。
- `build_act34.py` 生成第三幕「把自己做成资产」与第四幕「硅基领导力」的 `act34.html`。
- `build_all.py` 从分幕页、样板和旧版模板合成四幕课件 `index.html`。
- `build_preview.py` 用提交统计和案例数据生成早期样板 `preview.html`，页首和页尾来自当时的临时目录。
- `build_script.py` 生成 Word 与纯文本排练稿，含逐页口播、操作提示和累计时间。
- `record_slide.py` 逐帧推进指定页的动画，调用 FFmpeg 输出 MP4。
- `shoot.py` 用 Playwright 按指定视口逐页截图并记录页面错误。
- `_shoot4.py` 在两种分辨率下抽查第 8、27、28、42 页的溢出并截图。
- `_shoot1122.py` 检查作品墙和 CardBot 相关页，截图并读取 CardBot 全屏视频的播放和静音状态。
- `PLAN_v0.4.md` 盘点素材并安排面向 200 多人演讲的四幕结构。
- `OUTLINE_v0.1.md` 记录 23 页初稿的页序、时间和互动安排。
- `OUTLINE_v0.2.md` 记录 31 页修订稿，增加构建过程、UI 交互及逐页讲稿。
- `OUTLINE_v0.3.md` 记录四幕重规划前的 28 页定稿及 hely.fun 现场演示安排。
- `HIGHLIGHTS_v1.md` 汇总早期课件各页的亮点和素材来源。
- `HANDOFF.md` 记录构思阶段的活动背景、已核实事实、拟定结构和待补内容。
- `codex_build_prompt.md` 保存早期 28 页网页课件的素材、交互实现与自检要求。
- `notes_dump.txt` 保存从课件提取的逐页备注、章节和建议时长。
- `讲稿_排练版_1121.docx` 是 11 月 21 日排练稿的 Word 版。
- `讲稿_排练版_1121.txt` 是同一排练稿的纯文本版。
- `tpl/` 存放通用页首和页尾、封面、自我介绍、珠江课件移植页及旧版课件模板。
- `capture/` 存放 hely.fun 公开页面截图和交互录屏、餐饮案例 JSON、每日提交数，以及录制、登录、会话摘取与缩略图脚本。
