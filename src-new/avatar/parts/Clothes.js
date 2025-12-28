import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const CLOTHES = {
    casual: { top: 0xffc4a3, bottom: 0x8ecae6 },
    sporty: { top: 0xffd166, bottom: 0x118ab2 },
    cozy: { top: 0xcdb4db, bottom: 0xffc8dd },
};

export class Clothes extends PIXI.Container {
    constructor(config) {
        super();
        this.top = new PIXI.Graphics();
        this.bottom = new PIXI.Graphics();
        this.addChild(this.top, this.bottom);
        this.setStyle(config);
        this.y = 10;
    }

    setStyle(config) {
        const style = CLOTHES[config.clothes] || CLOTHES.casual;
        this.top.clear();
        this.top.beginFill(style.top);
        this.top.drawRoundedRect(-60, -30, 120, 80, 26);
        this.top.endFill();

        this.bottom.clear();
        this.bottom.beginFill(style.bottom);
        this.bottom.drawRoundedRect(-50, 50, 100, 60, 24);
        this.bottom.endFill();
    }
}
