import { BaseScene } from './BaseScene.js';

export class SchoolScene extends BaseScene {
    constructor(app, appState, eventBus) {
        super(app, appState, eventBus);
    }

    init() {
        // School background
        const background = new PIXI.Graphics();
        background.beginFill(0xDEB887); // BurlyWood color for a school floor
        background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.container.addChild(background);

        // Add school elements, like desks, a blackboard, etc.
    }

    update(delta) {
        // School animations
    }
}