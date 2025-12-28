import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { setRoundedRect } from '../utils/Helpers.js';
import { TouchFeedback } from '../interaction/TouchFeedback.js';

export class Button {
    constructor({ width = 90, height = 90, color = 0xffffff, label = '' }) {
        this.container = new PIXI.Container();
        this.bg = new PIXI.Graphics();
        this.label = new PIXI.Text(label, {
            fontFamily: 'Trebuchet MS',
            fontSize: 14,
            fill: 0x3a3a3a,
        });
        setRoundedRect(this.bg, -width / 2, -height / 2, width, height, 24, color, 1);
        this.label.anchor.set(0.5, 0.5);
        this.label.y = height * 0.32;
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
