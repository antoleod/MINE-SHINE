
export class FloorDecorator {
    constructor(scene) {
        this.scene = scene;
    }

    create(floorData) {
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshLambertMaterial({ color: this.getColor(floorData.color || 'brown') });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);

        // Rotate to horizontal and position at bottom
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        floor.receiveShadow = true;

        return floor;
    }

    getColor(color) {
        const colors = {
            brown: 0x8B4513,
            blue: 0x0000FF,
            gray: 0x808080
        };
        return colors[color] || colors.brown;
    }
}