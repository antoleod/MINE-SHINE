import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const HAIR_COLORS = {
    chestnut: 0x7a4a2a,
    midnight: 0x2a1b1a,
    honey: 0xc59a54,
    auburn: 0x9b4a3a,
    lilac: 0x8f6bb0,
};

export class Hair extends PIXI.Container {
    constructor(config) {
        super();
        this.back = new PIXI.Graphics();
        this.front = new PIXI.Graphics();
        this.addChild(this.back, this.front);
        this.setStyle(config);
        this.back.y = -120;
        this.front.y = -120;
    }

    setStyle(config) {
        const color = HAIR_COLORS[config.hairColor] || HAIR_COLORS.chestnut;
        const style = config.hair || 'puff';
        this.back.clear();
        this.front.clear();

        if (style === 'waves') {
            this.back.beginFill(color);
            this.back.drawRoundedRect(-76, -26, 152, 78, 36);
            this.back.endFill();
            this.front.beginFill(color);
            this.front.drawRoundedRect(-70, -58, 140, 50, 26);
            this.front.endFill();
            this.front.beginFill(0xffffff, 0.12);
            this.front.drawCircle(-30, -32, 16);
            this.front.endFill();
            return;
        }

        if (style === 'long') {
            this.back.beginFill(color);
            this.back.drawRoundedRect(-84, -18, 168, 120, 38);
            this.back.endFill();
            this.front.beginFill(color);
            this.front.drawRoundedRect(-74, -60, 148, 54, 30);
            this.front.endFill();
            return;
        }

        if (style === 'pixie') {
            this.back.beginFill(color);
            this.back.drawRoundedRect(-70, -24, 140, 50, 24);
            this.back.endFill();
            this.front.beginFill(color);
            this.front.drawRoundedRect(-68, -58, 136, 44, 22);
            this.front.endFill();
            return;
        }

        if (style === 'bob') {
            this.back.beginFill(color);
            this.back.drawRoundedRect(-74, -18, 148, 74, 32);
            this.back.endFill();
            this.front.beginFill(color);
            this.front.drawRoundedRect(-70, -55, 140, 48, 26);
            this.front.endFill();
            return;
        }

        this.back.beginFill(color);
        this.back.drawRoundedRect(-78, -20, 156, 70, 36);
        this.back.endFill();
        this.back.beginFill(0xffffff, 0.15);
        this.back.drawCircle(-40, -6, 18);
        this.back.endFill();
        this.front.beginFill(color);
        this.front.drawRoundedRect(-70, -58, 140, 50, 28);
        this.front.endFill();
    }
}
