export class Progression {
    constructor(appState) {
        this.appState = appState;
    }

    checkUnlocks() {
        // Check for new unlocks based on progression
        if (this.appState.progression.experience > 100 && !this.appState.unlockedItems.clothes.includes('dress')) {
            this.appState.unlockItem('clothes', 'dress');
        }
        
        if (this.appState.progression.level > 2 && !this.appState.unlockedItems.worlds.includes('BeachScene')) {
            this.appState.unlockItem('worlds', 'BeachScene');
        }
    }

    addExperience(amount) {
        this.appState.progression.experience += amount;
        if (this.appState.progression.experience >= 200) {
            this.levelUp();
        }
        this.checkUnlocks();
    }

    levelUp() {
        this.appState.progression.level++;
        this.appState.progression.experience = 0;
    }

    getProgress() {
        return {
            level: this.appState.progression.level,
            experience: this.appState.progression.experience,
            nextLevelExp: 200
        };
    }
}