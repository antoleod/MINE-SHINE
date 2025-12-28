import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { BaseScene } from './BaseScene.js';

export class CityScene extends BaseScene {
    init() {
        this.buildWorld({
            sky: 0xd7e3fc,
            ground: 0xcad2c5,
            layers: [0xd7e3fc, 0xc9d6f1, 0xb6c6ea],
            accent: 0xffffff,
        });

        const building = new PIXI.Graphics();
        building.beginFill(0x9fa0ff);
        building.drawRoundedRect(120, 220, 200, 280, 20);
        building.endFill();
        building.beginFill(0xffffff, 0.7);
        for (let i = 0; i < 4; i += 1) {
            building.drawRoundedRect(150, 250 + i * 60, 60, 30, 8);
            building.drawRoundedRect(230, 250 + i * 60, 60, 30, 8);
        }
        building.endFill();
        this.container.addChild(building);
    }
}
