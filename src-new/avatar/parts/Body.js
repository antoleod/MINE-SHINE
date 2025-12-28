import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const BODY_SIZES = {
    child: { width: 120, height: 160, color: 0xf2c7a8 },
    teen: { width: 135, height: 175, color: 0xf0c3a0 },
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
        const color = SKIN_TONES[config.skin] || size.color;
        this.graphic.clear();
        this.graphic.beginFill(color);
        this.graphic.drawRoundedRect(-size.width / 2, -size.height / 2, size.width, size.height, 36);
        this.graphic.endFill();
    }
}
