export const Ease = {
    outBack(t) {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    outCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    },
    inCubic(t) {
        return t * t * t;
    },
    inOutSine(t) {
        return -(Math.cos(Math.PI * t) - 1) / 2;
    },
};
