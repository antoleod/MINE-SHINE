import { Ease } from '../utils/Ease.js';

export class FeedbackFX {
    constructor() {
        this.effects = [];
    }

    playTap() {
        this.effects.push({
            type: 'bounce',
            time: 0,
            duration: 20
        });
    }

    playGlow() {
        this.effects.push({
            type: 'glow',
            time: 0,
            duration: 30
        });
    }

    update(delta, target) {
        this.effects = this.effects.filter(effect => {
            effect.time += delta;
            const progress = Math.min(effect.time / effect.duration, 1);
            
            if (effect.type === 'bounce') {
                const scale = Ease.outBounce(progress) * 0.1 + 1;
                target.scale.set(scale);
            } else if (effect.type === 'glow') {
                // Simple glow effect
                target.alpha = 1 + Math.sin(progress * Math.PI) * 0.3;
            }
            
            return progress < 1;
        });
    }
}