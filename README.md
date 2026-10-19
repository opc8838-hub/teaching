# AI 会聊天，也能办事

给约 30 位零基础职场学员准备的 90 分钟互动课。全站是一张网页，包含 31 个全屏章节；滚轮、触摸上滑、方向键或页面底部按钮每次切换一屏。视觉参考用户提供的薄荷绿/深海军蓝界面。

## 课程内容

- 从真实的会议记录引入，解释聊天机器人、Agent、Skill，以及豆包、元宝、WorkBuddy 这些产品与能力名称的关系。
- 用对比表、情境选择和任务说明四要素，帮助学员判断何时聊天、何时交代任务、何时保存方法。
- 两人一组在 WorkBuddy 中处理材料 A，核对事实、创建“会议纪要与待办整理”Skill，再用材料 B 在新任务中调用和验收。
- 找出 AI 擅自补写的两处信息，完成三道判断题。练习记录为虚构材料。

全站每屏都有讲师备注、建议用时和课堂动作，合计 90 分钟。按 **N** 键或点右上角“讲师备注”查看。讲师可用右上角“全部页面”直达任一屏；远距离跳页立即定位，日常翻页带逐屏过渡。标题有逐字入场、模糊消散与位移动效，封面曲线有描绘动效；尊重系统的“减少动态效果”设置。

## 课堂准备

提前确认投影、网络、WorkBuddy 账号和 Skill 创建入口可用。建议 15 组，每组两人：一人操作，一人按原始材料验收，中途交换。若产品入口或名称变化，以当时界面为准；网站中的复制按钮提供完整练习材料和指令，真正的 Skill 需在学员自己的 WorkBuddy 账号里创建。

## 使用与发布

直接打开 [在线课件](https://opc8838-hub.github.io/teaching/)。键盘支持 ↑ / ↓、PageUp / PageDown、空格、Home / End；手机可上滑或点击底部箭头。页面只有一个文档，进度与 URL 锚点随当前屏更新。

这是零依赖静态网站。可直接打开 `index.html`；复制按钮建议通过 localhost 或 HTTPS 使用。推送到 `main` 后，GitHub Actions 自动发布 `index.html`、`styles.css`、`content.js` 和 `app.js` 到 GitHub Pages。

## 设计与动效来源

界面按 `oil-ui-pro 0.10.0` 的视觉与交互方法设计。文字逐字揭示、层级过渡和曲线描绘参考 [Transitions.dev](https://github.com/Jakubantalik/transitions.dev) 的动效思路，使用本站的 CSS 与 JavaScript 实现，并提供减少动态效果支持。Transitions.dev © Jakub Antalik，见其 [LICENSE](https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE)。

## 资料

- [WorkBuddy 简介](https://www.workbuddy.cn/docs/workbuddy/Overview)
- [WorkBuddy 技能说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)
