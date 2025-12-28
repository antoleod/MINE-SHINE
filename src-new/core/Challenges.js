export const CHALLENGE_LIST = [
    {
        id: 'rainy',
        label: 'Dress for Rain',
        type: 'avatar:clothes',
        match: (value) => value === 'rainy',
        color: 0x9bbcff,
    },
    {
        id: 'happy',
        label: 'Make Them Smile',
        type: 'avatar:emotion',
        match: (value) => value === 'happy',
        color: 0xffd6a5,
    },
    {
        id: 'play',
        label: 'Play Time',
        type: 'avatar:emotion',
        match: (value) => value === 'excited',
        color: 0xffafcc,
    },
    {
        id: 'park',
        label: 'Visit the Park',
        type: 'scene:change',
        match: (value) => value === 'ParkScene',
        color: 0xb7e4c7,
    },
    {
        id: 'decorate',
        label: 'Cozy Up the Room',
        type: 'room:added',
        match: (_value, appState) => {
            const furniture = appState.get('room.furniture') || [];
            return furniture.length >= 6;
        },
        color: 0xf6bd60,
    },
];

export class Challenges {
    constructor(appState, eventBus) {
        this.appState = appState;
        this.eventBus = eventBus;
        this.active = appState.get('challenges.active');
    }

    init() {
        this.eventBus.on('challenge:select', (id) => this.select(id));
        CHALLENGE_LIST.forEach((challenge) => {
            this.eventBus.on(challenge.type, (value) => this.check(challenge, value));
        });
    }

    select(id) {
        this.active = id;
        this.appState.set('challenges.active', id);
        this.eventBus.emit('save:request');
    }

    check(challenge, value) {
        if (!this.active || this.active !== challenge.id) return;
        const completed = this.appState.get('challenges.completed') || {};
        if (completed[challenge.id]) return;
        const isDone = challenge.match(value, this.appState);
        if (!isDone) return;
        completed[challenge.id] = true;
        this.active = null;
        this.appState.set('challenges.active', null);
        this.appState.set('challenges.completed', completed);
        this.eventBus.emit('reward:grant');
        this.eventBus.emit('save:request');
    }
}
