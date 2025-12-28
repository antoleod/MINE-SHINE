export class AppState {
    constructor() {
        this.state = {
            currentScene: 'HomeScene',
            avatar: {
                body: 'child',
                skin: 'peach',
                eyes: 'round',
                eyeColor: 'brown',
                eyebrows: 'soft',
                mouth: 'smile',
                hair: 'bob',
                hairColor: 'chestnut',
                clothes: 'casual',
                shoes: 'sneakers',
                accessories: 'none',
                emotion: 'happy',
            },
            room: {
                wall: 'sunny',
                floor: 'wood',
                furniture: [],
            },
            progression: {
                unlockedClothes: ['casual'],
                unlockedHair: ['bob'],
                unlockedFurniture: ['bed', 'table', 'lamp', 'toybox'],
                unlockedWorlds: ['HomeScene', 'ParkScene'],
                visitedWorlds: {},
            },
        };
        this.listeners = new Set();
    }

    get(path) {
        return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), this.state);
    }

    set(path, value) {
        const parts = path.split('.');
        let node = this.state;
        for (let i = 0; i < parts.length - 1; i += 1) {
            node = node[parts[i]];
        }
        node[parts[parts.length - 1]] = value;
        this.notify(path, value);
    }

    update(path, patch) {
        const current = this.get(path) || {};
        const next = { ...current, ...patch };
        this.set(path, next);
    }

    onChange(handler) {
        this.listeners.add(handler);
        return () => this.listeners.delete(handler);
    }

    notify(path, value) {
        for (const handler of this.listeners) handler(path, value, this.state);
    }
}
