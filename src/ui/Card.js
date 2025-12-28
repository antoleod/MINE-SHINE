
export class Card {
    constructor(app, content, onClick) {
        this.app = app;
        this.content = content;
        this.onClick = onClick;
        this.container = new PIXI.Container();
        this.init();
    }

    init() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xffffff);
        graphics.drawRoundedRect(0, 0, 100, 100, 10);
        graphics.lineStyle(2, 0xcccccc);
        graphics.drawRoundedRect(0, 0, 100, 100, 10);
        
        const text = new PIXI.Text(this.content, {
            fontSize: 16,
            fill: 0x333333
        });
        text.anchor.set(0.5);
        text.x = 50;
        text.y = 50;
        
        this.container.addChild(graphics, text);
        this.container.eventMode = 'static';
        this.container.buttonMode = true;
        
        this.container.on('pointertap', this.onClick);
    }

    update(delta) {
        // Card animations
    }
}