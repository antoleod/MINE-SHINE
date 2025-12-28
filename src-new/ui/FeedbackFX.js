export class FeedbackFX {
    static glow(target) {
        target.alpha = 0.8;
        setTimeout(() => (target.alpha = 1), 120);
    }
}
