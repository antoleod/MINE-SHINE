
export class Furniture {
    static create(type, x, y) {
        const furniture = new PIXI.Graphics();
        
        switch (type) {
            case 'bed':
                furniture.beginFill(0xFFFFFF);
                furniture.drawRect(x, y, 100, 60);
                break;
            case 'table':
                furniture.beginFill(0x8B4513);
                furniture.drawRect(x, y, 60, 40);
                break;
            case 'lamp':
                furniture.beginFill(0xFFFF00);
                furniture.drawCircle(x + 10, y - 20, 10);
                furniture.beginFill(0x808080);
                furniture.drawRect(x + 5, y - 10, 10, 30);
                break;
            default:
                furniture.beginFill(0xCCCCCC);
                furniture.drawRect(x, y, 50, 50);
        }
        
        furniture.eventMode = 'static';
        furniture.buttonMode = true;
        return furniture;
    }
}