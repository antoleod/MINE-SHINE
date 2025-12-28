export class AvatarEmotions {
    constructor() {
        this.currentEmotion = 'happy';
        this.blinkTimer = 0;
        this.breathTimer = 0;
    }

    setEmotion(emotion, parts) {
        this.currentEmotion = emotion;
        this.applyEmotionToParts(emotion, parts);
    }

    applyEmotionToParts(emotion, parts) {
        if (parts.eyes) {
            // Adjust eyes based on emotion
            parts.eyes.scale.y = emotion === 'surprised' ? 1.2 : 1;
        }
        if (parts.mouth) {
            // Adjust mouth
            parts.mouth.scale.y = emotion === 'sad' ? 0.5 : 1;
            parts.mouth.rotation = emotion === 'happy' ? 0.1 : 0;
        }
        if (parts.eyebrows) {
            // Adjust eyebrows
            parts.eyebrows.y = emotion === 'angry' ? -27 : -25;
        }
    }

    update(delta, parts) {
        // Blinking
        this.blinkTimer += delta;
        if (this.blinkTimer > 200) {
            // Blink eyes
            this.blinkTimer = 0;
        }

        // Breathing rhythm based on emotion
        this.breathTimer += delta * (this.currentEmotion === 'excited' ? 1.5 : 1);
    }
}