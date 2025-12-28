import { BaseScene } from './BaseScene.js';

export class ParkScene extends BaseScene {
    constructor(scene, appState, eventBus) {
        super(scene, appState, eventBus);
        this.background = null;
        this.animals = [];
    }

    init() {
        // Green ground plane
        const groundGeometry = new THREE.PlaneGeometry(50, 50);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
        this.background = new THREE.Mesh(groundGeometry, groundMaterial);
        this.background.rotation.x = -Math.PI / 2;
        this.background.receiveShadow = true;
        this.container.add(this.background);

        // Add some trees, flowers, etc.
        this.addTrees();
        this.addAnimals();
    }

    addTrees() {
        // 3D tree
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.set(5, 1, 0);
        trunk.castShadow = true;

        const leavesGeometry = new THREE.SphereGeometry(1, 8, 6);
        const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.set(5, 2.5, 0);
        leaves.castShadow = true;

        this.container.add(trunk);
        this.container.add(leaves);
    }

    addAnimals() {
        // Simple 3D butterfly
        const wingGeometry = new THREE.PlaneGeometry(0.5, 0.3);
        const wingMaterial = new THREE.MeshLambertMaterial({ color: 0xFF69B4, side: THREE.DoubleSide });

        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(0, 0, 0.1);
        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(0, 0, -0.1);

        const butterfly = new THREE.Group();
        butterfly.add(leftWing);
        butterfly.add(rightWing);
        butterfly.position.set(10, 2, 0);

        this.container.add(butterfly);
        this.animals.push(butterfly);
    }

    update() {
        // Animate animals
        this.animals.forEach(animal => {
            animal.position.x += Math.sin(Date.now() * 0.001) * 0.01;
            animal.rotation.z = Math.sin(Date.now() * 0.002) * 0.2;
        });
    }

    resize() {
        if (this.background) {
            this.background.clear();
            this.background.beginFill(0x90EE90);
            this.background.drawRect(0, 0, this.app.screen.width, this.app.screen.height);
        }
    }
}