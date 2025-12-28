
export class BaseScene {
    constructor(scene, appState, eventBus) {
        this.scene = scene;
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = new THREE.Group();
        this.background = null;
        this.interactiveElements = [];
    }

    init() {
        // Override in subclasses
    }

    update() {
        // Override in subclasses
    }

    resize() {
        // Handle resize if needed
    }

    destroy() {
        // Clean up
        this.container.clear();
        this.interactiveElements = [];
    }

    addInteractiveElement(element) {
        this.interactiveElements.push(element);
        this.container.add(element);
    }
}