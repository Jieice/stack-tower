/**
 * 游戏结束场景
 */

class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.finalScore = data.score || 0;
        this.finalHeight = data.height || 0;
        this.isNewRecord = data.isNewRecord || false;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // 初始化音频管理器
        this.audioManager = new AudioManager(this);
        this.audioManager.init();

        // 不切换BGM，保持全局BGM继续播放

        // 背景
        const gradient = this.add.graphics();
        gradient.fillGradientStyle(0x667eea, 0x667eea, 0x764ba2, 0x764ba2, 1);
        gradient.fillRect(0, 0, width, height);

        // 半透明遮罩
        const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7);

        // 游戏结束标题
        const title = this.add.text(width / 2, height * 0.2, 'GAME OVER!', {
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#ff6b6b',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // 标题动画
        this.tweens.add({
            targets: title,
            scale: 1.1,
            duration: 500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // 新纪录提示
        if (this.isNewRecord) {
            const newRecord = this.add.text(width / 2, height * 0.3, '🎉 NEW RECORD! 🎉', {
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#FFD700',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            // 新纪录动画
            this.tweens.add({
                targets: newRecord,
                y: newRecord.y - 5,
                duration: 600,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }

        // 分数显示
        const scoreY = this.isNewRecord ? height * 0.42 : height * 0.35;

        this.add.text(width / 2, scoreY, 'Your Score', {
            fontSize: '24px',
            color: '#ffffff',
            alpha: 0.8
        }).setOrigin(0.5);

        this.add.text(width / 2, scoreY + 50, this.finalScore.toString(), {
            fontSize: '72px',
            fontWeight: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        // 高度显示
        this.add.text(width / 2, scoreY + 130, `Height: ${this.finalHeight} blocks`, {
            fontSize: '28px',
            color: '#90EE90',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // 最高分
        const scoreManager = new ScoreManager();
        this.add.text(width / 2, scoreY + 180, `🏆 Best: ${scoreManager.getHighScore()}`, {
            fontSize: '24px',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        // 重试按钮
        const retryButton = this.add.text(width / 2, height * 0.7, 'RETRY', {
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#4CAF50',
            padding: { x: 50, y: 20 },
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        retryButton.setInteractive({ useHandCursor: true });

        retryButton.on('pointerover', () => {
            retryButton.setScale(1.1);
            retryButton.setStyle({ backgroundColor: '#45a049' });
        });

        retryButton.on('pointerout', () => {
            retryButton.setScale(1);
            retryButton.setStyle({ backgroundColor: '#4CAF50' });
        });

        retryButton.on('pointerdown', () => {
            retryButton.setScale(0.95);
        });

        retryButton.on('pointerup', () => {
            retryButton.setScale(1.1);
            this.audioManager.playClick();
            this.scene.start('GameScene');
        });

        // 主菜单按钮
        const menuButton = this.add.text(width / 2, height * 0.82, 'MENU', {
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#666',
            padding: { x: 40, y: 15 },
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        menuButton.setInteractive({ useHandCursor: true });

        menuButton.on('pointerover', () => {
            menuButton.setScale(1.1);
            menuButton.setStyle({ backgroundColor: '#555' });
        });

        menuButton.on('pointerout', () => {
            menuButton.setScale(1);
            menuButton.setStyle({ backgroundColor: '#666' });
        });

        menuButton.on('pointerdown', () => {
            menuButton.setScale(0.95);
        });

        menuButton.on('pointerup', () => {
            menuButton.setScale(1.1);
            this.audioManager.playClick();
            this.scene.start('MenuScene');
        });

        // 鼓励文本
        const encouragement = this.getEncouragement(this.finalHeight);
        this.add.text(width / 2, height * 0.93, encouragement, {
            fontSize: '18px',
            color: '#ffffff',
            alpha: 0.7
        }).setOrigin(0.5);
    }

    /**
     * 根据高度获取鼓励文本
     */
    getEncouragement(height) {
        if (height < 5) return 'Keep practicing!';
        if (height < 10) return 'Not bad!';
        if (height < 20) return 'Good job!';
        if (height < 30) return 'Great work!';
        if (height < 50) return 'Excellent!';
        return 'You\'re a master!';
    }
}

