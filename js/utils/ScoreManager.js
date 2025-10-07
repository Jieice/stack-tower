/**
 * 分数管理器
 * 管理当前分数和最高分
 */

class ScoreManager {
    constructor() {
        this.currentScore = 0;
        this.highScore = this.loadHighScore();
    }

    /**
     * 增加分数
     */
    addScore(points) {
        this.currentScore += points;

        // 更新最高分
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            this.saveHighScore();
        }

        return this.currentScore;
    }

    /**
     * 获取当前分数
     */
    getCurrentScore() {
        return this.currentScore;
    }

    /**
     * 获取最高分
     */
    getHighScore() {
        return this.highScore;
    }

    /**
     * 重置当前分数
     */
    resetCurrentScore() {
        this.currentScore = 0;
    }

    /**
     * 从 localStorage 加载最高分
     */
    loadHighScore() {
        const saved = localStorage.getItem('stackTowerHighScore');
        return saved ? parseInt(saved) : 0;
    }

    /**
     * 保存最高分到 localStorage
     */
    saveHighScore() {
        localStorage.setItem('stackTowerHighScore', this.highScore.toString());
    }

    /**
     * 判断是否创造新纪录
     */
    isNewRecord() {
        return this.currentScore === this.highScore && this.currentScore > 0;
    }
}

