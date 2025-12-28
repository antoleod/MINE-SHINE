export class TouchFeedback {
    constructor() {
        this.touches = [];
    }

    onTouch(event) {
        this.touches.push({
            x: event.data.global.x,
            y: event.data.global.y,
            time: Date.now(),
            released: false
        });
    }

    onRelease(event) {
        const touch = this.touches.find(t => !t.released);
        if (touch) {
            touch.released = true;
            touch.releaseTime = Date.now();
            // Check for tap vs hold
            if (touch.releaseTime - touch.time < 200) {
                this.handleTap(touch);
            }
        }
    }

    handleTap(touch) {
        // Create visual feedback
        console.log('Tap at', touch.x, touch.y);
    }

    update(delta) {
        // Clean up old touches
        this.touches = this.touches.filter(touch => 
            !touch.released || Date.now() - touch.releaseTime < 1000
        );
    }
}