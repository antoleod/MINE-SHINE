export class StorageAdapter {
    constructor(key) {
        this.key = key;
    }

    load() {
        const raw = localStorage.getItem(this.key);
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch (err) {
            return null;
        }
    }

    save(data) {
        localStorage.setItem(this.key, JSON.stringify(data));
    }
}
