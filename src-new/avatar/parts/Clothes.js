import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const CLOTHES = {
    casual: { top: 0xffc4a3, bottom: 0x8ecae6 },
    sporty: { top: 0xffd166, bottom: 0x118ab2 },
    cozy: { top: 0xcdb4db, bottom: 0xffc8dd },
    rainy: { top: 0x80b1ff, bottom: 0x3f7bd9 },
    sunny: { top: 0xffe066, bottom: 0xffadad },
    dress: { top: 0xffb5d8, bottom: 0xff8fab, dress: true },
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
        this.top.drawRoundedRect(-64, -34, 128, 86, 28);
        this.top.endFill();
        this.top.beginFill(0xffffff, 0.2);
        this.top.drawRoundedRect(-54, -26, 60, 40, 20);
        this.top.endFill();

        this.bottom.clear();
        this.bottom.beginFill(style.bottom);
        if (style.dress) {
            this.bottom.drawRoundedRect(-70, 34, 140, 90, 34);
        } else {
            this.bottom.drawRoundedRect(-54, 52, 108, 60, 24);
        }
        this.bottom.endFill();
    }
}
