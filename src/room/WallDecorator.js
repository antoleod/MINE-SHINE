
export class WallDecorator {
    constructor(scene) {
        this.scene = scene;
    }

    create(wallData) {
        const walls = new THREE.Group();

        // Create walls as 3D boxes
        const wallGeometry = new THREE.BoxGeometry(20, 10, 0.2);
        const wallMaterial = new THREE.MeshLambertMaterial({ color: this.getColor(wallData.color || 'lightblue') });

        // Back wall
        const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
        backWall.position.set(0, 5, -10);
        walls.add(backWall);

        // Left wall
        const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
        leftWall.position.set(-10, 5, 0);
        leftWall.rotation.y = Math.PI / 2;
        walls.add(leftWall);

        // Right wall
        const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
        rightWall.position.set(10, 5, 0);
        rightWall.rotation.y = Math.PI / 2;
        walls.add(rightWall);

        return walls;
    }

    getColor(color) {
        const colors = {
            lightblue: 0xADD8E6,
            pink: 0xFFB6C1,
            green: 0x90EE90
        };
        return colors[color] || colors.lightblue;
    }
}