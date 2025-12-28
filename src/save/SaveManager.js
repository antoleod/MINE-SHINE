import { StorageAdapter } from './StorageAdapter.js';
import { Progression } from './Progression.js';

export class SaveManager {
    constructor(appState) {
        this.appState = appState;
        this.storage = new StorageAdapter();
        this.progression = new Progression(appState);
    }

    load() {
        const savedData = this.storage.load('mineShineSave');
        if (savedData) {
            this.appState.setState(savedData);
        }
    }

    save() {
        const dataToSave = this.appState.getState();
        this.storage.save('mineShineSave', dataToSave);
    }

    autoSave() {
        // Save periodically
        setInterval(() => this.save(), 30000); // Every 30 seconds
    }

    exportSave() {
        return this.storage.export('mineShineSave');
    }

    importSave(data) {
        this.storage.import('mineShineSave', data);
        this.load();
    }
}