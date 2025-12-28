import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { BaseScene } from './BaseScene.js';

export class ShopScene extends BaseScene {
    init() {
        this.buildWorld({
            sky: 0xfff1c8,
            ground: 0xf5d4a5,
            layers: [0xfff1c8, 0xffe1a8, 0xfbd08b],
            accent: 0xffffff,
        });

        const counter = new PIXI.Graphics();
        counter.beginFill(0xf4a261);
        counter.drawRoundedRect(300, 420, 520, 120, 30);
        counter.endFill();
        this.container.addChild(counter);

        const rack = new PIXI.Graphics();
        rack.beginFill(0x90be6d);
        rack.drawRoundedRect(110, 320, 120, 200, 24);
        rack.endFill();
        rack.beginFill(0xffffff);
        rack.drawCircle(170, 360, 20);
        rack.drawCircle(170, 420, 20);
        rack.endFill();
        this.container.addChild(rack);
    }
}
