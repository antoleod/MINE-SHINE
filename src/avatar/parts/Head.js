
export class Head {
    create(data) {
        let geometry;
        if (data.shape === 'round') {
            geometry = new THREE.SphereGeometry(0.25, 16, 16);
        } else {
            geometry = new THREE.SphereGeometry(0.25, 16, 16);
            geometry.scale(1, 1.2, 1); // Make it slightly oval
        }
        const material = new THREE.MeshLambertMaterial({ color: this.getSkinTone(data.skinTone || 'light') });
        const head = new THREE.Mesh(geometry, material);
        head.position.y = 1.2;
        head.castShadow = true;
        return head;
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