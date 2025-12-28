import { BaseScene } from './BaseScene.js';
import { RoomManager } from '../room/RoomManager.js';
import { Avatar } from '../avatar/Avatar.js';

export class HomeScene extends BaseScene {
    constructor(app, appState, eventBus) {
        super(app, appState, eventBus);
        this.roomManager = new RoomManager(this.app, this.appState, this.eventBus);
        this.avatar = new Avatar(this.app, this.appState, this.eventBus);
    }

    init() {
        // Set up room
        this.roomManager.init();
        this.container.addChild(this.roomManager.container);

        // Add avatar
        this.avatar.init();
        this.container.addChild(this.avatar.container);

        // Position avatar in room
        this.avatar.container.x = this.app.screen.width / 2;
        this.avatar.container.y = this.app.screen.height * 0.7;

        // Listen for room changes
        this.eventBus.on('roomUpdated', () => this.roomManager.updateRoom());
    }

    update(delta) {
        this.roomManager.update(delta);
        this.avatar.update(delta);
    }

    resize() {
        this.roomManager.resize();
        this.avatar.resize();
    }

    destroy() {
        this.roomManager.destroy();
        this.avatar.destroy();
        super.destroy();
    }
}