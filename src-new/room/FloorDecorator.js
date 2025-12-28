const FLOORS = {
    wood: { base: 0xe6c9a8, line: 0xd5b894 },
    soft: { base: 0xf4e7d3, line: 0xe8d8c2 },
    grass: { base: 0xb7e4c7, line: 0x9ed7b6 },
};

export class FloorDecorator {
    constructor(graphic) {
        this.graphic = graphic;
    }

    draw(style, width, height, y) {
        const palette = FLOORS[style] || FLOORS.wood;
        const g = this.graphic;
        g.clear();
        g.beginFill(palette.base);
        g.drawRect(0, y, width, height);
        g.endFill();

        g.lineStyle(2, palette.line, 0.6);
        for (let i = 0; i < width; i += 80) {
            g.moveTo(i, y);
            g.lineTo(i, y + height);
        }
    }
}
