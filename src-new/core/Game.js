import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { AppState } from './AppState.js';
import { EventBus } from './EventBus.js';
import { SceneManager } from '../scene/SceneManager.js';
import { UIManager } from '../ui/UIManager.js';
import { InputManager } from '../interaction/InputManager.js';
import { SaveManager } from '../save/SaveManager.js';
import { WorldManager } from '../world/WorldManager.js';
import { Time } from './Time.js';
import { Config } from './Config.js';
import { Progression } from '../save/Progression.js';

export class Game {
    constructor() {
        this.app = null;
        this.appState = new AppState();
        this.eventBus = new EventBus();
        this.time = new Time();
        this.sceneManager = null;
        this.uiManager = null;
        this.inputManager = null;
        this.saveManager = null;
        this.worldManager = null;
        this.layers = {};
        this.progression = null;
    }

    init() {
        this.app = new PIXI.Application({
            resizeTo: window,
            backgroundColor: Config.app.background,
            antialias: true,
            autoDensity: true,
            resolution: window.devicePixelRatio || 1,
        });

        const mount = document.getElementById('app');
        mount.appendChild(this.app.view);

        this.app.stage.eventMode = 'static';
        this.app.stage.hitArea = this.app.screen;

        this.layers.world = new PIXI.Container();
        this.layers.scene = new PIXI.Container();
        this.layers.ui = new PIXI.Container();
        this.app.stage.addChild(this.layers.world, this.layers.scene, this.layers.ui);

        this.sceneManager = new SceneManager(this.layers.scene, this.appState, this.eventBus, this.app);
        this.uiManager = new UIManager(this.layers.ui, this.appState, this.eventBus, this.app);
        this.inputManager = new InputManager(this.app, this.eventBus);
        this.worldManager = new WorldManager(this.layers.world, this.appState, this.eventBus, this.app);
        this.saveManager = new SaveManager(this.appState, this.eventBus);
        this.progression = new Progression(this.appState);

        this.uiManager.init();
        this.inputManager.init();
        this.worldManager.init();
        this.saveManager.load();
        this.saveManager.watch();

        this.sceneManager.changeScene(this.appState.get('currentScene'));

        this.eventBus.on('scene:change', (sceneName) => {
            this.appState.set('currentScene', sceneName);
            this.progression.visitWorld(sceneName);
            this.sceneManager.changeScene(sceneName);
        });

        this.app.ticker.add(() => this.update());
        window.addEventListener('resize', () => this.resize());
    }

    update() {
        this.time.tick();
        this.worldManager.update(this.time);
        this.sceneManager.update(this.time);
        this.uiManager.update(this.time);
    }

    resize() {
        this.sceneManager.resize();
        this.uiManager.resize();
        this.worldManager.resize();
    }
}
