import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { BaseScene } from './BaseScene.js';

export class SchoolScene extends BaseScene {
    init() {
        this.buildWorld({
            sky: 0xfde2e4,
            ground: 0xc8e7ff,
            layers: [0xfde2e4, 0xfad2e1, 0xf0c4d6],
            accent: 0xffffff,
        });

        const board = new PIXI.Graphics();
        board.beginFill(0x5e548e);
        board.drawRoundedRect(360, 260, 520, 200, 20);
        board.endFill();
        board.beginFill(0xffffff);
        board.drawRoundedRect(400, 300, 160, 8, 4);
        board.endFill();
        this.container.addChild(board);
    }
}
