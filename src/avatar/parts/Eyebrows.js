
export class Eyebrows {
    create(data) {
        const eyebrows = new PIXI.Container();
        
        const leftBrow = new PIXI.Graphics();
        leftBrow.beginFill(0x8B4513);
        leftBrow.drawRect(-15, -5, 10, 3);
        
        const rightBrow = new PIXI.Graphics();
        rightBrow.beginFill(0x8B4513);
        rightBrow.drawRect(5, -5, 10, 3);
        
        eyebrows.addChild(leftBrow, rightBrow);
        eyebrows.y = -25;
        return eyebrows;
    }
}