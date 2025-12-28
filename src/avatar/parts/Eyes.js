
export class Eyes {
    create(data) {
        const eyes = new THREE.Group();

        const eyeGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const whiteMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
        const colorMaterial = new THREE.MeshLambertMaterial({ color: this.getEyeColor(data.color || 'blue') });

        // Left eye white
        const leftEyeWhite = new THREE.Mesh(eyeGeometry, whiteMaterial);
        leftEyeWhite.position.set(-0.08, 1.25, 0.2);
        eyes.add(leftEyeWhite);

        // Left eye color
        const leftEyeColor = new THREE.Mesh(eyeGeometry.clone().scale(0.6, 0.6, 0.6), colorMaterial);
        leftEyeColor.position.set(-0.08, 1.25, 0.22);
        eyes.add(leftEyeColor);

        // Right eye white
        const rightEyeWhite = new THREE.Mesh(eyeGeometry, whiteMaterial);
        rightEyeWhite.position.set(0.08, 1.25, 0.2);
        eyes.add(rightEyeWhite);

        // Right eye color
        const rightEyeColor = new THREE.Mesh(eyeGeometry.clone().scale(0.6, 0.6, 0.6), colorMaterial);
        rightEyeColor.position.set(0.08, 1.25, 0.22);
        eyes.add(rightEyeColor);

        return eyes;
    }

    getEyeColor(color) {
        const colors = {
            blue: 0x0000FF,
            green: 0x008000,
            brown: 0x8B4513
        };
        return colors[color] || colors.blue;
    }
}