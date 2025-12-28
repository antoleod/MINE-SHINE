export class Time {
    constructor() {
        this.elapsed = 0;
        this.delta = 0;
        this.speed = 1; // 1x speed
    }

    update(delta) {
        this.delta = delta * this.speed;
        this.elapsed += this.delta;
    }

    getElapsed() {
        return this.elapsed;
    }

    getDelta() {
        return this.delta;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    reset() {
        this.elapsed = 0;
    }
}