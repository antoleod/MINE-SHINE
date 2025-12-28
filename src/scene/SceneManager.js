import { BaseScene } from './BaseScene.js';
import { HomeScene } from './HomeScene.js';
import { ParkScene } from './ParkScene.js';
import { ShopScene } from './ShopScene.js';
import { BeachScene } from './BeachScene.js';
import { CityScene } from './CityScene.js';
import { SchoolScene } from './SchoolScene.js';
import { NightScene } from './NightScene.js';

export class SceneManager {
    constructor(scene, appState, eventBus, sceneContainer) {
        this.scene = scene;
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
            this.sceneContainer.remove(this.currentScene.container);
        }

        const SceneClass = this.scenes[sceneName];
        if (SceneClass) {
            this.currentScene = new SceneClass(this.scene, this.appState, this.eventBus);
            this.sceneContainer.add(this.currentScene.container);
            this.currentScene.init();
            this.appState.currentScene = sceneName;
        }
    }

    update() {
        if (this.currentScene) {
            this.currentScene.update();
        }
    }

    resize() {
        if (this.currentScene) {
            this.currentScene.resize();
        }
    }
}