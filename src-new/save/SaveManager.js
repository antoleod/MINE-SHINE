import { StorageAdapter } from './StorageAdapter.js';

export class SaveManager {
    constructor(appState, eventBus) {
        this.appState = appState;
        this.eventBus = eventBus;
        this.storage = new StorageAdapter('mine-shine-save');
    }

    load() {
        const data = this.storage.load();
        if (!data) return;
        this.appState.state = { ...this.appState.state, ...data };
    }

    save() {
        this.storage.save(this.appState.state);
    }

    watch() {
        this.appState.onChange(() => this.save());
        this.eventBus.on('save:request', () => this.save());
    }
}
