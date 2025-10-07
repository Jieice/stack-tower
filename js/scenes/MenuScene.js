/**
 * 主菜单场景
 */

class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
        this.scoreManager = new ScoreManager();
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // 初始化音频管理器
        this.audioManager = new AudioManager(this);
        this.audioManager.init();

        // 全局BGM - 只在主菜单启动一次，之后一直循环
        // 延迟一小段时间后尝试自动播放（提高成功率）
        this.time.delayedCall(100, () => {
            this.audioManager.playMenuBGM();
        });

        // 同时监听第一次用户交互（兜底方案）
        this.input.once('pointerdown', () => {
            this.audioManager.playMenuBGM();
        });

        // 背景渐变
        const gradient = this.add.graphics();
        gradient.fillGradientStyle(0x667eea, 0x667eea, 0x764ba2, 0x764ba2, 1);
        gradient.fillRect(0, 0, width, height);

        // 标题
        const title = this.add.text(width / 2, height * 0.2, '🏗️ Stack Tower', {
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // 添加标题动画
        this.tweens.add({
            targets: title,
            y: title.y - 10,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 副标题
        this.add.text(width / 2, height * 0.3, 'Stack Blocks as High as You Can!', {
            fontSize: '24px',
            color: '#ffffff',
            alpha: 0.9
        }).setOrigin(0.5);

        // 最高分
        const highScore = this.scoreManager.getHighScore();
        this.add.text(width / 2, height * 0.42, `🏆 High Score: ${highScore}`, {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // 开始按钮
        const startButton = this.add.text(width / 2, height * 0.58, 'START GAME', {
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#FF6B6B',
            padding: { x: 40, y: 20 },
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        startButton.setInteractive({ useHandCursor: true });

        startButton.on('pointerover', () => {
            startButton.setScale(1.1);
            startButton.setStyle({ backgroundColor: '#FF5252' });
        });

        startButton.on('pointerout', () => {
            startButton.setScale(1);
            startButton.setStyle({ backgroundColor: '#FF6B6B' });
        });

        startButton.on('pointerdown', () => {
            startButton.setScale(0.95);
        });

        startButton.on('pointerup', () => {
            startButton.setScale(1.1);
            this.audioManager.playClick();
            this.scene.start('GameScene');
        });

        // "How to Play" 按钮
        const howToPlayButton = this.createSmallButton(
            width / 2,
            height * 0.72,
            '📚 How to Play / 玩法说明',
            () => {
                this.audioManager.playClick();
                this.scene.start('HowToPlayScene');
            }
        );

        // 音效开关按钮
        this.soundButton = this.createSmallButton(
            width / 2,
            height * 0.82,
            this.audioManager.isSFXEnabled() ? '🔊 SFX: ON' : '🔇 SFX: OFF',
            () => {
                // 音效开关逻辑
                const enabled = this.audioManager.toggleSFX();
                this.soundButton.setText(enabled ? '🔊 SFX: ON' : '🔇 SFX: OFF');
                if (enabled) {
                    this.audioManager.playClick();
                }
            }
        );

        // BGM开关按钮
        this.bgmButton = this.createSmallButton(
            width / 2,
            height * 0.90,
            this.audioManager.isBGMEnabled() ? '🎵 BGM: ON' : '🎵 BGM: OFF',
            () => {
                // BGM开关逻辑
                const enabled = this.audioManager.toggleBGM();
                this.bgmButton.setText(enabled ? '🎵 BGM: ON' : '🎵 BGM: OFF');
                if (enabled && this.audioManager.isSFXEnabled()) {
                    this.audioManager.playClick();
                }
            }
        );

        // 装饰方块
        this.createDecorations();
    }

    /**
     * 创建小按钮
     */
    createSmallButton(x, y, text, callback) {
        const button = this.add.text(x, y, text, {
            fontSize: '24px',
            color: '#ffffff',
            backgroundColor: '#4ECDC4',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5);

        button.setInteractive({ useHandCursor: true });

        button.on('pointerover', () => {
            button.setScale(1.1);
            button.setStyle({ backgroundColor: '#45B7AF' });
        });

        button.on('pointerout', () => {
            button.setScale(1);
            button.setStyle({ backgroundColor: '#4ECDC4' });
        });

        button.on('pointerdown', () => {
            button.setScale(0.95);
        });

        button.on('pointerup', () => {
            button.setScale(1.1);
            if (callback) callback();
        });

        return button;
    }

    /**
     * 创建装饰方块
     */
    createDecorations() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // 左侧堆叠
        const leftStack = [
            { x: 100, y: height - 100, emoji: '📦' },
            { x: 100, y: height - 160, emoji: '🎁' },
            { x: 100, y: height - 220, emoji: '🧊' }
        ];

        // 右侧堆叠
        const rightStack = [
            { x: width - 100, y: height - 100, emoji: '🎂' },
            { x: width - 100, y: height - 160, emoji: '🍰' },
            { x: width - 100, y: height - 220, emoji: '🧱' }
        ];

        [...leftStack, ...rightStack].forEach((block, index) => {
            const color = GAME_CONFIG.COLORS[index % GAME_CONFIG.COLORS.length];
            const graphics = this.add.graphics();

            // 绘制方块
            graphics.fillStyle(color, 1);
            graphics.fillRect(
                block.x - 80,
                block.y - 30,
                160,
                60
            );

            graphics.lineStyle(3, 0xffffff, 0.3);
            graphics.strokeRect(
                block.x - 80,
                block.y - 30,
                160,
                60
            );

            // 表情符号
            this.add.text(block.x, block.y, block.emoji, {
                fontSize: '48px'
            }).setOrigin(0.5);
        });
    }
}

