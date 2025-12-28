import * as PIXI from 'https://cdn.jsdelivr.net/npm/pixi.js@7.3.2/dist/pixi.mjs';
import { Button } from './Button.js';
import { Config } from '../core/Config.js';
import { FeedbackFX } from './FeedbackFX.js';
import { CHALLENGE_LIST } from '../core/Challenges.js';

export class BottomNav {
    constructor(appState, eventBus, app) {
        this.appState = appState;
        this.eventBus = eventBus;
        this.app = app;
        this.container = new PIXI.Container();
        this.bg = new PIXI.Graphics();
        this.buttons = [];
        this.build();
    }

    build() {
        const labels = ['Home', 'Avatar', 'Closet', 'World', 'Rewards'];
        const actions = [
            () => this.eventBus.emit('scene:change', 'HomeScene'),
            () => this.openAvatarPanel(),
            () => this.openClothesPanel(),
            () => this.openWorldPanel(),
            () => this.openRewardsPanel(),
        ];
        labels.forEach((label, index) => {
            const button = new Button({ label, color: 0xffffff });
            const icon = this.makeNavIcon(label);
            button.setIcon(icon);
            button.onClick(() => {
                FeedbackFX.glow(button.container);
                actions[index]();
            });
            this.buttons.push(button);
            this.container.addChild(button.container);
        });
        this.container.addChildAt(this.bg, 0);
        this.resize();
    }

