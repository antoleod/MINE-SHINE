import { Config } from '../core/Config.js';
import { MathUtil } from '../utils/Math.js';

export class AvatarAnimator {
    constructor(avatar) {
        this.avatar = avatar;
        this.blinkTimer = MathUtil.rand(Config.avatar.blinkMin, Config.avatar.blinkMax);
        this.breathTime = 0;
        this.lookOffset = { x: 0, y: 0 };
        this.idleSpeed = Config.avatar.idleBreathSpeed;
    }

    setIdleSpeed(speed) {
        this.idleSpeed = speed;
    }

    lookAt(point) {
        this.lookOffset.x = MathUtil.clamp(point.x / 120, -0.2, 0.2);
        this.lookOffset.y = MathUtil.clamp(point.y / 120, -0.2, 0.2);
        this.avatar.parts.eyes.setLook(this.lookOffset);
        this.avatar.parts.eyebrows.setLook(this.lookOffset);
    }

    blink() {
        this.avatar.parts.eyes.blink();
    }

    bounce() {
        this.avatar.scale.set(1.02, 0.98);
        this.avatar.pivot.y = 6;
        setTimeout(() => {
            this.avatar.scale.set(1, 1);
            this.avatar.pivot.y = 0;
        }, 120);
    }

    update(time) {
        this.breathTime += time.delta * this.idleSpeed;
        const breath = Math.sin(this.breathTime) * 0.02;
        this.avatar.parts.body.scale.y = 1 + breath;
        this.avatar.parts.head.y = -92 + breath * 20;
        this.avatar.parts.clothes.scale.y = 1 + breath * 0.7;

        this.blinkTimer -= time.delta / 1000;
        if (this.blinkTimer <= 0) {
            this.blink();
            this.blinkTimer = MathUtil.rand(Config.avatar.blinkMin, Config.avatar.blinkMax);
        }
    }
}
