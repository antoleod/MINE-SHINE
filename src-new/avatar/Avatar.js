import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { AvatarAnimator } from './AvatarAnimator.js';
import { AvatarEmotions } from './AvatarEmotions.js';

export class Avatar extends PIXI.Container {
    constructor(parts) {
        super();
        this.parts = parts;
        this.animator = new AvatarAnimator(this);
        this.emotions = new AvatarEmotions(this);
        this.build();
    }

    build() {
        this.addChild(
            this.parts.body,
            this.parts.clothes,
            this.parts.shoes,
            this.parts.head,
            this.parts.eyes,
            this.parts.eyebrows,
            this.parts.mouth,
            this.parts.hair,
            this.parts.accessories
        );
    }

    setEmotion(name) {
        this.emotions.apply(name);
    }

    update(time) {
        this.animator.update(time);
    }
}
