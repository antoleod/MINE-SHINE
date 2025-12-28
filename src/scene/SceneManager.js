import { BaseScene } from './BaseScene.js';
import { HomeScene } from './HomeScene.js';
import { ParkScene } from './ParkScene.js';
import { ShopScene } from './ShopScene.js';
import { BeachScene } from './BeachScene.js';
import { CityScene } from './CityScene.js';
import { SchoolScene } from './SchoolScene.js';
import { NightScene } from './NightScene.js';

export class SceneManager {
    constructor(app, appState, eventBus, sceneContainer) {
        this.app = app;
        this.appState = appState;
        this.eventBus = eventBus;
        this.sceneContainer = sceneContainer;
        this.currentScene = null;
        this.scenes = {
            HomeScene: HomeScene,
            ParkScene: ParkScene,
            ShopScene: ShopScene,
            BeachScene: BeachScene,
            CityScene: CityScene,
            SchoolScene: SchoolScene,
            NightScene: NightScene
        };
    }

    changeScene(sceneName) {
        if (this.currentScene) {
            this.currentScene.destroy();
            this.sceneContainer.removeChild(this.currentScene.container);
        }

        const SceneClass = this.scenes[sceneName];
        if (SceneClass) {
            this.currentScene = new SceneClass(this.app, this.appState, this.eventBus);
            this.sceneContainer.addChild(this.currentScene.container);
            this.currentScene.init();
            this.appState.currentScene = sceneName;
        }
    }

    update(delta) {
        if (this.currentScene) {
            this.currentScene.update(delta);
        }
    }

    resize() {
        if (this.currentScene) {
            this.currentScene.resize();
        }
    }
}