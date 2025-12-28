import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

export class Parallax {
    constructor(width, height, palette) {
        this.container = new PIXI.Container();
        this.layers = [];
        this.speed = [0.05, 0.1, 0.2];
        this.width = width;
        this.height = height;
        this.createLayers(palette);
    }

    createLayers(palette) {
        const colors = palette.layers || [0xcfe9ff, 0xbad8ff, 0xa8c9f5];
        colors.forEach((color, index) => {
            const g = new PIXI.Graphics();
            g.beginFill(color);
            g.drawRoundedRect(0, this.height - 200 - index * 60, this.width, 200 + index * 60, 80);
            g.endFill();
            this.container.addChild(g);
            this.layers.push(g);
        });
    }

    update(time) {
        this.layers.forEach((layer, index) => {
            layer.x = Math.sin(time.elapsed * 0.0002 + index) * 6 * this.speed[index];
        });
    }
}
