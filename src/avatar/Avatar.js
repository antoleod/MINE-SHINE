import { AvatarBuilder } from './AvatarBuilder.js';
import { AvatarAnimator } from './AvatarAnimator.js';
import { AvatarEmotions } from './AvatarEmotions.js';

export class Avatar {
    constructor(scene, appState, eventBus) {
        this.scene = scene;
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = new THREE.Group();
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
            this.container.add(part);
        });
        this.container.scale.set(0.5, 0.5, 0.5);
    }

    updateAppearance() {
        // Rebuild avatar
        this.container.clear();
        this.buildAvatar();
    }

    setEmotion(emotion) {
        this.emotions.setEmotion(emotion, this.parts);
        this.animator.adjustForEmotion(emotion);
    }

    setupInteractions() {
        // 3D interactions will be handled by InputManager
    }

    react() {
        // Bounce and smile
        this.animator.playReaction();
    }

    update() {
        this.animator.update(this.container);
        this.emotions.update(this.parts);
    }

    resize() {
        // Adjust if needed
    }

    destroy() {
        this.container.clear();
    }
}