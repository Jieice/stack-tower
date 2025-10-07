/**
 * 游戏场景
 * 核心游戏逻辑
 */

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // 初始化变量
        this.scoreManager = new ScoreManager();
        this.scoreManager.resetCurrentScore();

        // 初始化音频管理器
        this.audioManager = new AudioManager(this);
        this.audioManager.init();

        // 不切换BGM，保持全局BGM继续播放

        this.blocks = [];
        this.currentBlock = null;
        this.movingDirection = 1; // 1 = 右, -1 = 左
        this.currentSpeed = GAME_CONFIG.BLOCK_START_SPEED;
        this.blockIndex = 0;
        this.gameOver = false;
        this.lastBlockY = GAME_CONFIG.PLATFORM_Y;
        this.cameraTargetY = height / 2;

        // 背景
        const gradient = this.add.graphics();
        gradient.fillGradientStyle(0x667eea, 0x667eea, 0x764ba2, 0x764ba2, 1);
        gradient.fillRect(0, 0, width, height * 3); // 更高的背景
        gradient.setScrollFactor(0);

        // 创建UI
        this.createUI();

        // 创建底部平台
        this.createPlatform();

        // 创建第一个移动的方块
        this.createMovingBlock();

        // 点击/触摸事件
        this.input.on('pointerdown', () => this.dropBlock());
    }

    /**
     * 创建UI
     */
    createUI() {
        const width = this.cameras.main.width;

        // 分数显示
        this.scoreText = this.add.text(width / 2, 40, 'Score: 0', {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

        // 高度显示
        this.heightText = this.add.text(width / 2, 80, 'Height: 0', {
            fontSize: '24px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

        // 完美提示
        this.perfectText = this.add.text(width / 2, 150, '', {
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#FFD700',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
    }

    /**
     * 创建底部平台
     */
    createPlatform() {
        const width = this.cameras.main.width;
        const platformX = width / 2;
        const platformY = GAME_CONFIG.PLATFORM_Y;

        // 创建平台方块
        const platform = new Block(
            this,
            platformX,
            platformY,
            GAME_CONFIG.PLATFORM_WIDTH,
            GAME_CONFIG.PLATFORM_HEIGHT,
            GAME_CONFIG.COLORS[0],
            GAME_CONFIG.EMOJIS[0]
        );

        this.blocks.push(platform);
    }

    /**
     * 创建移动的方块
     */
    createMovingBlock() {
        if (this.gameOver) return;

        const width = this.cameras.main.width;
        this.blockIndex++;

        // 计算颜色和表情符号
        const colorIndex = this.blockIndex % GAME_CONFIG.COLORS.length;
        const color = GAME_CONFIG.COLORS[colorIndex];
        const emoji = GAME_CONFIG.EMOJIS[colorIndex];

        // 获取上一个方块的宽度
        const lastBlock = this.blocks[this.blocks.length - 1];
        const blockWidth = lastBlock ? lastBlock.width : GAME_CONFIG.BLOCK_WIDTH;

        // 创建新方块
        const startY = this.lastBlockY - 200; // 在上一个方块上方
        this.currentBlock = new Block(
            this,
            width / 2,
            startY,
            blockWidth,
            GAME_CONFIG.BLOCK_HEIGHT,
            color,
            emoji
        );

        this.movingDirection = Math.random() > 0.5 ? 1 : -1; // 随机方向

        // 增加速度
        this.currentSpeed = Math.min(
            GAME_CONFIG.BLOCK_START_SPEED + this.blockIndex * GAME_CONFIG.BLOCK_SPEED_INCREMENT,
            GAME_CONFIG.BLOCK_MAX_SPEED
        );
    }

    /**
     * 投放方块
     */
    dropBlock() {
        if (this.gameOver || !this.currentBlock) return;

        const lastBlock = this.blocks[this.blocks.length - 1];
        const currentX = this.currentBlock.x;
        const lastX = lastBlock.x;
        const blockWidth = this.currentBlock.width;
        const lastWidth = lastBlock.width;

        // 计算重叠
        const leftCurrent = currentX - blockWidth / 2;
        const rightCurrent = currentX + blockWidth / 2;
        const leftLast = lastX - lastWidth / 2;
        const rightLast = lastX + lastWidth / 2;

        const overlapLeft = Math.max(leftCurrent, leftLast);
        const overlapRight = Math.min(rightCurrent, rightLast);
        const overlap = overlapRight - overlapLeft;

        // 没有重叠，游戏结束
        if (overlap <= 0) {
            this.endGame();
            return;
        }

        const difference = Math.abs(currentX - lastX);
        let score = GAME_CONFIG.SCORE_PER_BLOCK;

        // 如果不是完美对齐，需要切割
        if (difference > GAME_CONFIG.PERFECT_TOLERANCE) {
            // 计算新的中心位置
            const newX = (overlapLeft + overlapRight) / 2;
            const newWidth = overlap;

            // 调整方块大小和位置
            this.currentBlock.setWidth(newWidth);
            this.currentBlock.setPosition(newX, this.currentBlock.y);

            // 播放切割音效
            this.audioManager.playCut();

            // 创建掉落的切片
            this.createFallingPiece(currentX, lastX, blockWidth, newWidth);
        } else {
            // 完美对齐奖励
            score += GAME_CONFIG.PERFECT_BONUS;
            this.showPerfect();
            // 播放完美音效
            this.audioManager.playPerfect();
        }

        // 计算目标Y位置（紧贴上一个方块）
        const targetY = lastBlock.y - GAME_CONFIG.BLOCK_HEIGHT;

        // 立即更新lastBlockY，确保下一个方块能正确计算位置
        this.lastBlockY = targetY;

        // 标记当前方块为已放置（停止横向移动）
        const placedBlock = this.currentBlock;
        this.currentBlock = null; // 立即清除，停止update中的移动逻辑

        // 播放掉落音效
        this.audioManager.playDrop();

        // 动画掉落到目标位置
        placedBlock.dropTo(targetY, () => {
            // 掉落完成后移动摄像机
            this.moveCameraUp();
        });

        // 添加到数组
        this.blocks.push(placedBlock);

        // 更新分数
        this.scoreManager.addScore(score);
        this.updateUI();

        // 700ms后创建新方块（掉落动画是600ms）
        this.time.delayedCall(700, () => {
            this.createMovingBlock();
        });
    }

    /**
     * 计算重叠宽度
     */
    calculateOverlap(currentX, lastX, blockWidth) {
        const lastBlock = this.blocks[this.blocks.length - 1];
        const currentLeft = currentX - blockWidth / 2;
        const currentRight = currentX + blockWidth / 2;
        const lastLeft = lastX - lastBlock.width / 2;
        const lastRight = lastX + lastBlock.width / 2;

        const overlapLeft = Math.max(currentLeft, lastLeft);
        const overlapRight = Math.min(currentRight, lastRight);

        return Math.max(0, overlapRight - overlapLeft);
    }

    /**
     * 创建掉落的切片（视觉效果）
     */
    createFallingPiece(currentX, lastX, blockWidth, newWidth) {
        const cutWidth = blockWidth - newWidth;

        // 计算切片位置
        let cutX;
        if (currentX < lastX) {
            cutX = currentX - blockWidth / 2 + cutWidth / 2;
        } else {
            cutX = currentX + blockWidth / 2 - cutWidth / 2;
        }

        const colorIndex = this.blockIndex % GAME_CONFIG.COLORS.length;
        const color = GAME_CONFIG.COLORS[colorIndex];

        // 创建切片
        const piece = new Block(
            this,
            cutX,
            this.currentBlock.y,
            cutWidth,
            GAME_CONFIG.BLOCK_HEIGHT,
            color,
            null
        );

        // 动画：向侧面飞出并掉落
        this.tweens.add({
            targets: piece.container,
            x: cutX + this.movingDirection * 150,
            y: '+=1000',
            rotation: this.movingDirection * 1.5,
            alpha: 0.3,
            duration: 1200,
            ease: 'Cubic.in',
            onComplete: () => {
                if (piece) piece.destroy();
            }
        });
    }

    /**
     * 显示完美提示
     */
    showPerfect() {
        this.perfectText.setText('🎯 PERFECT! +' + GAME_CONFIG.PERFECT_BONUS);
        this.perfectText.setAlpha(1);

        this.tweens.add({
            targets: this.perfectText,
            alpha: 0,
            duration: 1000,
            ease: 'Power2'
        });
    }

    /**
     * 移动摄像机向上
     */
    moveCameraUp() {
        const targetY = this.lastBlockY - this.cameras.main.height / 2 + 200;

        this.tweens.add({
            targets: this.cameras.main,
            scrollY: targetY,
            duration: 500,
            ease: 'Power2'
        });
    }

    /**
     * 更新UI
     */
    updateUI() {
        this.scoreText.setText(`Score: ${this.scoreManager.getCurrentScore()}`);
        this.heightText.setText(`Height: ${this.blocks.length - 1}`);
    }

    /**
     * 结束游戏
     */
    endGame() {
        if (this.gameOver) return;

        this.gameOver = true;

        // 播放游戏结束音效
        this.audioManager.playGameOver();

        // 当前方块掉落动画
        if (this.currentBlock) {
            this.tweens.add({
                targets: this.currentBlock.container,
                x: this.currentBlock.x + this.movingDirection * 200,
                y: this.currentBlock.y + 1000,
                rotation: this.movingDirection * 2,
                alpha: 0.5,
                duration: 1500,
                ease: 'Cubic.in'
            });
        }

        // 延迟后进入游戏结束场景
        this.time.delayedCall(1500, () => {
            this.scene.start('GameOverScene', {
                score: this.scoreManager.getCurrentScore(),
                height: this.blocks.length - 1,
                isNewRecord: this.scoreManager.isNewRecord()
            });
        });
    }

    /**
     * 更新（每帧）
     */
    update() {
        if (this.gameOver) return;

        // 移动当前方块
        if (this.currentBlock) {
            const width = this.cameras.main.width;
            const blockHalfWidth = this.currentBlock.width / 2;

            // 更新位置
            this.currentBlock.setPosition(
                this.currentBlock.x + this.currentSpeed * this.movingDirection,
                this.currentBlock.y
            );

            // 边界反弹
            if (this.currentBlock.x - blockHalfWidth < 0) {
                this.currentBlock.setPosition(blockHalfWidth, this.currentBlock.y);
                this.movingDirection = 1;
            } else if (this.currentBlock.x + blockHalfWidth > width) {
                this.currentBlock.setPosition(width - blockHalfWidth, this.currentBlock.y);
                this.movingDirection = -1;
            }
        }
    }
}

