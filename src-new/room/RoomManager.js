import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { RoomBuilder } from './RoomBuilder.js';
import { Furniture } from './Furniture.js';
import { DragDrop } from '../interaction/DragDrop.js';
import { Config } from '../core/Config.js';

export class RoomManager {
    constructor(appState, eventBus) {
        this.appState = appState;
        this.eventBus = eventBus;
        this.container = new PIXI.Container();
        this.builder = new RoomBuilder();
        this.furnitureItems = [];
    }

    init() {
        const style = this.appState.get('room');
        this.container.addChild(this.builder.build(style));
        this.restoreFurniture(style.furniture);
        this.eventBus.on('room:style', (patch) => this.applyStyle(patch));
    }

    applyStyle(patch) {
        this.appState.update('room', patch);
        const style = this.appState.get('room');
        this.builder.build(style);
    }

    restoreFurniture(list) {
        const defaults = list && list.length ? list : [
            { type: 'bed', x: 260, y: 470 },
            { type: 'table', x: 560, y: 470 },
            { type: 'lamp', x: 820, y: 430 },
            { type: 'toybox', x: 1020, y: 470 },
        ];
        this.furnitureItems = defaults.map((item) => this.addFurniture(item.type, { x: item.x, y: item.y }));
        this.saveFurniture();
    }

    addFurniture(type, position) {
        const furniture = new Furniture(type, position);
        this.container.addChild(furniture);
        new DragDrop(furniture, {
            x: 120,
            y: Config.room.wallHeight + 20,
            width: Config.app.width - 240,
            height: Config.room.floorHeight - 40,
        });
        furniture.on('pointerup', () => this.saveFurniture());
        return furniture;
    }

    saveFurniture() {
        const list = this.furnitureItems.map((item) => item.serialize());
        this.appState.update('room', { furniture: list });
        this.eventBus.emit('save:request');
    }
}
