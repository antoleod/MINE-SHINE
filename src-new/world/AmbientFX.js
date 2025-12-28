import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { MathUtil } from '../utils/Math.js';

export class AmbientFX {
    constructor(width, height, palette) {
        this.container = new PIXI.Container();
        this.particles = [];
        this.width = width;
        this.height = height;
        this.palette = palette;
        this.spawn();
    }

    spawn() {
        const count = 6;
        for (let i = 0; i < count; i += 1) {
            const g = new PIXI.Graphics();
            g.beginFill(this.palette.accent || 0xffffff, 0.6);
            g.drawCircle(0, 0, MathUtil.rand(18, 36));
            g.endFill();
            g.x = MathUtil.rand(80, this.width - 80);
            g.y = MathUtil.rand(80, this.height - 260);
            g.alpha = MathUtil.rand(0.3, 0.7);
            g.speed = MathUtil.rand(0.3, 0.8);
            this.container.addChild(g);
            this.particles.push(g);
        }
    }

    update(time) {
        this.particles.forEach((p, index) => {
            p.x += Math.sin(time.elapsed * 0.0002 + index) * p.speed;
            p.y += Math.cos(time.elapsed * 0.00015 + index) * p.speed;
        });
    }
}
