import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { TouchFeedback } from '../interaction/TouchFeedback.js';

const FURNITURE_STYLES = {
    bed: { color: 0xffc8dd, w: 180, h: 90 },
    table: { color: 0xffd166, w: 140, h: 70 },
    lamp: { color: 0xfff1c1, w: 70, h: 110 },
    toybox: { color: 0xa0c4ff, w: 120, h: 80 },
    rug: { color: 0xf7b2b7, w: 220, h: 70 },
    plant: { color: 0xb7e4c7, w: 80, h: 120 },
    shelf: { color: 0xf6bd60, w: 150, h: 90 },
    sofa: { color: 0xcdb4db, w: 200, h: 100 },
};

export class Furniture extends PIXI.Container {
    constructor(type, position) {
        super();
        this.type = type;
        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);
        this.setStyle(type);
        this.x = position.x;
        this.y = position.y;
        this.eventMode = 'static';
        this.cursor = 'pointer';
        this.on('pointertap', () => TouchFeedback.bounce(this));
    }

    setStyle(type) {
        const style = FURNITURE_STYLES[type] || FURNITURE_STYLES.bed;
        this.graphic.clear();
        this.graphic.beginFill(style.color);
        this.graphic.drawRoundedRect(-style.w / 2, -style.h / 2, style.w, style.h, 18);
        this.graphic.endFill();
        this.graphic.beginFill(0xffffff, 0.2);
        this.graphic.drawRoundedRect(-style.w / 2 + 10, -style.h / 2 + 8, style.w * 0.45, style.h * 0.4, 12);
        this.graphic.endFill();

        if (this.type === 'plant') {
            this.graphic.beginFill(0x6a994e);
            this.graphic.drawCircle(0, -30, 22);
            this.graphic.endFill();
        }

        if (this.type === 'lamp') {
            this.graphic.beginFill(0xffffff, 0.6);
            this.graphic.drawCircle(0, -30, 24);
            this.graphic.endFill();
        }
    }

    serialize() {
        return { type: this.type, x: this.x, y: this.y };
    }
}
