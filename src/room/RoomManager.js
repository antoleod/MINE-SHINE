import { RoomBuilder } from './RoomBuilder.js';
import { Furniture } from './Furniture.js';
import { DragDrop } from '../interaction/DragDrop.js';

export class RoomManager {
    constructor(app, appState, eventBus) {
        this.app = app;
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = new PIXI.Container();
        this.builder = new RoomBuilder(this.app);
        this.dragDrop = new DragDrop(this.app, this.eventBus);
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
            this.container.addChild(element);
        });
    }

    addFurniture() {
        this.appState.room.furniture.forEach(item => {
            const furniture = this.createFurniture(item);
            this.furniture.push(furniture);
            this.container.addChild(furniture);
        });
    }

    createFurniture(item) {
        const furniture = Furniture.create(item.type, item.x, item.y);
        return furniture;
    }

    setupInteractions() {
        this.dragDrop.init(this.furniture);
    }

    updateRoom() {
        this.container.removeChildren();
        this.buildRoom();
        this.addFurniture();
    }

    update(delta) {
        // Room animations
    }

    resize() {
        // Adjust room size
    }

    destroy() {
        this.container.removeChildren();
        this.furniture = [];
    }
}