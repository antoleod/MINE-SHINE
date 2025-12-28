import { TouchFeedback } from './TouchFeedback.js';
import { HoverReactions } from './HoverReactions.js';

export class InputManager {
    constructor(scene, camera, eventBus) {
        this.scene = scene;
        this.camera = camera;
        this.eventBus = eventBus;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.touchFeedback = new TouchFeedback();
        this.hoverReactions = new HoverReactions(scene, camera);
        this.isPointerDown = false;
        this.intersectedObject = null;
    }

    init() {
        const canvas = document.getElementById('game-canvas');
        canvas.addEventListener('pointerdown', (event) => this.onPointerDown(event));
        canvas.addEventListener('pointermove', (event) => this.onPointerMove(event));
        canvas.addEventListener('pointerup', (event) => this.onPointerUp(event));
        canvas.addEventListener('pointerleave', (event) => this.onPointerUp(event));
    }

    onPointerDown(event) {
        this.isPointerDown = true;
        this.updateMousePosition(event);
        this.checkIntersection();

        this.touchFeedback.onTouch(event);
        this.eventBus.emit('pointerDown', { event, intersected: this.intersectedObject });
    }

    onPointerMove(event) {
        this.updateMousePosition(event);
        this.checkIntersection();

        this.hoverReactions.onHover(this.intersectedObject);
        this.eventBus.emit('pointerMove', { event, intersected: this.intersectedObject });
    }

    onPointerUp(event) {
        this.isPointerDown = false;
        this.updateMousePosition(event);

        this.touchFeedback.onRelease(event);
        this.eventBus.emit('pointerUp', { event, intersected: this.intersectedObject });
    }

    updateMousePosition(event) {
        const canvas = document.getElementById('game-canvas');
        const rect = canvas.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    }

    checkIntersection() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children, true);

        if (intersects.length > 0) {
            this.intersectedObject = intersects[0].object;
        } else {
            this.intersectedObject = null;
        }
    }

    update() {
        this.touchFeedback.update();
        this.hoverReactions.update();
    }
}