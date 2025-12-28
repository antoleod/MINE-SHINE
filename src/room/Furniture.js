
export class Furniture {
    static create(type, x, y, z = 0) {
        let geometry, material, mesh;

        switch (type) {
            case 'bed':
                geometry = new THREE.BoxGeometry(2, 0.5, 1);
                material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
                mesh = new THREE.Mesh(geometry, material);
                break;
            case 'table':
                geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 8);
                material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
                mesh = new THREE.Mesh(geometry, material);
                // Add tabletop
                const tableTopGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 8);
                const tableTop = new THREE.Mesh(tableTopGeometry, material);
                tableTop.position.y = 0.5;
                mesh.add(tableTop);
                break;
            case 'lamp':
                // Lamp base
                geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 8);
                material = new THREE.MeshLambertMaterial({ color: 0x808080 });
                mesh = new THREE.Mesh(geometry, material);
                // Lamp shade
                const shadeGeometry = new THREE.ConeGeometry(0.3, 0.4, 8);
                const shadeMaterial = new THREE.MeshLambertMaterial({ color: 0xFFFF00 });
                const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
                shade.position.y = 0.4;
                mesh.add(shade);
                break;
            default:
                geometry = new THREE.BoxGeometry(1, 1, 1);
                material = new THREE.MeshLambertMaterial({ color: 0xCCCCCC });
                mesh = new THREE.Mesh(geometry, material);
        }

        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }
}