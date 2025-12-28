import { BaseScene } from './BaseScene.js';

export class BeachScene extends BaseScene {
    constructor(app, appState, eventBus) {
        super(app, appState, eventBus);
    }

    init() {
        // Beach background
        const background = new PIXI.Graphics();
        background.beginFill(0x87CEEB); // Sky
        background.drawRect(0, 0, this.app.screen.width, this.app.screen.height / 2);
        background.beginFill(0xF4A460); // Sand
        background.drawRect(0, this.app.screen.height / 2, this.app.screen.width, this.app.screen.height / 2);
        this.container.addChild(background);

        // Add waves, sun, etc.
    }

    update(delta) {
        // Wave animations
    }
}