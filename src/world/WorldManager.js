import { AmbientFX } from './AmbientFX.js';
import { Parallax } from './Parallax.js';

export class WorldManager {
    constructor(scene, appState, eventBus) {
        this.scene = scene;
        this.appState = appState;
        this.eventBus = eventBus;
        this.ambientFX = new AmbientFX();
        this.parallax = new Parallax();
        this.currentWorld = null;
        this.lights = [];
    }

    init() {
        this.ambientFX.init(this.scene);
        this.parallax.init(this.scene);
        this.setWorld('home'); // Default world
    }

    setWorld(worldName) {
        this.currentWorld = worldName;
        this.ambientFX.setTheme(worldName);
        this.parallax.setBackground(worldName);
        this.updateLighting(worldName);
    }

    updateLighting(worldName) {
        // Remove existing world lights
        this.lights.forEach(light => this.scene.remove(light));
        this.lights = [];

        switch (worldName) {
            case 'beach':
                const beachLight = new THREE.DirectionalLight(0xffffff, 0.8);
                beachLight.position.set(10, 10, 5);
                this.scene.add(beachLight);
                this.lights.push(beachLight);
                break;
            case 'night':
                const nightLight = new THREE.AmbientLight(0x404080, 0.3);
                this.scene.add(nightLight);
                this.lights.push(nightLight);
                break;
            default:
                // Home lighting already set in Game.js
                break;
        }
    }

    update() {
        this.ambientFX.update();
        this.parallax.update();
    }
}