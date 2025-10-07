# 🏗️ Stack Tower

[![Play on itch.io](https://img.shields.io/badge/Play%20on-itch.io-FA5C5C?style=for-the-badge&logo=itch.io&logoColor=white)](https://YOUR_USERNAME.itch.io/stack-tower)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-GitHub-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white)](https://github.com/sponsors/YOUR_USERNAME)

一个令人上瘾的开源方块堆叠游戏！看看你能堆多高！

**🎮 [在 itch.io 上立即游玩](https://YOUR_USERNAME.itch.io/stack-tower)**

## 🎮 游戏介绍

Stack Tower 是一款简单但充满挑战的休闲游戏。玩家需要通过点击屏幕投放移动的方块，将它们精准地堆叠起来。方块会越来越小，难度也会越来越高。完美对齐可以获得额外奖励分数！

## ✨ 游戏特色

- 🎯 **简单易上手** - 一键操作，轻松上手
- 📈 **难度递增** - 速度越来越快，挑战不断升级
- 🏆 **完美对齐奖励** - 精准堆叠获得额外分数
- 🎵 **音效系统** - 丰富的游戏音效，增强体验
- 🔊 **音效开关** - 可自由开启/关闭音效
- 📚 **游戏玩法说明** - 详细的游戏规则介绍
- 📱 **移动端友好** - 完美支持触摸屏操作
- 🎨 **彩虹色方块** - 美观的视觉效果
- 💾 **自动保存** - 最高分和音效设置自动记录

## 🕹️ 如何游玩

1. **点击/触摸屏幕** - 投放移动的方块
2. **对齐方块** - 尽量对齐下方的方块
3. **堆叠得分** - 每堆一层获得分数
4. **完美对齐** - 完美对齐额外加 50 分
5. **挑战高度** - 看看你能堆多高！

## 🛠️ 技术栈

- **Phaser 3** - HTML5 游戏框架（Tween动画系统）
- **JavaScript** - ES6+
- **HTML5 & CSS3** - 页面结构和样式
- **Kenney音效资源** - 高质量界面音效
- **简化架构** - 无物理引擎，纯位置+动画控制

## 📂 项目结构

```
stack-tower/
├── index.html              # 主HTML文件
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── main.js            # Phaser配置
│   ├── scenes/            # 游戏场景
│   │   ├── BootScene.js
│   │   ├── MenuScene.js
│   │   ├── HowToPlayScene.js  # 玩法说明场景
│   │   ├── GameScene.js
│   │   └── GameOverScene.js
│   ├── objects/           # 游戏对象
│   │   └── Block.js
│   └── utils/             # 工具类
│       ├── Config.js
│       ├── ScoreManager.js
│       └── AudioManager.js    # 音频管理器
├── sounds/                # 音效文件
│   └── kenney_interface-sounds/
│       └── Audio/
│           ├── click_001.ogg      # 按钮点击
│           ├── drop_002.ogg       # 方块掉落
│           ├── confirmation_002.ogg  # 完美对齐
│           ├── scratch_002.ogg    # 方块切割
│           └── glass_002.ogg      # 游戏结束
├── screenshots/           # 游戏截图
└── README.md             # 项目说明
```

## 🚀 如何运行

### 方法 1：本地服务器（推荐）

```bash
# 进入项目目录
cd stack-tower

# 启动Python HTTP服务器
python -m http.server 8000

# 打开浏览器访问
# http://localhost:8000
```

### 方法 2：直接打开

双击 `index.html` 文件即可在浏览器中运行。

## 🎯 游戏规则

### 得分系统
- **每层方块**: +10 分
- **完美对齐**: 额外 +50 分
- **高度**: 越高越好

### 游戏结束条件
- 方块完全没有重叠部分
- 方块掉出平台

### 难度递增
- 每层方块速度增加 0.2
- 最大速度 8.0
- 方块宽度根据对齐程度减少

## 📊 游戏数据

- **初始方块宽度**: 200px
- **方块高度**: 60px
- **初始速度**: 3.0
- **速度增量**: 0.2/层
- **最大速度**: 8.0
- **完美对齐容差**: 5px
- **完美对齐奖励**: 50分

## 💖 支持项目

如果你喜欢这个游戏，可以通过以下方式支持我：

- ⭐ 给这个项目点个Star
- 💰 [GitHub Sponsors](https://github.com/sponsors/YOUR_USERNAME)
- 🎮 [在 itch.io 上赞助](https://YOUR_USERNAME.itch.io/stack-tower)
- 🐛 [报告Bug或建议新功能](https://github.com/YOUR_USERNAME/stack-tower/issues)
- 🔀 Fork 并改进代码，提交PR

你的支持是我持续创作的动力！❤️

## 🎨 自定义配置

可以在 `js/utils/Config.js` 中修改游戏参数：

```javascript
const GAME_CONFIG = {
    BLOCK_START_SPEED: 3,      // 初始速度
    BLOCK_MAX_SPEED: 8,        // 最大速度
    PERFECT_TOLERANCE: 5,       // 完美对齐容差
    PERFECT_BONUS: 50,         // 完美奖励
    // ... 更多配置
};
```

## 📝 开发计划

### 当前版本 (v1.2)
- ✅ 基础堆叠玩法
- ✅ 得分系统
- ✅ 完美对齐奖励
- ✅ 移动端支持
- ✅ 最高分记录
- ✅ 弹跳掉落动画
- ✅ 优化游戏难度
- ✅ 简化物理系统
- ✅ 音效系统（Kenney音效包）
- ✅ 背景音乐系统
- ✅ 音效/BGM独立开关
- ✅ 游戏玩法说明场景

### 未来计划
- [ ] 更多视觉特效（粒子、闪光）
- [ ] 道具系统（慢速、加宽等）
- [ ] 成就系统
- [ ] 排行榜（在线）
- [ ] 皮肤主题

## 🐛 已知问题

目前没有已知严重问题。

## 🤝 贡献

欢迎贡献代码！如果你有好的想法或发现了Bug：

1. Fork 这个仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

这意味着你可以自由地：
- ✅ 商业使用
- ✅ 修改代码
- ✅ 分发
- ✅ 私人使用

唯一要求是保留版权声明和许可证声明。

## 👤 作者

**JieDimension Studio**

- GitHub: [@YOUR_USERNAME](https://github.com/YOUR_USERNAME)
- itch.io: [YOUR_USERNAME](https://YOUR_USERNAME.itch.io)

## 🙏 致谢

- **Phaser 3** - 强大的HTML5游戏框架
- **Kenney** - 优质的免费音效资源
- 所有玩过并提供反馈的玩家们！

## 📦 发布到 itch.io

运行打包脚本：
```powershell
.\pack-for-itch.ps1
```

这会生成 `stack-tower-v1.2.zip` 文件，直接上传到 itch.io 即可。

**上传设置：**
- 文件类型：HTML
- 视窗大小：800 x 600
- 勾选 "This file will be played in the browser"

**游戏描述：**
```
Stack blocks as high as you can! Addictive arcade game with perfect alignment mechanics. 
Features rainbow blocks, sound effects, BGM, and mobile support.
```

**标签：** arcade, casual, one-button, high-score, skill, timing, tower, stacking, puzzle, mobile

## 🎮 相关游戏

- Planet Drop (itch.io)

---

**Have fun stacking! 🏗️✨**

