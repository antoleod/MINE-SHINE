import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { setRoundedRect } from '../utils/Helpers.js';
import { TouchFeedback } from '../interaction/TouchFeedback.js';

export class Button {
    constructor({ width = 90, height = 90, color = 0xffffff, label = '' }) {
        this.container = new PIXI.Container();
        this.bg = new PIXI.Graphics();
        this.label = new PIXI.Text(label, {
            fontFamily: 'Fredoka, Trebuchet MS, sans-serif',
            fontSize: 13,
            fill: 0x4a3f3b,
        });
        setRoundedRect(this.bg, -width / 2, -height / 2, width, height, 24, color, 1);
        this.label.anchor.set(0.5, 0.5);
        this.label.y = height * 0.34;
        this.container.addChild(this.bg, this.label);
        this.container.eventMode = 'static';
        this.container.cursor = 'pointer';
        this.container.on('pointertap', () => TouchFeedback.bounce(this.container));
    }

    setIcon(iconGraphic) {
        iconGraphic.y = -6;
        this.container.addChild(iconGraphic);
    }

    onClick(handler) {
        this.container.on('pointertap', handler);
    }
}
