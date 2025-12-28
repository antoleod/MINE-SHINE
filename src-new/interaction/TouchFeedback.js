export class TouchFeedback {
    static bounce(target) {
        target.scale.set(0.96);
        setTimeout(() => target.scale.set(1.02), 70);
        setTimeout(() => target.scale.set(1), 140);
    }
}
