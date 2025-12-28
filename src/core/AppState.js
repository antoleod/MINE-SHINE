export class AppState {
    constructor() {
        this.currentScene = 'HomeScene';
        this.avatar = {
            body: { size: 'medium', ageGroup: 'child' },
            head: { shape: 'round', skinTone: 'light' },
            eyes: { shape: 'round', color: 'blue' },
            eyebrows: { style: 'curved' },
            mouth: { style: 'smile' },
            hair: { front: 'curly', back: 'long', color: 'brown' },
            clothes: { top: 'shirt', bottom: 'pants', color: 'blue' },
            shoes: { style: 'sneakers', color: 'white' },
            accessories: { hat: null, earrings: null, glasses: null }
        };
        this.emotion = 'happy';
        this.room = {
            walls: { color: 'lightblue', wallpaper: null },
            floor: { style: 'wood', color: 'brown' },
            furniture: [
                { type: 'bed', x: 100, y: 400 },
                { type: 'table', x: 300, y: 450 },
                { type: 'lamp', x: 350, y: 400 }
            ]
        };
        this.unlockedItems = {
            clothes: ['shirt', 'pants'],
            hairstyles: ['curly'],
            furniture: ['bed', 'table'],
            worlds: ['HomeScene', 'ParkScene']
        };
        this.progression = {
            level: 1,
            experience: 0
        };
    }

    updateAvatar(part, value) {
        if (this.avatar[part]) {
            Object.assign(this.avatar[part], value);
        }
    }

    setEmotion(emotion) {
        this.emotion = emotion;
    }

    updateRoom(section, value) {
        if (this.room[section]) {
            Object.assign(this.room[section], value);
        }
    }

    addFurniture(item) {
        this.room.furniture.push(item);
    }

    unlockItem(category, item) {
        if (!this.unlockedItems[category].includes(item)) {
            this.unlockedItems[category].push(item);
        }
    }

    getState() {
        return {
            avatar: this.avatar,
            emotion: this.emotion,
            room: this.room,
            unlockedItems: this.unlockedItems,
            progression: this.progression
        };
    }

    setState(state) {
        Object.assign(this, state);
    }
}