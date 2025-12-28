export class DragDrop {
    constructor(app, eventBus) {
        this.app = app;
        this.eventBus = eventBus;
        this.draggedObject = null;
        this.dragOffset = { x: 0, y: 0 };
    }

    init(objects) {
        objects.forEach(obj => {
            obj.on('pointerdown', (event) => this.startDrag(event, obj));
        });
        
        this.app.stage.on('pointermove', (event) => this.onDrag(event));
        this.app.stage.on('pointerup', () => this.stopDrag());
        this.app.stage.on('pointerupoutside', () => this.stopDrag());
    }

    startDrag(event, obj) {
        this.draggedObject = obj;
        this.dragOffset.x = event.data.global.x - obj.x;
        this.dragOffset.y = event.data.global.y - obj.y;
        obj.alpha = 0.8;
    }

    onDrag(event) {
        if (this.draggedObject) {
            this.draggedObject.x = event.data.global.x - this.dragOffset.x;
            this.draggedObject.y = event.data.global.y - this.dragOffset.y;
            
            // Snap to grid
            this.draggedObject.x = Math.round(this.draggedObject.x / 50) * 50;
            this.draggedObject.y = Math.round(this.draggedObject.y / 50) * 50;
        }
    }

    stopDrag() {
        if (this.draggedObject) {
            this.draggedObject.alpha = 1;
            this.eventBus.emit('furnitureMoved', {
                item: this.draggedObject,
                x: this.draggedObject.x,
                y: this.draggedObject.y
            });
            this.draggedObject = null;
        }
    }
}