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
        const style = config.accessories || 'none';
        if (style === 'none') return;

        if (style === 'earrings') {
            this.graphic.beginFill(0xffe066);
            this.graphic.drawCircle(-42, -18, 6);
            this.graphic.drawCircle(42, -18, 6);
            this.graphic.endFill();
            return;
        }

        if (style === 'glasses') {
            this.graphic.lineStyle(4, 0x5f5047, 1);
            this.graphic.drawRoundedRect(-46, -10, 34, 22, 8);
            this.graphic.drawRoundedRect(12, -10, 34, 22, 8);
            this.graphic.moveTo(-12, 0);
            this.graphic.lineTo(12, 0);
            return;
        }

        if (style === 'hat') {
            this.graphic.beginFill(0xa0c4ff);
            this.graphic.drawRoundedRect(-60, -90, 120, 34, 16);
            this.graphic.drawRoundedRect(-36, -120, 72, 40, 18);
            this.graphic.endFill();
            this.graphic.beginFill(0xffffff, 0.25);
            this.graphic.drawCircle(-14, -102, 10);
            this.graphic.endFill();
            return;
        }

        this.graphic.beginFill(0xffe066);
        this.graphic.drawCircle(0, 0, 10);
        this.graphic.endFill();
    }
}
