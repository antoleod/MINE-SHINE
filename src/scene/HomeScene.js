import { BaseScene } from './BaseScene.js';
import { RoomManager } from '../room/RoomManager.js';
import { Avatar } from '../avatar/Avatar.js';

export class HomeScene extends BaseScene {
    constructor(scene, appState, eventBus) {
        super(scene, appState, eventBus);
        this.roomManager = new RoomManager(this.scene, this.appState, this.eventBus);
        this.avatar = new Avatar(this.scene, this.appState, this.eventBus);
    }

    init() {
        // Set up room
        this.roomManager.init();
        this.container.add(this.roomManager.container);

        // Add avatar
        this.avatar.init();
        this.container.add(this.avatar.container);

        // Position avatar in room
        this.avatar.container.position.set(0, 0, 0);

        // Listen for room changes
        this.eventBus.on('roomUpdated', () => this.roomManager.updateRoom());
    }

    update() {
        this.roomManager.update();
        this.avatar.update();
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