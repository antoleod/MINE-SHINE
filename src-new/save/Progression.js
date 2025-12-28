export class Progression {
    constructor(appState) {
        this.appState = appState;
    }

    unlock(type, item) {
        const key = `progression.unlocked${type}`;
        const list = this.appState.get(key) || [];
        if (!list.includes(item)) {
            list.push(item);
            this.appState.set(key, list);
        }
    }

    visitWorld(sceneName) {
        const visited = this.appState.get('progression.visitedWorlds') || {};
        visited[sceneName] = true;
        this.appState.set('progression.visitedWorlds', visited);
    }
}
