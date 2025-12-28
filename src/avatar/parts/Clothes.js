
export class Clothes {
    create(data) {
        const clothes = new PIXI.Container();
        
        const top = new PIXI.Graphics();
        top.beginFill(this.getColor(data.color || 'blue'));
        top.drawRect(-25, 20, 50, 30);
        
        const bottom = new PIXI.Graphics();
        bottom.beginFill(0x000080);
        bottom.drawRect(-20, 50, 40, 30);
        
        clothes.addChild(top, bottom);
        return clothes;
    }

    getColor(color) {
        const colors = {
            blue: 0x0000FF,
            red: 0xFF0000,
            green: 0x008000
        };
        return colors[color] || colors.blue;
    }
}