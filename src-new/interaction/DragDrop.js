import { MathUtil } from '../utils/Math.js';

export class DragDrop {
    constructor(target, bounds) {
        this.target = target;
        this.bounds = bounds;
        this.dragging = false;
        this.offset = { x: 0, y: 0 };
        this.goal = { x: target.x, y: target.y };
        this.enable();
    }

    enable() {
        this.target.eventMode = 'static';
        this.target.cursor = 'pointer';
        this.target.on('pointerdown', (event) => this.onDown(event));
        this.target.on('pointerup', () => this.onUp());
        this.target.on('pointerupoutside', () => this.onUp());
        this.target.on('pointermove', (event) => this.onMove(event));
    }

    onDown(event) {
        this.dragging = true;
        const pos = event.data.getLocalPosition(this.target.parent);
        this.offset.x = this.target.x - pos.x;
        this.offset.y = this.target.y - pos.y;
        this.target.scale.set(1.03);
    }

    onUp() {
        if (!this.dragging) return;
        this.dragging = false;
        this.target.scale.set(1);
        this.snap();
    }

    onMove(event) {
        if (!this.dragging) return;
        const pos = event.data.getLocalPosition(this.target.parent);
        this.goal.x = MathUtil.clamp(pos.x + this.offset.x, this.bounds.x, this.bounds.x + this.bounds.width);
        this.goal.y = MathUtil.clamp(pos.y + this.offset.y, this.bounds.y, this.bounds.y + this.bounds.height);
        this.target.x = MathUtil.lerp(this.target.x, this.goal.x, 0.35);
        this.target.y = MathUtil.lerp(this.target.y, this.goal.y, 0.35);
    }

    snap() {
        this.target.x = Math.round(this.target.x / 20) * 20;
        this.target.y = Math.round(this.target.y / 20) * 20;
    }
}
