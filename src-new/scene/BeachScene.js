import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { BaseScene } from './BaseScene.js';

export class BeachScene extends BaseScene {
    init() {
        this.buildWorld({
            sky: 0xbde0fe,
            ground: 0xfef3c7,
            layers: [0xbde0fe, 0xa2d2ff, 0x90cdf4],
            accent: 0xffffff,
        });

        const water = new PIXI.Graphics();
        water.beginFill(0x8ecae6);
        water.drawRoundedRect(0, 420, this.app.screen.width, 120, 40);
        water.endFill();
        this.container.addChild(water);

        const umbrella = new PIXI.Graphics();
        umbrella.beginFill(0xffb703);
        umbrella.drawCircle(260, 430, 60);
        umbrella.endFill();
        umbrella.beginFill(0xffffff);
        umbrella.drawRect(255, 430, 10, 90);
        umbrella.endFill();
        this.container.addChild(umbrella);
    }
}
