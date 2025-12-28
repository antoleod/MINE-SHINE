
export class Parallax {
    constructor() {
        this.layers = [];
        this.container = new PIXI.Container();
    }

    init(app) {
        app.stage.addChildAt(this.container, 0);
    }

    setBackground(worldName) {
        this.container.removeChildren();
        this.layers = [];
        
        // Create parallax layers
        const bg1 = new PIXI.Graphics();
        bg1.beginFill(this.getBgColor(worldName));
        bg1.drawRect(0, 0, 800, 600);
        this.layers.push({ sprite: bg1, speed: 0 });
        
        const bg2 = new PIXI.Graphics();
        bg2.beginFill(this.getBgColor2(worldName));
        bg2.drawRect(0, 100, 800, 500);
        this.layers.push({ sprite: bg2, speed: 0.2 });
        
        this.layers.forEach(layer => this.container.addChild(layer.sprite));
    }

    getBgColor(worldName) {
        const colors = {
            ParkScene: 0x87CEEB,
            BeachScene: 0x87CEEB,
            CityScene: 0xB0C4DE,
            NightScene: 0x191970
        };
        return colors[worldName] || 0xFFFFFF;
    }

    getBgColor2(worldName) {
        const colors = {
            ParkScene: 0x90EE90,
            BeachScene: 0xF4A460,
            CityScene: 0x708090
        };
        return colors[worldName] || 0xF0F0F0;
    }

    update(delta) {
        // Parallax scrolling based on some movement
    }
}