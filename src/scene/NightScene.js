import { BaseScene } from './BaseScene.js';

export class NightScene extends BaseScene {
    constructor(app, appState, eventBus) {
        super(app, appState, eventBus);
    }

    init() {
        // Night background
        const background = new PIXI.Graphics();
        background.beginFill(0x191970);
        background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.container.addChild(background);

        // Add stars, moon, etc.
    }

    update(delta) {
        // Night animations
    }
}