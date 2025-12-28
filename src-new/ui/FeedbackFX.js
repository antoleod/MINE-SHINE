export class FeedbackFX {
    static glow(target) {
        target.alpha = 0.8;
        setTimeout(() => (target.alpha = 1), 120);
    }

    static pop(target) {
        target.scale.set(1.04);
        setTimeout(() => target.scale.set(1), 140);
    }
}
