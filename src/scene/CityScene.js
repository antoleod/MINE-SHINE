import { BaseScene } from './BaseScene.js';

export class CityScene extends BaseScene {
    constructor(app, appState, eventBus) {
        super(app, appState, eventBus);
    }

    init() {
        // City background
        const background = new PIXI.Graphics();
        background.beginFill(0xB0C4DE);
        background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.container.addChild(background);

        // Add buildings, cars, etc.
    }

    update(delta) {
        // City animations
    }
}