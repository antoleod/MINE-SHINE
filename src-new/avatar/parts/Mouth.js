import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

export class Mouth extends PIXI.Container {
    constructor() {
        super();
        this.graphic = new PIXI.Graphics();
        this.addChild(this.graphic);
        this.mood = 'smile';
        this.y = -70;
        this.drawMouth();
    }

    setMood(mood) {
        this.mood = mood;
        this.drawMouth();
    }

    drawMouth() {
        const g = this.graphic;
        g.clear();
        g.lineStyle(5, 0x8a4b3a, 1, 0.5, true);

        if (this.mood === 'o') {
            g.beginFill(0x8a4b3a, 0.2);
            g.drawCircle(0, 0, 10);
            g.endFill();
            return;
        }

        if (this.mood === 'frown') {
            g.arc(0, 8, 16, Math.PI, Math.PI * 2);
            return;
        }

        if (this.mood === 'pout') {
            g.arc(0, 4, 12, Math.PI * 0.9, Math.PI * 2.1);
            return;
        }

        if (this.mood === 'soft') {
            g.arc(0, 6, 10, 0, Math.PI);
            return;
        }

        const big = this.mood === 'bigsmile';
        g.arc(0, 4, big ? 20 : 16, 0, Math.PI);
    }
}
