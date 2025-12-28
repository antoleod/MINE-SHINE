import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

export class Eyebrows extends PIXI.Container {
    constructor() {
        super();
        this.left = new PIXI.Graphics();
        this.right = new PIXI.Graphics();
        this.addChild(this.left, this.right);
        this.mood = 'soft';
        this.y = -125;
        this.drawBrows();
    }

    setMood(mood) {
        this.mood = mood;
        this.drawBrows();
    }

    setLook(offset) {
        this.left.y = offset.y * 4;
        this.right.y = offset.y * 4;
    }

    drawBrows() {
        const draw = (g, x, rotation, lift) => {
            g.clear();
            g.lineStyle(6, 0x5a3b2c, 1, 0.5, true);
            g.moveTo(x - 18, -4 + lift);
            g.lineTo(x + 18, 4 + lift);
            g.rotation = rotation;
        };

        let rotation = 0;
        let lift = 0;
        if (this.mood === 'sad') {
            rotation = 0.2;
            lift = 6;
        }
        if (this.mood === 'raised') {
            lift = -6;
        }
        if (this.mood === 'angry') {
            rotation = -0.25;
            lift = 2;
        }

        draw(this.left, -30, rotation, lift);
        draw(this.right, 30, -rotation, lift);
    }
}
