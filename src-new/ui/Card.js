import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { setRoundedRect } from '../utils/Helpers.js';

export class Card {
    constructor({ width = 180, height = 140, color = 0xffffff, label = '' }) {
        this.container = new PIXI.Container();
        this.bg = new PIXI.Graphics();
        setRoundedRect(this.bg, -width / 2, -height / 2, width, height, 20, color, 0.95);
        this.label = new PIXI.Text(label, {
            fontFamily: 'Trebuchet MS',
            fontSize: 16,
            fill: 0x333333,
        });
        this.label.anchor.set(0.5, 0.5);
        this.container.addChild(this.bg, this.label);
        this.container.eventMode = 'static';
        this.container.cursor = 'pointer';
    }
}
