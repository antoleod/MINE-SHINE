
export class Hair {
    create(data) {
        const hair = new PIXI.Graphics();
        hair.beginFill(this.getHairColor(data.color || 'brown'));
        hair.drawEllipse(0, -30, 30, 20);
        return hair;
    }

    getHairColor(color) {
        const colors = {
            brown: 0x8B4513,
            blonde: 0xFAF0BE,
            black: 0x000000
        };
        return colors[color] || colors.brown;
    }
}