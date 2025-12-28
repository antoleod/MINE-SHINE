
export class WallDecorator {
    constructor(app) {
        this.app = app;
    }

    create(wallData) {
        const walls = new PIXI.Graphics();
        walls.beginFill(this.getColor(wallData.color || 'lightblue'));
        walls.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        return walls;
    }

    getColor(color) {
        const colors = {
            lightblue: 0xADD8E6,
            pink: 0xFFB6C1,
            green: 0x90EE90
        };
        return colors[color] || colors.lightblue;
    }
}