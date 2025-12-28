import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const HAIR_COLORS = {
    chestnut: 0x7a4a2a,
    midnight: 0x2a1b1a,
    honey: 0xc59a54,
    auburn: 0x9b4a3a,
};

export class Hair extends PIXI.Container {
    constructor(config) {
        super();
        this.back = new PIXI.Graphics();
        this.front = new PIXI.Graphics();
        this.addChild(this.back, this.front);
        this.setStyle(config);
        this.y = -120;
    }

    setStyle(config) {
        const color = HAIR_COLORS[config.hairColor] || HAIR_COLORS.chestnut;
        this.back.clear();
        this.back.beginFill(color);
        this.back.drawRoundedRect(-70, -30, 140, 70, 30);
        this.back.endFill();

        this.front.clear();
        this.front.beginFill(color);
        this.front.drawRoundedRect(-65, -50, 130, 45, 22);
        this.front.endFill();
    }
}
