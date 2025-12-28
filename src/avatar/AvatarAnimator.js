import { Ease } from '../utils/Ease.js';

export class AvatarAnimator {
    constructor() {
        this.isReacting = false;
        this.reactionTime = 0;
        this.emotionSpeed = 1;
    }

    playReaction() {
        this.isReacting = true;
        this.reactionTime = 0;
    }

    adjustForEmotion(emotion) {
        switch (emotion) {
            case 'happy':
                this.emotionSpeed = 1.2;
                break;
            case 'sad':
                this.emotionSpeed = 0.8;
                break;
            case 'excited':
                this.emotionSpeed = 1.5;
                break;
            default:
                this.emotionSpeed = 1;
        }
    }

    update(delta, container) {
        // Breathing animation
        const breath = Math.sin(PIXI.Ticker.shared.lastTime * 0.002 * this.emotionSpeed) * 0.02 + 1;
        container.scale.y = breath;

        // Reaction animation
        if (this.isReacting) {
            this.reactionTime += delta;
            const progress = Math.min(this.reactionTime / 30, 1);
            const scale = Ease.outBounce(progress) * 0.1 + 1;
            container.scale.x = scale;
            container.scale.y = scale * breath;
            if (progress >= 1) {
                this.isReacting = false;
            }
        }
    }
}