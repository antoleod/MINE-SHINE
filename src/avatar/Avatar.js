import { AvatarBuilder } from './AvatarBuilder.js';
import { AvatarAnimator } from './AvatarAnimator.js';
import { AvatarEmotions } from './AvatarEmotions.js';

export class Avatar {
    constructor(app, appState, eventBus) {
        this.app = app;
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = new PIXI.Container();
        this.builder = new AvatarBuilder();
        this.animator = new AvatarAnimator();
        this.emotions = new AvatarEmotions();
        this.parts = {};
    }

    init() {
        this.buildAvatar();
        this.setupInteractions();
        this.eventBus.on('avatarUpdated', () => this.updateAppearance());
        this.eventBus.on('emotionChanged', (emotion) => this.setEmotion(emotion));
    }

    buildAvatar() {
        this.parts = this.builder.build(this.appState.avatar);
        Object.values(this.parts).forEach(part => {
            this.container.addChild(part);
        });
        this.container.scale.set(2);
        this.container.pivot.set(this.container.width / 2, this.container.height / 2);
    }

    updateAppearance() {
        // Rebuild avatar
        this.container.removeChildren();
        this.buildAvatar();
    }

    setEmotion(emotion) {
        this.emotions.setEmotion(emotion, this.parts);
        this.animator.adjustForEmotion(emotion);
    }

    setupInteractions() {
        this.container.eventMode = 'static';
        this.container.on('pointertap', () => {
            this.react();
        });
    }

    react() {
        // Bounce and smile
        this.animator.playReaction();
    }

    update(delta) {
        this.animator.update(delta, this.container);
        this.emotions.update(delta, this.parts);
    }

    resize() {
        // Adjust if needed
    }

    destroy() {
        this.container.removeChildren();
    }
}