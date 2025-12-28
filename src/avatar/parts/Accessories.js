
export class Accessories {
    create(data) {
        const accessories = new PIXI.Container();
        
        if (data.hat) {
            const hat = new PIXI.Graphics();
            hat.beginFill(0xFF0000);
            hat.drawRect(-15, -50, 30, 15);
            accessories.addChild(hat);
        }
        
        if (data.glasses) {
            const glasses = new PIXI.Graphics();
            glasses.lineStyle(2, 0x000000);
            glasses.drawCircle(-12, -15, 8);
            glasses.drawCircle(12, -15, 8);
            glasses.moveTo(-4, -15);
            glasses.lineTo(4, -15);
            accessories.addChild(glasses);
        }
        
        return accessories;
    }
}