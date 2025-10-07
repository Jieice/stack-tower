/**
 * 方块类 - 简化版（无物理引擎）
 */

class Block {
    constructor(scene, x, y, width, height, color, emoji = null) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.emoji = emoji;

        // 创建容器
        this.container = scene.add.container(x, y);

        // 创建图形
        this.graphics = scene.add.graphics();
        this.container.add(this.graphics);

        // 创建emoji文本
        if (this.emoji) {
            this.text = scene.add.text(0, 0, emoji, {
                fontSize: `${height * 0.7}px`,
                color: '#ffffff'
            }).setOrigin(0.5);
            this.container.add(this.text);
        }

        this.draw();
    }

    draw() {
        this.graphics.clear();

        // 主体
        this.graphics.fillStyle(this.color, 1);
        this.graphics.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        // 边框
        this.graphics.lineStyle(3, 0xffffff, 0.3);
        this.graphics.strokeRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height
        );

        // 高光
        this.graphics.fillStyle(0xffffff, 0.2);
        this.graphics.fillRect(
            -this.width / 2,
            -this.height / 2,
            this.width,
            this.height / 3
        );
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.container.setPosition(x, y);
    }

    setWidth(newWidth) {
        if (newWidth <= 0) return;
        this.width = newWidth;
        this.draw();
    }

    // 动画：掉落到目标位置
    dropTo(targetY, callback) {
        this.y = targetY; // 立即更新Block的y坐标
        this.isDropping = true; // 标记为正在掉落
        this.scene.tweens.add({
            targets: this.container,
            y: targetY,
            duration: 600, // 增加动画时长，更平滑
            ease: 'Bounce.out', // 使用弹跳缓动，更有质感
            onComplete: () => {
                this.isDropping = false;
                if (callback) callback();
            }
        });
    }

    destroy() {
        if (this.container) this.container.destroy();
    }
}
