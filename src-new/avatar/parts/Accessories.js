import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

export class Accessories extends PIXI.Container {
    constructor(config) {
        super();
        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);
        this.setStyle(config);
        this.y = -30;
    }

    setStyle(config) {
        this.graphic.clear();
        if (config.accessories === 'none') return;
        this.graphic.beginFill(0xffe066);
        this.graphic.drawCircle(0, 0, 10);
        this.graphic.endFill();
    }
}
