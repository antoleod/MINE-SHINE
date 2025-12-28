import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const HEAD_SHAPES = {
    round: { radius: 62 },
    oval: { radius: 58 },
    baby: { radius: 70 },
};

const SKIN_TONES = {
    peach: 0xf2c7a8,
    sand: 0xe8b98a,
    cocoa: 0xc78c6c,
    almond: 0xf3d1b0,
};

export class Head extends PIXI.Container {
    constructor(config) {
        super();
        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);
        this.setStyle(config);
        this.y = -92;
    }

    setStyle(config) {
        const headKey = config.body === 'baby' ? 'baby' : (config.head || 'round');
        const shape = HEAD_SHAPES[headKey] || HEAD_SHAPES.round;
        const color = SKIN_TONES[config.skin] || SKIN_TONES.peach;
        this.graphic.clear();
        this.graphic.beginFill(color);
        this.graphic.drawCircle(0, 0, shape.radius);
        this.graphic.endFill();
        this.graphic.beginFill(0xffffff, 0.18);
        this.graphic.drawCircle(-18, -22, shape.radius * 0.35);
        this.graphic.endFill();
        this.graphic.beginFill(0xf7b2b7, 0.35);
        this.graphic.drawCircle(-26, 12, 10);
        this.graphic.drawCircle(26, 12, 10);
        this.graphic.endFill();
    }
}
