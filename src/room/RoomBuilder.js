import { WallDecorator } from './WallDecorator.js';
import { FloorDecorator } from './FloorDecorator.js';

export class RoomBuilder {
    constructor(scene) {
        this.scene = scene;
        this.wallDecorator = new WallDecorator(this.scene);
        this.floorDecorator = new FloorDecorator(this.scene);
    }

    build(roomData) {
        const elements = {};

        // Walls
        elements.walls = this.wallDecorator.create(roomData.walls);

        // Floor
        elements.floor = this.floorDecorator.create(roomData.floor);

        return elements;
    }
}