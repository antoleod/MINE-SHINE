import { RoomBuilder } from './RoomBuilder.js';
import { Furniture } from './Furniture.js';
import { DragDrop } from '../interaction/DragDrop.js';

export class RoomManager {
    constructor(scene, appState, eventBus) {
        this.scene = scene;
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = new THREE.Group();
        this.builder = new RoomBuilder(this.scene);
        this.dragDrop = new DragDrop(this.scene, this.eventBus);
        this.furniture = [];
    }

    init() {
        this.buildRoom();
        this.addFurniture();
        this.setupInteractions();
    }

    buildRoom() {
        const roomElements = this.builder.build(this.appState.room);
        Object.values(roomElements).forEach(element => {
            this.container.add(element);
        });
    }

    addFurniture() {
        this.appState.room.furniture.forEach(item => {
            const furniture = this.createFurniture(item);
            this.furniture.push(furniture);
            this.container.add(furniture);
        });
    }

    createFurniture(item) {
        const furniture = Furniture.create(item.type, item.x, item.y, item.z || 0);
        return furniture;
    }

    setupInteractions() {
        this.dragDrop.init(this.furniture);
    }

    updateRoom() {
        this.container.clear();
        this.buildRoom();
        this.addFurniture();
    }

    update() {
        // Room animations
    }

    resize() {
        // Adjust room size
    }

    destroy() {
        this.container.clear();
        this.furniture = [];
    }
}