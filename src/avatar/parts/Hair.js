
export class Hair {
    create(data) {
        const geometry = new THREE.SphereGeometry(0.28, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const material = new THREE.MeshLambertMaterial({ color: this.getHairColor(data.color || 'brown') });
        const hair = new THREE.Mesh(geometry, material);
        hair.position.set(0, 1.35, 0);
        hair.scale.set(1, 0.6, 1);
        return hair;
    }

    getHairColor(color) {
        const colors = {
            brown: 0x8B4513,
            blonde: 0xFAF0BE,
            black: 0x000000
        };
        return colors[color] || colors.brown;
    }
}