import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';

export class WorldManager {
    constructor(container, appState, eventBus, app) {
        this.container = container;
        this.appState = appState;
        this.eventBus = eventBus;
        this.app = app;
        this.background = new PIXI.Graphics();
        this.currentPalette = { sky: 0xcfe9ff, ground: 0xf6f2ea };
        this.container.addChild(this.background);
    }

    init() {
        this.drawBackground({ sky: 0xcfe9ff, ground: 0xf6f2ea });
        this.eventBus.on('scene:palette', (palette) => this.drawBackground(palette));
    }

    drawBackground(palette) {
        this.currentPalette = palette;
        const w = this.app.screen.width;
        const h = this.app.screen.height;
        this.background.clear();
        this.background.beginFill(palette.sky || 0xcfe9ff);
        this.background.drawRect(0, 0, w, h * 0.65);
        this.background.endFill();
        this.background.beginFill(palette.ground || 0xf6f2ea);
        this.background.drawRect(0, h * 0.65, w, h * 0.35);
        this.background.endFill();
    }

    update() {}

    resize() {
        this.drawBackground(this.currentPalette);
    }
}
