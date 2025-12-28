export class StorageAdapter {
    save(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error('Save failed:', error);
        }
    }

    load(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Load failed:', error);
            return null;
        }
    }

    export(key) {
        return this.load(key);
    }

    import(key, data) {
        this.save(key, data);
    }

    clear(key) {
        localStorage.removeItem(key);
    }
}