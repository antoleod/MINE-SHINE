export const MathUtil = {
    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },
    lerp(a, b, t) {
        return a + (b - a) * t;
    },
    rand(min, max) {
        return min + Math.random() * (max - min);
    },
    pick(list) {
        return list[Math.floor(Math.random() * list.length)];
    },
};
