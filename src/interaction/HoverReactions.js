export class HoverReactions {
    constructor(app) {
        this.app = app;
        this.hoveredObjects = new Set();
    }

    onHover(event) {
        // Disabled due to PixiJS v7 changes in interaction system
        // const hit = this.app.renderer.plugins.interaction.hitTest(event.data.global);
        // if (hit && hit.eventMode !== 'none') {
        //     if (!this.hoveredObjects.has(hit)) {
        //         this.hoveredObjects.add(hit);
        //         this.onHoverStart(hit);
        //     }
        // } else {
        //     this.hoveredObjects.forEach(obj => this.onHoverEnd(obj));
        //     this.hoveredObjects.clear();
        // }
    }

    onHoverStart(obj) {
        obj.scale.set(1.05);
    }

    onHoverEnd(obj) {
        obj.scale.set(1);
    }

    update(delta) {
        // Update hover effects
    }
}