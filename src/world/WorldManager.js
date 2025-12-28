import { AmbientFX } from './AmbientFX.js';
import { Parallax } from './Parallax.js';

export class WorldManager {
    constructor(app, appState, eventBus) {
        this.app = app;
        this.appState = appState;
        this.eventBus = eventBus;
        this.ambientFX = new AmbientFX();
        this.parallax = new Parallax();
        this.currentWorld = null;
    }

    init() {
        this.ambientFX.init(this.app);
        this.parallax.init(this.app);
    }

    setWorld(worldName) {
        this.currentWorld = worldName;
        this.ambientFX.setTheme(worldName);
        this.parallax.setBackground(worldName);
    }

    update(delta) {
        this.ambientFX.update(delta);
        this.parallax.update(delta);
    }
}