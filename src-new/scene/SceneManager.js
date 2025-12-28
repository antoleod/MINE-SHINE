import { HomeScene } from './HomeScene.js';
import { ParkScene } from './ParkScene.js';
import { ShopScene } from './ShopScene.js';
import { BeachScene } from './BeachScene.js';
import { CityScene } from './CityScene.js';
import { SchoolScene } from './SchoolScene.js';
import { NightScene } from './NightScene.js';

const SCENES = {
    HomeScene,
    ParkScene,
    ShopScene,
    BeachScene,
    CityScene,
    SchoolScene,
    NightScene,
};

export class SceneManager {
    constructor(container, appState, eventBus, app) {
        this.container = container;
        this.appState = appState;
        this.eventBus = eventBus;
        this.app = app;
        this.current = null;
        this.cache = new Map();
    }

    changeScene(name) {
        if (this.current) {
            this.current.exit();
            this.container.removeChild(this.current.container);
        }
        let scene = this.cache.get(name);
        if (!scene) {
            const SceneClass = SCENES[name];
            scene = new SceneClass(this.appState, this.eventBus, this.app);
            scene.init();
            this.cache.set(name, scene);
        }
        this.current = scene;
        this.container.addChild(this.current.container);
        this.current.enter();
    }

    update(time) {
        if (this.current) this.current.update(time);
    }

    resize() {
        if (this.current) this.current.resize();
    }
}
