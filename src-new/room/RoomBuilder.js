import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { Config } from '../core/Config.js';
import { WallDecorator } from './WallDecorator.js';
import { FloorDecorator } from './FloorDecorator.js';

export class RoomBuilder {
    constructor() {
        this.container = new PIXI.Container();
        this.wall = new PIXI.Graphics();
        this.floor = new PIXI.Graphics();
        this.container.addChild(this.wall, this.floor);
        this.wallDecorator = new WallDecorator(this.wall);
        this.floorDecorator = new FloorDecorator(this.floor);
    }

    build(style) {
        const w = Config.app.width;
        const h = Config.app.height;
        this.wallDecorator.draw(style.wall, w, Config.room.wallHeight);
        this.floorDecorator.draw(style.floor, w, Config.room.floorHeight, h - Config.room.floorHeight);
        return this.container;
    }
}
