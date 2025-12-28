import { WallDecorator } from './WallDecorator.js';
import { FloorDecorator } from './FloorDecorator.js';

export class RoomBuilder {
    constructor(app) {
        this.app = app;
        this.wallDecorator = new WallDecorator(app);
        this.floorDecorator = new FloorDecorator(app);
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