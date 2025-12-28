
export class AmbientFX {
    constructor() {
        this.container = new PIXI.Container();
        this.particles = [];
    }

    init(app) {
        app.stage.addChild(this.container);
    }

    setTheme(worldName) {
        this.container.removeChildren();
        this.particles = [];
        
        switch (worldName) {
            case 'ParkScene':
                this.createLeaves();
                break;
            case 'BeachScene':
                this.createWaves();
                break;
            case 'CityScene':
                this.createLights();
                break;
            default:
                // Default ambient
                break;
        }
    }

    createLeaves() {
        for (let i = 0; i < 10; i++) {
            const leaf = new PIXI.Graphics();
            leaf.beginFill(0x228B22);
            leaf.drawEllipse(0, 0, 5, 3);
            leaf.x = Math.random() * 800;
            leaf.y = Math.random() * 600;
            this.container.addChild(leaf);
            this.particles.push({
                sprite: leaf,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 1 + 0.5
            });
        }
    }

    createWaves() {
        // Simple wave effect
    }

    createLights() {
        // City lights
    }

    update(delta) {
        this.particles.forEach(particle => {
            particle.sprite.x += particle.vx;
            particle.sprite.y += particle.vy;
            
            if (particle.sprite.y > 600) {
                particle.sprite.y = -10;
            }
        });
    }
}