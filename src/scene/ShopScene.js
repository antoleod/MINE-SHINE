import { BaseScene } from './BaseScene.js';

export class ShopScene extends BaseScene {
    constructor(app, appState, eventBus) {
        super(app, appState, eventBus);
        this.items = [];
    }

    init() {
        // Shop background
        const background = new PIXI.Graphics();
        background.beginFill(0xFFF8DC);
        background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.container.addChild(background);

        // Add shop items
        this.addShopItems();
    }

    addShopItems() {
        // Example: shirt item
        const shirt = this.createItem('shirt', 0xFF0000, 100, 200);
        this.items.push(shirt);
        this.addInteractiveElement(shirt);

        shirt.on('pointertap', () => {
            this.eventBus.emit('buyItem', { category: 'clothes', item: 'shirt' });
        });
    }

    createItem(name, color, x, y) {
        const item = new PIXI.Graphics();
        item.beginFill(color);
        item.drawRect(x, y, 50, 50);
        item.interactive = true;
        item.buttonMode = true;
        return item;
    }

    update(delta) {
        // Shop animations
    }
}