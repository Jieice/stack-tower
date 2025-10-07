/**
 * 启动场景
 * 负责资源加载和初始化
 */

class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // 显示加载进度
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '32px',
            color: '#ffffff'
        }).setOrigin(0.5);

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2, 320, 50);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 + 10, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // 加载音效文件
        this.load.audio('click', 'sounds/kenney_interface-sounds/Audio/click_001.ogg');
        this.load.audio('drop', 'sounds/kenney_interface-sounds/Audio/drop_002.ogg');
        this.load.audio('perfect', 'sounds/kenney_interface-sounds/Audio/confirmation_002.ogg');
        this.load.audio('cut', 'sounds/kenney_interface-sounds/Audio/scratch_002.ogg');
        this.load.audio('gameover', 'sounds/kenney_interface-sounds/Audio/glass_002.ogg');

        // 加载背景音乐（只加载一个全局BGM）
        this.load.audio('bgm', 'sounds/BGM.mp3');
    }

    create() {
        // 直接进入主菜单
        this.scene.start('MenuScene');
    }
}

