
export class FloorDecorator {
    constructor(app) {
        this.app = app;
    }

    create(floorData) {
        const floor = new PIXI.Graphics();
        floor.beginFill(this.getColor(floorData.color || 'brown'));
        floor.drawRect(0, this.app.screen.height * 0.8, this.app.screen.width, this.app.screen.height * 0.2);
        return floor;
    }

    getColor(color) {
        const colors = {
            brown: 0x8B4513,
            blue: 0x0000FF,
            gray: 0x808080
        };
        return colors[color] || colors.brown;
    }
}