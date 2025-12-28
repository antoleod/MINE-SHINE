import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

const EYE_COLORS = {
    brown: 0x6b3f2a,
    blue: 0x3a74b7,
    green: 0x3e8c63,
    hazel: 0x7b6a3b,
};

export class Eyes extends PIXI.Container {
    constructor(config) {
        super();
        this.left = new PIXI.Graphics();
        this.right = new PIXI.Graphics();
        this.addChild(this.left, this.right);
        this.mood = 'smile';
        this.eyeColor = EYE_COLORS[config.eyeColor] || EYE_COLORS.brown;
        this.drawEyes();
        this.y = -105;
    }

    setMood(mood) {
        this.mood = mood;
        this.drawEyes();
    }

    setLook(offset) {
        this.left.pivot.set(-offset.x * 12, -offset.y * 8);
        this.right.pivot.set(-offset.x * 12, -offset.y * 8);
    }

    blink() {
        const original = this.scale.y;
        this.scale.y = 0.1;
        setTimeout(() => {
            this.scale.y = original;
        }, 120);
    }

    drawEyes() {
        const width = 24;
        const height = this.mood === 'sleepy' ? 8 : 16;
        const focused = this.mood === 'focus';
        const openHeight = this.mood === 'wide' ? 22 : (focused ? 12 : height);
        const sparkle = this.mood === 'sparkle' ? 1 : 0;

        const draw = (g, x) => {
            g.clear();
            g.beginFill(0xffffff);
            g.drawRoundedRect(x - width / 2, -openHeight / 2, width, openHeight, 8);
            g.endFill();
            g.beginFill(this.eyeColor);
            g.drawCircle(x, 0, 6 + sparkle);
            g.endFill();
            g.beginFill(0xffffff, 0.9);
            g.drawCircle(x + 3, -3, 2 + sparkle);
            g.endFill();
        };

        draw(this.left, -28);
        draw(this.right, 28);

        if (this.mood === 'droop') {
            this.left.rotation = 0.1;
            this.right.rotation = -0.1;
        } else {
            this.left.rotation = 0;
            this.right.rotation = 0;
        }
    }
}
