
export class Body {
    create(data) {
        const body = new PIXI.Graphics();
        body.beginFill(this.getSkinTone(data.skinTone || 'light'));
        body.drawEllipse(0, 0, 30, 40);
        body.y = 50;
        return body;
    }

    getSkinTone(tone) {
        const tones = {
            light: 0xFDBCB4,
            medium: 0xD2B48C,
            dark: 0x8B4513
        };
        return tones[tone] || tones.light;
    }
}