import { FeedbackFX } from './FeedbackFX.js';

export class Button {
    constructor(app, label, onClick) {
        this.app = app;
        this.label = label;
        this.onClick = onClick;
        this.container = new PIXI.Container();
        this.feedback = new FeedbackFX();
        this.isPressed = false;
    }

    init() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0x4a90e2);
        graphics.drawRoundedRect(0, 0, 60, 60, 10);
        graphics.endFill();
        
        const text = new PIXI.Text(this.label.charAt(0).toUpperCase(), {
            fontSize: 24,
            fill: 0xffffff
        });
        text.anchor.set(0.5);
        text.x = 30;
        text.y = 30;
        
        this.container.addChild(graphics, text);
        this.container.eventMode = 'static';
        this.container.buttonMode = true;
        
        this.container.on('pointerdown', () => this.onPointerDown());
        this.container.on('pointerup', () => this.onPointerUp());
        this.container.on('pointerupoutside', () => this.onPointerUp());
    }

    onPointerDown() {
        this.isPressed = true;
        this.container.scale.set(0.9);
        this.feedback.playTap();
    }

    onPointerUp() {
        if (this.isPressed) {
            this.isPressed = false;
            this.container.scale.set(1);
            this.onClick();
        }
    }

    update(delta) {
        this.feedback.update(delta, this.container);
    }
}