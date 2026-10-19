# AI 会聊天，也能办事

给约 30 位零基础职场学员准备的 90 分钟互动课。网站是一个文档中的 31 个全屏章节；滚轮、触摸上滑、方向键或底部按钮每次切换一屏。

## 课程内容

- 解释聊天机器人、Agent、Skill，以及豆包、元宝、WorkBuddy 这些产品与能力名称的关系。
- 用对比表、情境选择和任务说明四要素，练习判断何时聊天、何时交代任务、何时保存方法。
- 两人一组在 WorkBuddy 中处理材料 A，核对事实、创建“会议纪要与待办整理”Skill，再用材料 B 在新任务中调用和验收。
- 找出 AI 擅自补写的两处信息，完成三道判断题。练习记录均为虚构。

每屏都有讲师备注、建议用时和课堂动作，合计 90 分钟。按 **N** 或点右上角“讲师备注”查看。讲师可通过“全部页面”直达任一屏。

## 课堂准备

提前确认投影、网络、WorkBuddy 账号和 Skill 创建入口可用。建议 15 组，每组两人：一人操作，一人按原始材料验收，中途交换。产品入口或名称若有变化，以当时界面为准。网站提供练习材料和指令，Skill 需在学员自己的 WorkBuddy 账号中创建。

## 使用与发布

[在线打开课件](https://opc8838-hub.github.io/teaching/)。键盘支持 ↑ / ↓、PageUp / PageDown、空格、Home / End；手机可上滑或点击底部箭头。URL 锚点随当前屏更新。

零依赖静态网站。直接打开 `index.html` 即可阅读；复制按钮建议通过 localhost 或 HTTPS 使用。推送到 `main` 后，GitHub Actions 发布 `index.html`、`styles.css`、`swiss.css`、`content.js`、`app.js` 到 GitHub Pages。

## 视觉与动效

视觉采用 [guizang-ppt-skill 的瑞士国际主义 Style B](https://github.com/op7418/guizang-ppt-skill) 作为设计方法：16 列网格思路、Inter / Noto Sans SC、暖白与黑灰、克莱因蓝单一强调色、直角纯色块、发丝线和强烈的字号对比。为了适合这堂实操培训，保留原站的纵向逐屏交互、31 屏内容和练习功能，以独立的 `swiss.css` 实现风格；未直接拷贝该 Skill 的横向演讲模板或运行时代码。

标题逐字入场与逐屏过渡延续 [Transitions.dev](https://github.com/Jakubantalik/transitions.dev) 的动效思路，并支持系统“减少动态效果”设置。Transitions.dev © Jakub Antalik，见其 [许可证](https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE)。

## 资料

- [WorkBuddy 简介](https://www.workbuddy.cn/docs/workbuddy/Overview)
- [WorkBuddy 技能说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)