    openAvatarPanel() {
        const skinTones = ['peach', 'sand', 'cocoa', 'almond'];
        const hairStyles = ['puff', 'bob', 'waves', 'pixie', 'long'];
        const hairColors = ['chestnut', 'midnight', 'honey', 'auburn', 'lilac'];
        this.eventBus.emit('panel:open', {
            cards: [
                { label: 'Happy', color: 0xffe5b4, icon: this.makeFaceIcon(0xffc86b), action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'happy')) },
                { label: 'Sleepy', color: 0xd3c6f3, icon: this.makeFaceIcon(0x9fa8da), action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'sleepy')) },
                { label: 'Excited', color: 0xffc8dd, icon: this.makeFaceIcon(0xff8fab), action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'excited')) },
                { label: 'Sad', color: 0xcde5f7, icon: this.makeFaceIcon(0x8ab6d6), action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'sad')) },
                { label: 'Surprised', color: 0xf7e1d7, icon: this.makeFaceIcon(0xf4a261), action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'surprised')) },
                { label: 'Angry', color: 0xffadad, icon: this.makeFaceIcon(0xf07167), action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'angry')) },
                { label: 'Baby', color: 0xbde0fe, icon: this.makeBodyIcon(0xbde0fe), action: () => this.select(() => this.eventBus.emit('avatar:body', { body: 'baby', bodySize: 'tiny' })) },
                { label: 'Child', color: 0xcaf0f8, icon: this.makeBodyIcon(0xcaf0f8), action: () => this.select(() => this.eventBus.emit('avatar:body', { body: 'child', bodySize: 'soft' })) },
                { label: 'Teen', color: 0xd0f4de, icon: this.makeBodyIcon(0xd0f4de), action: () => this.select(() => this.eventBus.emit('avatar:body', { body: 'teen', bodySize: 'tall' })) },
                { label: 'Adult', color: 0xffe0c9, icon: this.makeBodyIcon(0xffe0c9), action: () => this.select(() => this.eventBus.emit('avatar:body', { body: 'adult', bodySize: 'tall' })) },
                { label: 'Skin', color: 0xf7e1d7, icon: this.makePaletteIcon(), action: () => this.select(() => this.eventBus.emit('avatar:skin', skinTones[Math.floor(Math.random() * skinTones.length)])) },
                { label: 'Hair', color: 0xe9edc9, icon: this.makeHairIcon(), action: () => this.select(() => this.eventBus.emit('avatar:hair', hairStyles[Math.floor(Math.random() * hairStyles.length)])) },
                { label: 'Color', color: 0xe4c1f9, icon: this.makeSparkIcon(), action: () => this.select(() => this.eventBus.emit('avatar:hairColor', hairColors[Math.floor(Math.random() * hairColors.length)])) },
                { label: 'Smile', color: 0xfff1c1, icon: this.makeHeartIcon(), action: () => this.select(() => this.eventBus.emit('avatar:emotion', 'happy')) },
            ],
            cols: 3,
        });
    }

    openClothesPanel() {
        const unlockedClothes = this.appState.get('progression.unlockedClothes') || [];
        const unlockedShoes = this.appState.get('progression.unlockedShoes') || [];
        const unlockedAccessories = this.appState.get('progression.unlockedAccessories') || [];
        this.eventBus.emit('panel:open', {
            cards: [
                ...unlockedClothes.map((style) => ({
                    label: style[0].toUpperCase() + style.slice(1),
                    color: 0xffe5b4,
                    icon: this.makeShirtIcon(),
                    action: () => this.select(() => this.eventBus.emit('avatar:clothes', style)),
                })),
                ...unlockedShoes.map((style) => ({
                    label: style[0].toUpperCase() + style.slice(1),
                    color: 0xd0f4de,
                    icon: this.makeShoeIcon(),
                    action: () => this.select(() => this.eventBus.emit('avatar:shoes', style)),
                })),
                ...unlockedAccessories.map((style) => ({
                    label: style === 'none' ? 'No Add-on' : style[0].toUpperCase() + style.slice(1),
                    color: 0xfde2e4,
                    icon: this.makeSparkIcon(),
                    action: () => this.select(() => this.eventBus.emit('avatar:accessories', style)),
                })),
                {
                    label: 'Decor',
                    color: 0xe0fbfc,
                    icon: this.makeHomeIcon(),
                    action: () => this.openDecorPanel(),
                },
            ],
            cols: 3,
        });
    }

    openDecorPanel() {
        const unlockedFurniture = this.appState.get('progression.unlockedFurniture') || [];
        this.eventBus.emit('panel:open', {
            cards: unlockedFurniture.map((item) => ({
                label: item[0].toUpperCase() + item.slice(1),
                color: 0xf6bd60,
                icon: this.makeLeafIcon(),
                action: () => this.select(() => this.eventBus.emit('room:add', item)),
            })),
            cols: 3,
        });
    }

    openWorldPanel() {
        const unlocked = this.appState.get('progression.unlockedWorlds') || [];
        const worlds = [
            { label: 'Home', scene: 'HomeScene', color: 0xfef6e4 },
            { label: 'Park', scene: 'ParkScene', color: 0xb7e4c7 },
            { label: 'Shop', scene: 'ShopScene', color: 0xffe8b6 },
        ];
        this.eventBus.emit('panel:open', {
            cards: worlds.filter((world) => unlocked.includes(world.scene)).map((world) => ({
                label: world.label,
                color: world.color,
                icon: this.makeWorldIcon(),
                action: () => this.select(() => this.eventBus.emit('scene:change', world.scene)),
            })),
            cols: 3,
        });
    }

    openRewardsPanel() {
        this.eventBus.emit('panel:open', {
            cards: [
                { label: 'Stars', color: 0xfff1c1, icon: this.makeStarIcon(), action: () => this.select(() => this.eventBus.emit('reward:claim')) },
                { label: 'Sparkles', color: 0xa0c4ff, icon: this.makeSparkIcon(), action: () => this.select(() => this.eventBus.emit('reward:claim')) },
                { label: 'Tasks', color: 0xfde2e4, icon: this.makeChecklistIcon(), action: () => this.openChallengesPanel() },
        ],
        cols: 2,
    });
}

    openChallengesPanel() {
        const active = this.appState.get('challenges.active');
        const completed = this.appState.get('challenges.completed') || {};
        this.eventBus.emit('panel:open', {
            cards: CHALLENGE_LIST.map((challenge) => {
                const isCompleted = completed[challenge.id];
                const isActive = active === challenge.id;
                const label = isCompleted ? `${challenge.label} Done` : (isActive ? `${challenge.label} Go` : challenge.label);
                return {
                    label,
                    color: challenge.color,
                    icon: this.makeChecklistIcon(),
                    action: () => {
                        if (isCompleted) return;
                        this.select(() => this.eventBus.emit('challenge:select', challenge.id));
                    },
                };
            }),
            cols: 2,
        });
    }

    select(action) {
        action();
        this.eventBus.emit('panel:close');
    }

    update(time) {
        const activeChallenge = this.appState.get('challenges.active');
        const rewardsButton = this.buttons[4];
        if (rewardsButton && activeChallenge && time) {
            const pulse = 1 + Math.sin(time.elapsed * 0.006) * 0.04;
            rewardsButton.container.scale.set(pulse);
        } else if (rewardsButton) {
            rewardsButton.container.scale.set(1);
        }
    }

    resize() {
        const w = this.app.screen.width;
        const y = this.app.screen.height - Config.ui.navHeight;
        this.container.y = y + Config.ui.navHeight / 2;
        this.bg.clear();
        this.bg.beginFill(0xffffff, 0.9);
        this.bg.drawRoundedRect(-w / 2 + 20, -Config.ui.navHeight / 2, w - 40, Config.ui.navHeight - 12, 36);
        this.bg.endFill();
        const gap = Math.min(150, w / 5);
        this.buttons.forEach((button, index) => {
            button.container.x = (index - 2) * gap;
        });
        this.container.x = w / 2;
    }

    makeNavIcon(label) {
        if (label === 'Home') return this.makeHomeIcon();
        if (label === 'Avatar') return this.makeFaceIcon(0xffc86b);
        if (label === 'Closet') return this.makeShirtIcon();
        if (label === 'World') return this.makeWorldIcon();
        return this.makeStarIcon();
    }

    makeHomeIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0xffc86b);
        g.drawRoundedRect(-14, -2, 28, 22, 6);
        g.endFill();
        g.beginFill(0xffa07a);
        g.drawPolygon([-18, -2, 0, -20, 18, -2]);
        g.endFill();
        return g;
    }

    makeFaceIcon(color = 0xffc86b) {
        const g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawCircle(0, 0, 14);
        g.endFill();
        g.beginFill(0x5f5047);
        g.drawCircle(-5, -2, 2);
        g.drawCircle(5, -2, 2);
        g.endFill();
        g.lineStyle(3, 0x5f5047, 1);
        g.arc(0, 4, 6, 0, Math.PI);
        return g;
    }

    makeBodyIcon(color) {
        const g = new PIXI.Graphics();
        g.beginFill(color);
        g.drawRoundedRect(-12, -12, 24, 28, 10);
        g.endFill();
        return g;
    }

    makeHairIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0x7a4a2a);
        g.drawRoundedRect(-14, -12, 28, 20, 10);
        g.endFill();
        return g;
    }

    makePaletteIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0xf2c7a8);
        g.drawCircle(-6, 0, 8);
        g.beginFill(0xe8b98a);
        g.drawCircle(8, 0, 6);
        g.endFill();
        return g;
    }

    makeHeartIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0xff8fab);
        g.drawCircle(-6, -2, 6);
        g.drawCircle(6, -2, 6);
        g.drawPolygon([-12, -2, 0, 12, 12, -2]);
        g.endFill();
        return g;
    }

    makeShirtIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0x80b1ff);
        g.drawRoundedRect(-14, -10, 28, 24, 6);
        g.endFill();
        return g;
    }

    makeShoeIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0xffe5b4);
        g.drawRoundedRect(-14, -4, 28, 10, 6);
        g.endFill();
        return g;
    }

    makeWorldIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0x8ecae6);
        g.drawCircle(0, 0, 14);
        g.endFill();
        g.beginFill(0xb7e4c7);
        g.drawCircle(-6, -2, 6);
        g.drawCircle(6, 4, 4);
        g.endFill();
        return g;
    }

    makeStarIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0xffd166);
        g.drawPolygon([0, -14, 4, -2, 14, -2, 6, 4, 10, 14, 0, 8, -10, 14, -6, 4, -14, -2, -4, -2]);
        g.endFill();
        return g;
    }

    makeSparkIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0xa0c4ff);
        g.drawPolygon([0, -12, 4, -2, 12, 0, 4, 2, 0, 12, -4, 2, -12, 0, -4, -2]);
        g.endFill();
        return g;
    }

    makeLeafIcon() {
        const g = new PIXI.Graphics();
        g.beginFill(0x90be6d);
        g.drawRoundedRect(-10, -12, 20, 26, 10);
        g.endFill();
        return g;
    }

    makeChecklistIcon() {
        const g = new PIXI.Graphics();
        g.lineStyle(4, 0x5f5047, 1);
        g.drawRoundedRect(-12, -12, 24, 24, 6);
        g.moveTo(-6, 0);
        g.lineTo(-2, 4);
        g.lineTo(6, -4);
        return g;
    }
}
