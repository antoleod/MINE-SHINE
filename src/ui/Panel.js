import { Card } from './Card.js';

export class Panel {
    constructor(app, panelName, eventBus) {
        this.app = app;
        this.panelName = panelName;
        this.eventBus = eventBus;
        this.container = new PIXI.Container();
        this.cards = [];
        this.isVisible = false;
    }

    show() {
        this.isVisible = true;
        this.container.alpha = 0;
        this.createContent();
        // Animate in
        this.animateIn();
    }

    hide() {
        this.isVisible = false;
        // Animate out
        this.animateOut();
    }

    createContent() {
        // Create cards based on panel name
        if (this.panelName === 'avatar') {
            this.createAvatarPanel();
        } else if (this.panelName === 'clothes') {
            this.createClothesPanel();
        }
        // etc.
    }

    createAvatarPanel() {
        const emotions = ['happy', 'sad', 'surprised', 'sleepy', 'excited', 'angry'];
        emotions.forEach((emotion, index) => {
            const card = new Card(this.app, emotion, () => {
                this.eventBus.emit('setEmotion', emotion);
            });
            card.container.x = (index % 3) * 120 + 50;
            card.container.y = Math.floor(index / 3) * 120 + 50;
            this.cards.push(card);
            this.container.addChild(card.container);
        });
    }

    createClothesPanel() {
        const clothes = ['shirt', 'pants', 'dress', 'shoes'];
        clothes.forEach((item, index) => {
            const card = new Card(this.app, item, () => {
                this.eventBus.emit('changeClothes', item);
            });
            card.container.x = (index % 2) * 150 + 50;
            card.container.y = Math.floor(index / 2) * 150 + 50;
            this.cards.push(card);
            this.container.addChild(card.container);
        });
    }

    animateIn() {
        // Simple fade in
        PIXI.Ticker.shared.add(() => {
            if (this.container.alpha < 1) {
                this.container.alpha += 0.05;
            }
        });
    }

    animateOut() {
        PIXI.Ticker.shared.add(() => {
            if (this.container.alpha > 0) {
                this.container.alpha -= 0.05;
            } else {
                this.eventBus.emit('hidePanel');
            }
        });
    }

    update(delta) {
        this.cards.forEach(card => card.update(delta));
    }

    resize() {
        // Adjust positions
    }
}