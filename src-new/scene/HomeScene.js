import { BaseScene } from './BaseScene.js';
import { RoomManager } from '../room/RoomManager.js';
import { AvatarBuilder } from '../avatar/AvatarBuilder.js';
import { TouchFeedback } from '../interaction/TouchFeedback.js';

export class HomeScene extends BaseScene {
    init() {
        this.buildWorld({
            sky: 0xfef6e4,
            ground: 0xf3e9d2,
            layers: [0xfef6e4, 0xf6e8c3, 0xf1dca7],
            accent: 0xffffff,
        });
        this.roomManager = new RoomManager(this.appState, this.eventBus);
        this.roomManager.init();
        this.container.addChild(this.roomManager.container);

        const builder = new AvatarBuilder();
        this.avatar = builder.build(this.appState.get('avatar'));
        this.avatar.setEmotion(this.appState.get('avatar.emotion'));
        this.avatar.x = this.app.screen.width * 0.5;
        this.avatar.y = this.app.screen.height * 0.62;
        this.avatar.eventMode = 'static';
        this.avatar.cursor = 'pointer';
        this.avatar.on('pointertap', () => {
            this.avatar.setEmotion('happy');
            this.avatar.animator.bounce();
            TouchFeedback.bounce(this.avatar);
        });
        this.container.addChild(this.avatar);

        this.eventBus.on('input:down', (point) => {
            const local = { x: point.x - this.avatar.x, y: point.y - this.avatar.y };
            this.avatar.animator.lookAt(local);
            this.avatar.parts.eyes.setMood('sparkle');
            setTimeout(() => this.avatar.parts.eyes.setMood('smile'), 280);
        });

        this.eventBus.on('avatar:emotion', (emotion) => {
            this.avatar.setEmotion(emotion);
            this.appState.update('avatar', { emotion });
            this.eventBus.emit('save:request');
        });

        this.eventBus.on('avatar:clothes', (clothes) => {
            this.avatar.parts.clothes.setStyle({ clothes });
            this.appState.update('avatar', { clothes });
            this.eventBus.emit('save:request');
        });

        this.eventBus.on('avatar:shoes', (shoes) => {
            this.avatar.parts.shoes.setStyle({ shoes });
            this.appState.update('avatar', { shoes });
            this.eventBus.emit('save:request');
        });

        this.eventBus.on('avatar:accessories', (accessories) => {
            this.avatar.parts.accessories.setStyle({ accessories });
            this.appState.update('avatar', { accessories });
            this.eventBus.emit('save:request');
        });

        this.eventBus.on('avatar:hair', (hair) => {
            const current = this.appState.get('avatar');
            this.avatar.parts.hair.setStyle({ hair, hairColor: current.hairColor });
            this.avatar.parts.eyebrows.setStyle({ hairColor: current.hairColor });
            this.appState.update('avatar', { hair });
            this.eventBus.emit('save:request');
        });

        this.eventBus.on('avatar:skin', (skin) => {
            const current = this.appState.get('avatar');
            this.avatar.parts.body.setStyle({ ...current, skin });
            this.avatar.parts.head.setStyle({ ...current, skin });
            this.appState.update('avatar', { skin });
            this.eventBus.emit('save:request');
        });

        this.eventBus.on('avatar:body', (patch) => {
            const current = { ...this.appState.get('avatar'), ...patch };
            this.avatar.parts.body.setStyle(current);
            this.avatar.parts.head.setStyle(current);
            this.appState.update('avatar', patch);
            this.eventBus.emit('save:request');
        });
    }

    update(time) {
        super.update(time);
        if (this.avatar) this.avatar.update(time);
    }
}
