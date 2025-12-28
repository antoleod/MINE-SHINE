import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { setRoundedRect } from '../utils/Helpers.js';
import { Ease } from '../utils/Ease.js';
import { Card } from './Card.js';

export class Panel {
    constructor(app) {
        this.app = app;
        this.container = new PIXI.Container();
        this.overlay = new PIXI.Graphics();
        this.bg = new PIXI.Graphics();
        this.content = new PIXI.Container();
        this.container.addChild(this.overlay, this.bg, this.content);
        this.visible = false;
        this.progress = 0;
        this.target = 0;
        this.draw();
        this.container.visible = false;
    }

    draw() {
        const w = this.app.screen.width * 0.84;
        const h = this.app.screen.height * 0.5;
        this.overlay.clear();
        this.overlay.beginFill(0x000000, 0.2);
        this.overlay.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        this.overlay.endFill();
        this.overlay.eventMode = 'static';
        this.overlay.on('pointertap', () => this.close());
        setRoundedRect(this.bg, -w / 2, -h / 2, w, h, 30, 0xffffff, 0.96);
        this.container.x = 0;
        this.container.y = 0;
        this.bg.x = this.app.screen.width / 2;
        this.bg.y = this.app.screen.height / 2;
        this.content.x = this.app.screen.width / 2;
        this.content.y = this.app.screen.height / 2;
        this.container.scale.set(0.9);
        this.container.alpha = 0;
    }

    open(payload) {
        this.visible = true;
        this.container.visible = true;
        this.target = 1;
        this.content.removeChildren();
        if (payload && payload.cards) {
            const gap = 200;
            payload.cards.forEach((cardData, index) => {
                const card = new Card({ label: cardData.label, color: cardData.color });
                card.container.x = (index - (payload.cards.length - 1) / 2) * gap;
                card.container.y = 10;
                card.container.on('pointertap', cardData.action);
                this.content.addChild(card.container);
            });
        }
    }

    close() {
        this.target = 0;
    }

    update() {
        this.progress += (this.target - this.progress) * 0.1;
        const eased = Ease.outCubic(this.progress);
        this.container.alpha = eased;
        const scale = 0.9 + 0.1 * eased;
        this.bg.scale.set(scale);
        this.content.scale.set(scale);
        if (this.progress < 0.01 && this.target === 0) {
            this.container.alpha = 0;
            this.visible = false;
            this.container.visible = false;
        }
    }

    resize() {
        this.draw();
    }
}
