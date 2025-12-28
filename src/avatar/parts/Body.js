
export class Body {
    create(data) {
        const geometry = new THREE.CapsuleGeometry(0.3, 0.8, 4, 8);
        const material = new THREE.MeshLambertMaterial({ color: this.getSkinTone(data.skinTone || 'light') });
        const body = new THREE.Mesh(geometry, material);
        body.position.y = 0.5;
        body.castShadow = true;
        return body;
    }

    getSkinTone(tone) {
        const tones = {
            light: 0xFDBCB4,
            medium: 0xD2B48C,
            dark: 0x8B4513
        };
        return tones[tone] || tones.light;
    }
}