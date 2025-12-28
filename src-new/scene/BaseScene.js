import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { Parallax } from '../world/Parallax.js';
import { AmbientFX } from '../world/AmbientFX.js';

export class BaseScene {
    constructor(appState, eventBus, app) {
        this.appState = appState;
        this.eventBus = eventBus;
        this.app = app;
        this.container = new PIXI.Container();
        this.parallax = null;
        this.ambient = null;
        this.palette = { sky: 0xcfe9ff, ground: 0xf6f2ea, layers: [0xcfe9ff, 0xbad8ff, 0xa8c9f5] };
    }

    init() {}
    enter() {}
    exit() {}

    buildWorld(palette) {
        this.palette = palette;
        this.parallax = new Parallax(this.app.screen.width, this.app.screen.height, palette);
        this.ambient = new AmbientFX(this.app.screen.width, this.app.screen.height, palette);
        this.container.addChild(this.parallax.container, this.ambient.container);
        this.eventBus.emit('scene:palette', palette);
    }

    update(time) {
        if (this.parallax) this.parallax.update(time);
        if (this.ambient) this.ambient.update(time);
    }

    resize() {}
}
