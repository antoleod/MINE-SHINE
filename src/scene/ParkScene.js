import { BaseScene } from './BaseScene.js';

export class ParkScene extends BaseScene {
    constructor(app, appState, eventBus) {
        super(app, appState, eventBus);
        this.background = null;
        this.animals = [];
    }

    init() {
        // Green background
        this.background = new PIXI.Graphics();
        this.background.beginFill(0x90EE90);
        this.background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.container.addChild(this.background);

        // Add some trees, flowers, etc.
        this.addTrees();
        this.addAnimals();

        // Add avatar or allow interaction
    }

    addTrees() {
        // Simple tree graphics
        const tree = new PIXI.Graphics();
        tree.beginFill(0x8B4513);
        tree.drawRect(100, 400, 20, 100);
        tree.beginFill(0x228B22);
        tree.drawCircle(110, 380, 50);
        this.container.addChild(tree);
    }

    addAnimals() {
        // Simple butterfly or bird
        const butterfly = new PIXI.Graphics();
        butterfly.beginFill(0xFF69B4);
        butterfly.drawCircle(300, 200, 10);
        butterfly.drawCircle(320, 200, 10);
        this.container.addChild(butterfly);
        this.animals.push(butterfly);
    }

    update(delta) {
        // Animate animals
        this.animals.forEach(animal => {
            animal.x += Math.sin(this.app.ticker.lastTime * 0.001) * 0.5;
        });
    }

    resize() {
        if (this.background) {
            this.background.clear();
            this.background.beginFill(0x90EE90);
            this.background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        }
    }
}