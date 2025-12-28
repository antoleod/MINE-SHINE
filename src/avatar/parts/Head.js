
export class Head {
    create(data) {
        const head = new PIXI.Graphics();
        head.beginFill(this.getSkinTone(data.skinTone || 'light'));
        if (data.shape === 'round') {
            head.drawCircle(0, 0, 25);
        } else {
            head.drawEllipse(0, 0, 25, 30);
        }
        head.y = -20;
        return head;
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