export class HoverReactions {
    static attach(target) {
        target.eventMode = 'static';
        target.on('pointerover', () => target.scale.set(1.03));
        target.on('pointerout', () => target.scale.set(1));
    }
}
