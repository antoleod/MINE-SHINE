import { Config } from '../core/Config.js';

const EMOTION_MAP = {
    happy: { eye: 'smile', mouth: 'smile', brow: 'soft', speed: Config.avatar.idleBreathSpeed, blink: [2.2, 4.2] },
    sad: { eye: 'droop', mouth: 'frown', brow: 'sad', speed: Config.avatar.idleBreathSpeed * 0.7, blink: [3, 5.5] },
    surprised: { eye: 'wide', mouth: 'o', brow: 'raised', speed: Config.avatar.idleBreathSpeed * 1.1, blink: [2, 3.6] },
    sleepy: { eye: 'sleepy', mouth: 'soft', brow: 'soft', speed: Config.avatar.idleBreathSpeed * 0.5, blink: [4.2, 7] },
    excited: { eye: 'sparkle', mouth: 'bigsmile', brow: 'raised', speed: Config.avatar.idleBreathSpeed * 1.4, blink: [1.6, 3] },
    angry: { eye: 'focus', mouth: 'pout', brow: 'angry', speed: Config.avatar.idleBreathSpeed * 1.2, blink: [2, 3.4] },
};

export class AvatarEmotions {
    constructor(avatar) {
        this.avatar = avatar;
    }

    apply(name) {
        const config = EMOTION_MAP[name] || EMOTION_MAP.happy;
        this.avatar.parts.eyes.setMood(config.eye);
        this.avatar.parts.mouth.setMood(config.mouth);
        this.avatar.parts.eyebrows.setMood(config.brow);
        this.avatar.animator.setIdleSpeed(config.speed);
        this.avatar.animator.setBlinkRange(config.blink[0], config.blink[1]);
    }
}
