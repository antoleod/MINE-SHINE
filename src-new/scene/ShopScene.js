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
        counter.drawRoundedRect(290, 420, 540, 120, 34);
        counter.endFill();
        counter.beginFill(0xffffff, 0.2);
        counter.drawRoundedRect(320, 440, 180, 40, 20);
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

        const shelf = new PIXI.Graphics();
        shelf.beginFill(0xffc8dd);
        shelf.drawRoundedRect(900, 320, 180, 140, 26);
        shelf.endFill();
        shelf.beginFill(0xffffff, 0.2);
        shelf.drawRoundedRect(920, 338, 80, 30, 16);
        shelf.endFill();
        this.container.addChild(shelf);
    }
}
