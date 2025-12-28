import { AppState } from './AppState.js';
import { EventBus } from './EventBus.js';
import { SceneManager } from '../scene/SceneManager.js';
import { UIManager } from '../ui/UIManager.js';
import { InputManager } from '../interaction/InputManager.js';
import { SaveManager } from '../save/SaveManager.js';
import { WorldManager } from '../world/WorldManager.js';

export class Game {
    constructor() {
        this.app = null;
        this.appState = new AppState();
        this.eventBus = new EventBus();
        this.sceneContainer = new PIXI.Container();
        this.sceneManager = null;
        this.uiManager = null;
        this.inputManager = null;
        this.saveManager = null;
        this.worldManager = null;
    }

    init() {
        // Initialize PixiJS app
        this.app = new PIXI.Application({
            view: document.getElementById('game-canvas'),
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0xffffff,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        // Initialize managers
        this.saveManager = new SaveManager(this.appState);
        this.sceneManager = new SceneManager(this.app, this.appState, this.eventBus, this.sceneContainer);
        this.uiManager = new UIManager(this.app, this.appState, this.eventBus);
        this.inputManager = new InputManager(this.app, this.eventBus);
        this.worldManager = new WorldManager(this.app, this.appState, this.eventBus);

        // Add containers to stage
        this.app.stage.addChild(this.sceneContainer);
        this.app.stage.addChild(this.uiManager.container);
        
        // Init managers
        this.uiManager.init();
        this.inputManager.init();
        this.worldManager.init();

        // Load saved data
        this.saveManager.load();

        // Start the game loop
        this.app.ticker.add((delta) => this.update(delta));

        // Start with home scene
        this.sceneManager.changeScene('HomeScene');

        // Listen for scene changes
        this.eventBus.on('changeScene', (sceneName) => this.sceneManager.changeScene(sceneName));

        // Resize handling
        window.addEventListener('resize', () => this.resize());
    }

    update(delta) {
        this.sceneManager.update(delta);
        this.uiManager.update(delta);
        this.worldManager.update(delta);
    }

    resize() {
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
        this.sceneManager.resize();
        this.uiManager.resize();
    }
}