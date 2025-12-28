
export class BaseScene {
    constructor(app, appState, eventBus) {
        this.app = app;
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = new PIXI.Container();
        this.background = null;
        this.interactiveElements = [];
    }

    init() {
        // Override in subclasses
    }

    update(delta) {
        // Override in subclasses
    }

    resize() {
        // Handle resize if needed
    }

    destroy() {
        // Clean up
        this.container.removeChildren();
        this.interactiveElements = [];
    }

    addInteractiveElement(element) {
        this.interactiveElements.push(element);
        this.container.addChild(element);
    }
}