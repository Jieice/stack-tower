/**
 * 游戏配置
 */

const GAME_CONFIG = {
    // 游戏世界尺寸
    WIDTH: 800,
    HEIGHT: 1200,

    // 物理引擎
    GRAVITY: 1.5, // Matter.js 的重力值（1.0是正常重力）

    // 方块配置
    BLOCK_WIDTH: 200,
    BLOCK_HEIGHT: 60,
    BLOCK_START_Y: 100,
    BLOCK_START_SPEED: 2.5,        // 初始移动速度（降低）
    BLOCK_MAX_SPEED: 6,            // 最大移动速度（降低）
    BLOCK_SPEED_INCREMENT: 0.15,   // 每层速度增加（降低）

    // 平台
    PLATFORM_WIDTH: 200,
    PLATFORM_HEIGHT: 60,
    PLATFORM_Y: 1000,

    // 完美对齐奖励
    PERFECT_TOLERANCE: 10,         // 完美对齐容差（增加，更容易触发）
    PERFECT_BONUS: 50,             // 完美对齐奖励分数

    // 颜色方案（彩虹色）
    COLORS: [
        0xFF6B6B,  // 红
        0xFFA500,  // 橙
        0xFFD700,  // 金
        0x90EE90,  // 绿
        0x87CEEB,  // 蓝
        0x9370DB,  // 紫
        0xFF69B4,  // 粉
    ],

    // 方块表情符号（可选）
    EMOJIS: ['📦', '🎁', '🧊', '🎂', '🍰', '🧱', '🟦'],

    // 得分
    SCORE_PER_BLOCK: 10,

    // 摄像机
    CAMERA_FOLLOW_SPEED: 0.1,
    CAMERA_LERP: 0.1
};

