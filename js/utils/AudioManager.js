/**
 * 音频管理器
 * 处理所有音效和背景音乐
 */

class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.sfxEnabled = this.loadSFXSettings();
        this.bgmEnabled = this.loadBGMSettings();
        this.sounds = {};
    }

    /**
     * 初始化音效（从已加载的资源中获取）
     */
    init() {
        // 获取预加载的音频资源
        this.sounds = {
            click: this.scene.sound.add('click'),
            drop: this.scene.sound.add('drop'),
            perfect: this.scene.sound.add('perfect'),
            cut: this.scene.sound.add('cut'),
            gameover: this.scene.sound.add('gameover'),
            bgm: this.scene.sound.add('bgm')  // 全局单一BGM
        };

        console.log('✅ Audio Manager initialized');
    }

    /**
     * 播放音效
     */
    play(soundName, volume = 1) {
        if (!this.sfxEnabled) return;

        if (this.sounds[soundName]) {
            try {
                this.sounds[soundName].play({ volume });
            } catch (e) {
                console.warn('Failed to play sound:', soundName);
            }
        }
    }

    /**
     * 切换音效开关
     */
    toggleSFX() {
        this.sfxEnabled = !this.sfxEnabled;
        localStorage.setItem('stackTowerSFXEnabled', this.sfxEnabled.toString());
        return this.sfxEnabled;
    }

    /**
     * 切换BGM开关
     */
    toggleBGM() {
        this.bgmEnabled = !this.bgmEnabled;
        localStorage.setItem('stackTowerBGMEnabled', this.bgmEnabled.toString());

        if (!this.bgmEnabled) {
            // 关闭：停止所有音乐
            this.stopAllBGM();
        } else {
            // 开启：根据当前场景播放对应音乐
            if (this.scene && this.scene.scene) {
                const currentScene = this.scene.scene.key;
                console.log('Restarting BGM for scene:', currentScene);

                if (currentScene === 'MenuScene' || currentScene === 'HowToPlayScene' || currentScene === 'GameOverScene') {
                    this.playMenuBGM();
                } else if (currentScene === 'GameScene') {
                    this.playGameBGM();
                }
            }
        }

        return this.bgmEnabled;
    }

    /**
     * 获取音效状态
     */
    isSFXEnabled() {
        return this.sfxEnabled;
    }

    /**
     * 获取BGM状态
     */
    isBGMEnabled() {
        return this.bgmEnabled;
    }

    /**
     * 加载音效设置
     */
    loadSFXSettings() {
        try {
            const saved = localStorage.getItem('stackTowerSFXEnabled');
            return saved === null ? true : saved === 'true';
        } catch (e) {
            return true;
        }
    }

    /**
     * 加载BGM设置
     */
    loadBGMSettings() {
        try {
            const saved = localStorage.getItem('stackTowerBGMEnabled');
            return saved === null ? true : saved === 'true';
        } catch (e) {
            return true;
        }
    }

    /**
     * 播放按钮点击音效
     */
    playClick() {
        this.play('click', 0.5);
    }

    /**
     * 播放方块掉落音效
     */
    playDrop() {
        this.play('drop', 0.4);
    }

    /**
     * 播放完美对齐音效
     */
    playPerfect() {
        this.play('perfect', 0.6);
    }

    /**
     * 播放切割音效
     */
    playCut() {
        this.play('cut', 0.4);
    }

    /**
     * 播放游戏结束音效
     */
    playGameOver() {
        this.play('gameover', 0.5);
    }

    /**
     * 播放全局BGM（循环）
     * 简化方法：playMenuBGM和playGameBGM都调用同一个BGM
     */
    playMenuBGM() {
        this.playBGM();
    }

    playGameBGM() {
        this.playBGM();
    }

    /**
     * 播放BGM的核心方法
     */
    playBGM() {
        if (!this.bgmEnabled || !this.sounds.bgm) return;

        // 如果已经在播放，不重新播放
        if (this.sounds.bgm.isPlaying) {
            return;
        }

        // 循环播放BGM
        this.sounds.bgm.play({
            loop: true,
            volume: 0.3
        });

        console.log('🎵 BGM started');
    }

    /**
     * 停止BGM
     */
    stopBGM() {
        if (this.sounds.bgm && this.sounds.bgm.isPlaying) {
            this.sounds.bgm.stop();
            console.log('🔇 BGM stopped');
        }
    }

    /**
     * 停止所有背景音乐（兼容旧接口）
     */
    stopAllBGM() {
        this.stopBGM();
    }

    stopMenuBGM() {
        this.stopBGM();
    }

    stopGameBGM() {
        this.stopBGM();
    }
}

