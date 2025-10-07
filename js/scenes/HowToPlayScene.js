/**
 * 游戏说明场景
 * 展示游戏规则和玩法
 */

class HowToPlayScene extends Phaser.Scene {
    constructor() {
        super({ key: 'HowToPlayScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // 初始化音频管理器
        this.audioManager = new AudioManager(this);
        this.audioManager.init();

        // 不切换BGM，保持全局BGM继续播放

        // 渐变背景
        const gradient = this.add.graphics();
        gradient.fillGradientStyle(0x667eea, 0x667eea, 0x764ba2, 0x764ba2, 1);
        gradient.fillRect(0, 0, width, height);

        // 标题
        const title = this.add.text(width / 2, 100, '📚 How to Play / 游戏玩法', {
            fontSize: '48px',
            fontStyle: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // 说明面板背景
        const panel = this.add.rectangle(width / 2, height / 2 + 20, 800, 600, 0x000000, 0.4);
        panel.setStrokeStyle(4, 0xffffff, 0.5);

        // 游戏说明内容
        const instructions = [
            {
                icon: '👆',
                title: 'Click to Drop',
                textCN: '点击屏幕投放方块'
            },
            {
                icon: '🎯',
                title: 'Align Perfectly',
                textCN: '尽量对齐下方的方块'
            },
            {
                icon: '✨',
                title: 'Perfect = +50 Bonus',
                textCN: '完美对齐获得额外50分'
            },
            {
                icon: '📏',
                title: 'Miss = Cut Off',
                textCN: '未对齐部分会被切掉'
            },
            {
                icon: '⚡',
                title: 'Speed Increases',
                textCN: '速度逐渐加快，难度提升'
            },
            {
                icon: '🏆',
                title: 'Stack Higher!',
                textCN: '堆得越高分数越多！'
            }
        ];

        let startY = 220;
        const lineHeight = 80;

        instructions.forEach((inst, i) => {
            const y = startY + i * lineHeight;

            // 图标（整体向下移动180像素）
            const icon = this.add.text(width / 2 - 300, y + 180, inst.icon, {
                fontSize: '40px'
            }).setOrigin(0.5);

            // 英文标题（整体向下移动180像素）
            const titleText = this.add.text(width / 2 - 230, y + 172, inst.title, {
                fontSize: '22px',
                fontStyle: 'bold',
                color: '#FFD700'
            }).setOrigin(0, 0.5);

            // 中文说明（整体向下移动180像素）
            const descText = this.add.text(width / 2 - 230, y + 196, inst.textCN, {
                fontSize: '16px',
                color: '#aaddff'
            }).setOrigin(0, 0.5);

            // 入场动画
            icon.setAlpha(0);
            titleText.setAlpha(0);
            descText.setAlpha(0);

            this.tweens.add({
                targets: [icon, titleText, descText],
                alpha: 1,
                duration: 300,
                delay: i * 100,
                ease: 'Power2'
            });
        });

        // 提示框
        const tipY = height - 115;
        const tipBox = this.add.rectangle(width / 2, tipY, 750, 70, 0xFF6B6B, 0.3);
        tipBox.setStrokeStyle(3, 0xFF6B6B);

        const tipText = this.add.text(width / 2, tipY, '💡 Tip: Keep calm and focus! / 保持冷静，专注对齐！', {
            fontSize: '18px',
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // 返回按钮
        this.createButton(width / 2, height - 50, '🏠 Back to Menu / 返回菜单', () => {
            this.audioManager.playClick();
            this.scene.start('MenuScene');
        });

        // 标题呼吸动画
        this.tweens.add({
            targets: title,
            scale: 1.05,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 提示框闪烁
        this.tweens.add({
            targets: [tipBox, tipText],
            alpha: 0.8,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }

    /**
     * 创建按钮
     */
    createButton(x, y, text, callback) {
        const button = this.add.text(x, y, text, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#4CAF50',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setScale(1.1);
            button.setBackgroundColor('#66BB66');
        });

        button.on('pointerout', () => {
            button.setScale(1);
            button.setBackgroundColor('#4CAF50');
        });

        button.on('pointerdown', callback);

        return button;
    }
}

