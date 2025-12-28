
export class Eyes {
    create(data) {
        const eyes = new PIXI.Container();
        
        const leftEye = new PIXI.Graphics();
        leftEye.beginFill(0xFFFFFF);
        leftEye.drawCircle(-10, 0, 8);
        leftEye.beginFill(this.getEyeColor(data.color || 'blue'));
        leftEye.drawCircle(-10, 0, 5);
        
        const rightEye = new PIXI.Graphics();
        rightEye.beginFill(0xFFFFFF);
        rightEye.drawCircle(10, 0, 8);
        rightEye.beginFill(this.getEyeColor(data.color || 'blue'));
        rightEye.drawCircle(10, 0, 5);
        
        eyes.addChild(leftEye, rightEye);
        eyes.y = -15;
        return eyes;
    }

    getEyeColor(color) {
        const colors = {
            blue: 0x0000FF,
            green: 0x008000,
            brown: 0x8B4513
        };
        return colors[color] || colors.blue;
    }
}