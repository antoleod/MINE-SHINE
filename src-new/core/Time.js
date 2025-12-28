export class Time {
    constructor() {
        this.last = performance.now();
        this.delta = 0;
        this.elapsed = 0;
    }

    tick() {
        const now = performance.now();
        this.delta = now - this.last;
        this.elapsed += this.delta;
        this.last = now;
    }
}
