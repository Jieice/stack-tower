/**
 * Phaser 3 主配置
 */

const config = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.WIDTH,
    height: GAME_CONFIG.HEIGHT,
    backgroundColor: '#667eea',
    parent: 'game',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: GAME_CONFIG.WIDTH,
        height: GAME_CONFIG.HEIGHT,
        min: {
            width: 320,
            height: 480
        },
        max: {
            width: 1920,
            height: 1200
        }
    },
    scene: [
        BootScene,
        MenuScene,
        HowToPlayScene,
        GameScene,
        GameOverScene
    ]
};

const game = new Phaser.Game(config);

