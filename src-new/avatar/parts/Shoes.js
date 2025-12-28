import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const SHOES = {
    sneakers: 0xffffff,
    boots: 0x4f3b2f,
    slippers: 0xffe5b4,
};

export class Shoes extends PIXI.Container {
    constructor(config) {
        super();
        this.left = new PIXI.Graphics();
        this.right = new PIXI.Graphics();
        this.addChild(this.left, this.right);
        this.setStyle(config);
        this.y = 140;
    }

    setStyle(config) {
        const color = SHOES[config.shoes] || SHOES.sneakers;
        const draw = (g, x) => {
            g.clear();
            g.beginFill(color);
            g.drawRoundedRect(x - 26, 0, 52, 24, 10);
            g.endFill();
        };
        draw(this.left, -32);
        draw(this.right, 32);
    }
}
