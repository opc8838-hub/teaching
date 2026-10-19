# 把 AI 用起来

给约 30 位零基础职场学员使用的 90 分钟互动课网站。内容围绕聊天机器人、Agent、Skill 的区别，以及在 WorkBuddy 中创建和复用“会议纪要与待办整理”技能。

## 课堂使用

1. 用首页开场，介绍课程成果。
2. 在“认识概念”和“看清区别”中讲解三个概念，并让学员点击切换观察。
3. 按时间表进入实操。学员两人一组，先用练习材料 A 完成任务，再保存 Skill，最后用材料 B 在新任务中验证。
4. 用“AI 结果也需要验收”和三题测验收尾。

课堂需要提前确认 WorkBuddy 账号、网络与创建 Skill 的入口可用。练习材料均为虚构。网页负责教学引导、复制指令与练习反馈；真正的 Skill 在学员的 WorkBuddy 账号中创建。

## 本地运行

这是零依赖静态网站。直接打开 `index.html` 可以阅读；为使用剪贴板复制按钮，建议通过本地服务器打开：

```bash
python -m http.server 8765
```

然后访问 `http://localhost:8765/`。推送到 `main` 后，GitHub Actions 会发布到 GitHub Pages。

## 设计与动效

设计遵循 `oil-ui-pro 0.10.0` 的方法：以课堂学习路径为主角，用大字、清楚的对比和可见的操作结果组织页面。桌面投影和手机跟做均可使用。

交互采用 [Transitions.dev](https://github.com/Jakubantalik/transitions.dev) 的免费过渡方案并按本站调整：概念切换使用 sliding tabs，完成反馈使用 success check。相关 CSS 保留 `t-*` 类名，并提供 `prefers-reduced-motion` 支持。Transitions.dev 版权所有 © 2026 Jakub Antalik，使用受其[许可条款](https://github.com/Jakubantalik/transitions.dev/blob/main/LICENSE)约束。

## 资料来源

- [WorkBuddy 简介](https://www.workbuddy.cn/docs/workbuddy/Overview)
- [WorkBuddy 技能说明](https://www.workbuddy.cn/docs/workbuddy/From-Beginner-to-Expert-Guide/Function-Description/Skills-Market)
