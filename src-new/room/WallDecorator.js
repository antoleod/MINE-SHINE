const WALLS = {
    sunny: { base: 0xfff3c4, stripe: 0xffeaa3 },
    mint: { base: 0xd8f3dc, stripe: 0xb7e4c7 },
    sky: { base: 0xd0e7ff, stripe: 0xb9d7ff },
};

export class WallDecorator {
    constructor(graphic) {
        this.graphic = graphic;
    }

    draw(style, width, height) {
        const palette = WALLS[style] || WALLS.sunny;
        const g = this.graphic;
        g.clear();
        g.beginFill(palette.base);
        g.drawRect(0, 0, width, height);
        g.endFill();

        g.beginFill(palette.stripe, 0.6);
        for (let x = 0; x < width; x += 120) {
            g.drawRect(x, 0, 60, height);
        }
        g.endFill();
    }
}
