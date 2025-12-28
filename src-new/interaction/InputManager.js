export class InputManager {
    constructor(app, eventBus) {
        this.app = app;
        this.eventBus = eventBus;
    }

    init() {
        this.app.stage.on('pointerdown', (event) => {
            this.eventBus.emit('input:down', event.global);
        });
        this.app.stage.on('pointerup', (event) => {
            this.eventBus.emit('input:up', event.global);
        });
    }
}
