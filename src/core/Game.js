import { AppState } from './AppState.js';
import { EventBus } from './EventBus.js';
import { SceneManager } from '../scene/SceneManager.js';
import { UIManager } from '../ui/UIManager.js';
import { InputManager } from '../interaction/InputManager.js';
import { SaveManager } from '../save/SaveManager.js';
import { WorldManager } from '../world/WorldManager.js';

export class Game {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.appState = new AppState();
        this.eventBus = new EventBus();
        this.sceneContainer = new THREE.Group();
        this.sceneManager = null;
        this.uiManager = null;
        this.inputManager = null;
        this.saveManager = null;
        this.worldManager = null;
    }

    init() {
        // Initialize Three.js scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f8ff);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.getElementById('game-canvas').appendChild(this.renderer.domElement);

        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // Lights
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Resize handling
        window.addEventListener('resize', () => this.resize());

        // Initialize managers
        this.saveManager = new SaveManager(this.appState);
        this.sceneManager = new SceneManager(this.scene, this.appState, this.eventBus, this.sceneContainer);
        this.uiManager = new UIManager(this.scene, this.appState, this.eventBus);
        this.inputManager = new InputManager(this.scene, this.camera, this.eventBus);
        this.worldManager = new WorldManager(this.scene, this.appState, this.eventBus);

        // Add scene container
        this.scene.add(this.sceneContainer);

        // Init managers
        this.uiManager.init();
        this.inputManager.init();
        this.worldManager.init();

        // Load saved data
        this.saveManager.load();

        // Start with home scene
        this.sceneManager.changeScene('HomeScene');

        // Listen for scene changes
        this.eventBus.on('changeScene', (sceneName) => this.sceneManager.changeScene(sceneName));

        // Start render loop
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.sceneManager.update();
        this.uiManager.update();
        this.worldManager.update();
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.sceneManager.resize();
        this.uiManager.resize();
    }
}