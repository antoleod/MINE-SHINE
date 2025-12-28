import { TouchFeedback } from './TouchFeedback.js';
import { HoverReactions } from './HoverReactions.js';

export class InputManager {
    constructor(app, eventBus) {
        this.app = app;
        this.eventBus = eventBus;
        this.touchFeedback = new TouchFeedback();
        this.hoverReactions = new HoverReactions(app);
    }

    init() {
        this.app.stage.interactive = true;
        
        this.app.stage.on('pointerdown', (event) => this.onPointerDown(event));
        this.app.stage.on('pointermove', (event) => this.onPointerMove(event));
        this.app.stage.on('pointerup', (event) => this.onPointerUp(event));
        this.app.stage.on('pointerupoutside', (event) => this.onPointerUp(event));
    }

    onPointerDown(event) {
        this.touchFeedback.onTouch(event);
        this.eventBus.emit('pointerDown', event);
    }

    onPointerMove(event) {
        this.hoverReactions.onHover(event);
        this.eventBus.emit('pointerMove', event);
    }

    onPointerUp(event) {
        this.touchFeedback.onRelease(event);
        this.eventBus.emit('pointerUp', event);
    }

    update(delta) {
        this.touchFeedback.update(delta);
        this.hoverReactions.update(delta);
    }
}