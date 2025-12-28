
export class Mouth {
    create(data) {
        const mouth = new PIXI.Graphics();
        mouth.beginFill(0xFF69B4);
        if (data.style === 'smile') {
            mouth.arc(0, 5, 10, 0, Math.PI);
        } else {
            mouth.drawRect(-5, 0, 10, 5);
        }
        mouth.y = 5;
        return mouth;
    }
}