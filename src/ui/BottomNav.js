import { Button } from './Button.js';
import { Config } from '../core/Config.js';

export class BottomNav {
    constructor(app, eventBus) {
        this.app = app;
        this.eventBus = eventBus;
        this.container = new PIXI.Container();
        this.buttons = [];
    }

    init() {
        Config.NAV_ITEMS.forEach((item, index) => {
            const button = new Button(this.app, item, () => this.onNavClick(item));
            button.container.x = index * 80 + 40;
            button.container.y = this.app.screen.height - 80;
            this.buttons.push(button);
            this.container.addChild(button.container);
        });
    }

    onNavClick(item) {
        if (item === 'home' || item === 'world') {
            this.eventBus.emit('changeScene', item === 'home' ? 'HomeScene' : 'ParkScene');
        } else {
            this.eventBus.emit('showPanel', item);
        }
    }

    update(delta) {
        this.buttons.forEach(button => button.update(delta));
    }

    resize() {
        this.buttons.forEach((button, index) => {
            button.container.y = this.app.screen.height - 80;
        });
    }
}