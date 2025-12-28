export function setRoundedRect(graphics, x, y, width, height, radius, color, alpha = 1) {
    graphics.clear();
    graphics.beginFill(color, alpha);
    graphics.drawRoundedRect(x, y, width, height, radius);
    graphics.endFill();
}

export function tintColor(hex, amount) {
    const r = Math.min(255, Math.max(0, ((hex >> 16) & 0xff) + amount));
    const g = Math.min(255, Math.max(0, ((hex >> 8) & 0xff) + amount));
    const b = Math.min(255, Math.max(0, (hex & 0xff) + amount));
    return (r << 16) | (g << 8) | b;
}

export function pulse(scaleBase, amplitude, time, speed) {
    return scaleBase + Math.sin(time * speed) * amplitude;
}
