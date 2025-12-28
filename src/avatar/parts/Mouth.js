
export class Mouth {
    create(data) {
        let geometry, material;

        if (data.style === 'smile') {
            geometry = new THREE.TorusGeometry(0.05, 0.02, 8, 16, Math.PI);
            material = new THREE.MeshLambertMaterial({ color: 0xFF69B4 });
        } else {
            geometry = new THREE.PlaneGeometry(0.1, 0.05);
            material = new THREE.MeshLambertMaterial({ color: 0xFF69B4 });
        }

        const mouth = new THREE.Mesh(geometry, material);
        mouth.position.set(0, 1.15, 0.22);
        if (data.style === 'smile') {
            mouth.rotation.z = Math.PI;
        }

        return mouth;
    }
}