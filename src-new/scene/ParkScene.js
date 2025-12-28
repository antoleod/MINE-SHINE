import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { BaseScene } from './BaseScene.js';
import { MathUtil } from '../utils/Math.js';

export class ParkScene extends BaseScene {
    init() {
        this.buildWorld({
            sky: 0xcfe9ff,
            ground: 0xb7e4c7,
            layers: [0xcfe9ff, 0xbfdff5, 0xa6d4ee],
            accent: 0xffffff,
        });
        this.props = [];
        const tree = new PIXI.Graphics();
        tree.beginFill(0x7f5539);
        tree.drawRoundedRect(-20, 0, 40, 120, 14);
        tree.endFill();
        tree.beginFill(0x77b255);
        tree.drawCircle(0, -20, 70);
        tree.drawCircle(-30, -40, 40);
        tree.drawCircle(30, -40, 40);
        tree.endFill();
        tree.x = 220;
        tree.y = 360;
        this.container.addChild(tree);

        const bunny = new PIXI.Graphics();
        bunny.beginFill(0xffffff);
        bunny.drawCircle(0, 0, 22);
        bunny.drawCircle(-10, -20, 8);
        bunny.drawCircle(10, -20, 8);
        bunny.endFill();
        bunny.x = 940;
        bunny.y = 510;
        this.container.addChild(bunny);
        this.props.push({ sprite: bunny, speed: MathUtil.rand(0.001, 0.002) });

        const kite = new PIXI.Graphics();
        kite.beginFill(0xffb703);
        kite.drawRoundedRect(-18, -18, 36, 36, 10);
        kite.endFill();
        kite.x = 820;
        kite.y = 180;
        this.container.addChild(kite);
        this.props.push({ sprite: kite, speed: MathUtil.rand(0.0008, 0.0014) });
    }

    update(time) {
        super.update(time);
        this.props.forEach((prop, index) => {
            prop.sprite.y += Math.sin(time.elapsed * 0.002 + index) * 0.4;
        });
    }
}
