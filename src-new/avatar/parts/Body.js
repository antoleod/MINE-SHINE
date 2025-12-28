import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const BODY_SIZES = {
    baby: { width: 110, height: 130, color: 0xf4cdb5 },
    child: { width: 125, height: 165, color: 0xf2c7a8 },
    teen: { width: 138, height: 178, color: 0xf0c3a0 },
    adult: { width: 150, height: 190, color: 0xefbfa0 },
};

const BODY_SHAPES = {
    tiny: { w: 0.92, h: 0.96 },
    soft: { w: 1.02, h: 1.0 },
    tall: { w: 0.98, h: 1.06 },
};

const SKIN_TONES = {
    peach: 0xf2c7a8,
    sand: 0xe8b98a,
    cocoa: 0xc78c6c,
    almond: 0xf3d1b0,
};

export class Body extends PIXI.Container {
    constructor(config) {
        super();
        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);
        this.setStyle(config);
        this.y = 20;
    }

    setStyle(config) {
        const size = BODY_SIZES[config.body] || BODY_SIZES.child;
        const shape = BODY_SHAPES[config.bodySize] || BODY_SHAPES.soft;
        const color = SKIN_TONES[config.skin] || size.color;
        const width = size.width * shape.w;
        const height = size.height * shape.h;
        this.graphic.clear();
        this.graphic.beginFill(color);
        this.graphic.drawRoundedRect(-width / 2, -height / 2, width, height, 42);
        this.graphic.endFill();
        this.graphic.beginFill(0xffffff, 0.18);
        this.graphic.drawRoundedRect(-width / 2 + 8, -height / 2 + 8, width * 0.5, height * 0.6, 30);
        this.graphic.endFill();
    }
}
