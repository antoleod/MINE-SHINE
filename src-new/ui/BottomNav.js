import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { Button } from './Button.js';
import { Config } from '../core/Config.js';
import { FeedbackFX } from './FeedbackFX.js';

export class BottomNav {
    constructor(appState, eventBus, app) {
        this.appState = appState;
        this.eventBus = eventBus;
        this.app = app;
        this.container = new PIXI.Container();
        this.buttons = [];
        this.build();
    }

    build() {
        const labels = ['Home', 'Avatar', 'Clothes', 'World', 'Rewards'];
        const actions = [
            () => this.eventBus.emit('scene:change', 'HomeScene'),
            () => this.openAvatarPanel(),
            () => this.openClothesPanel(),
            () => this.openWorldPanel(),
            () => this.openRewardsPanel(),
        ];
        labels.forEach((label, index) => {
            const button = new Button({ label, color: 0xffffff });
            const icon = new PIXI.Graphics();
            icon.beginFill(0xffb703);
            icon.drawCircle(0, 0, 16);
            icon.endFill();
            button.setIcon(icon);
            button.onClick(() => {
                FeedbackFX.glow(button.container);
                actions[index]();
            });
            this.buttons.push(button);
            this.container.addChild(button.container);
        });
        this.resize();
    }

    openAvatarPanel() {
        this.eventBus.emit('panel:open', {
            cards: [
                { label: 'Happy', color: 0xffe5b4, action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'happy')) },
                { label: 'Sleepy', color: 0xcdb4db, action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'sleepy')) },
                { label: 'Excited', color: 0xffc8dd, action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'excited')) },
            ],
        });
    }

    openClothesPanel() {
        this.eventBus.emit('panel:open', {
            cards: [
                { label: 'Casual', color: 0xffc4a3, action: () => this.select(() => this.eventBus.emit('avatar:clothes', 'casual')) },
                { label: 'Sporty', color: 0xffd166, action: () => this.select(() => this.eventBus.emit('avatar:clothes', 'sporty')) },
                { label: 'Cozy', color: 0xcdb4db, action: () => this.select(() => this.eventBus.emit('avatar:clothes', 'cozy')) },
            ],
        });
    }

    openWorldPanel() {
        this.eventBus.emit('panel:open', {
            cards: [
                { label: 'Park', color: 0xb7e4c7, action: () => this.select(() => this.eventBus.emit('scene:change', 'ParkScene')) },
                { label: 'Beach', color: 0xfef3c7, action: () => this.select(() => this.eventBus.emit('scene:change', 'BeachScene')) },
                { label: 'City', color: 0xc9d6f1, action: () => this.select(() => this.eventBus.emit('scene:change', 'CityScene')) },
                { label: 'School', color: 0xfad2e1, action: () => this.select(() => this.eventBus.emit('scene:change', 'SchoolScene')) },
                { label: 'Night', color: 0x23345c, action: () => this.select(() => this.eventBus.emit('scene:change', 'NightScene')) },
            ],
        });
    }

    openRewardsPanel() {
        this.eventBus.emit('panel:open', {
            cards: [
                { label: 'Stars', color: 0xfff1c1, action: () => this.select(() => this.eventBus.emit('reward:claim')) },
                { label: 'Sparkles', color: 0xa0c4ff, action: () => this.select(() => this.eventBus.emit('reward:claim')) },
        ],
    });
}

    select(action) {
        action();
        this.eventBus.emit('panel:close');
    }

    update() {}

    resize() {
        const w = this.app.screen.width;
        const y = this.app.screen.height - Config.ui.navHeight;
        this.container.y = y + Config.ui.navHeight / 2;
        const gap = Math.min(150, w / 5);
        this.buttons.forEach((button, index) => {
            button.container.x = (index - 2) * gap;
        });
        this.container.x = w / 2;
    }
}
