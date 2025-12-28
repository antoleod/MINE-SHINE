
export class Shoes {
    create(data) {
        const shoes = new PIXI.Container();
        
        const leftShoe = new PIXI.Graphics();
        leftShoe.beginFill(this.getColor(data.color || 'white'));
        leftShoe.drawRect(-15, 75, 15, 10);
        
        const rightShoe = new PIXI.Graphics();
        rightShoe.beginFill(this.getColor(data.color || 'white'));
        rightShoe.drawRect(0, 75, 15, 10);
        
        shoes.addChild(leftShoe, rightShoe);
        return shoes;
    }

    getColor(color) {
        const colors = {
            white: 0xFFFFFF,
            black: 0x000000,
            red: 0xFF0000
        };
        return colors[color] || colors.white;
    }
}