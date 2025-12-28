import { Config } from '../core/Config.js';

const EMOTION_MAP = {
    happy: { eye: 'smile', mouth: 'smile', brow: 'soft', speed: Config.avatar.idleBreathSpeed },
    sad: { eye: 'droop', mouth: 'frown', brow: 'sad', speed: Config.avatar.idleBreathSpeed * 0.7 },
    surprised: { eye: 'wide', mouth: 'o', brow: 'raised', speed: Config.avatar.idleBreathSpeed * 1.1 },
    sleepy: { eye: 'sleepy', mouth: 'soft', brow: 'soft', speed: Config.avatar.idleBreathSpeed * 0.5 },
    excited: { eye: 'sparkle', mouth: 'bigsmile', brow: 'raised', speed: Config.avatar.idleBreathSpeed * 1.4 },
    angry: { eye: 'focus', mouth: 'pout', brow: 'angry', speed: Config.avatar.idleBreathSpeed * 1.2 },
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
    }
}
