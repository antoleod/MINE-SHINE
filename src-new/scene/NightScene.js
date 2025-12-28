import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { BaseScene } from './BaseScene.js';

export class NightScene extends BaseScene {
    init() {
        this.buildWorld({
            sky: 0x14213d,
            ground: 0x1f2a44,
            layers: [0x14213d, 0x1b2a4a, 0x23345c],
            accent: 0xffffff,
        });

        const moon = new PIXI.Graphics();
        moon.beginFill(0xfff4d0);
        moon.drawCircle(980, 140, 50);
        moon.endFill();
        this.container.addChild(moon);

        const stars = new PIXI.Graphics();
        stars.beginFill(0xffffff, 0.7);
        for (let i = 0; i < 12; i += 1) {
            stars.drawCircle(120 + i * 80, 120 + (i % 3) * 40, 4);
        }
        stars.endFill();
        this.container.addChild(stars);
    }
}
