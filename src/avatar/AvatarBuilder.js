import { Body } from './parts/Body.js';
import { Head } from './parts/Head.js';
import { Eyes } from './parts/Eyes.js';
import { Eyebrows } from './parts/Eyebrows.js';
import { Mouth } from './parts/Mouth.js';
import { Hair } from './parts/Hair.js';
import { Clothes } from './parts/Clothes.js';
import { Shoes } from './parts/Shoes.js';
import { Accessories } from './parts/Accessories.js';

export class AvatarBuilder {
    constructor() {
        this.partsClasses = {
            body: Body,
            head: Head,
            eyes: Eyes,
            eyebrows: Eyebrows,
            mouth: Mouth,
            hair: Hair,
            clothes: Clothes,
            shoes: Shoes,
            accessories: Accessories
        };
    }

    build(avatarData) {
        const parts = {};
        Object.keys(avatarData).forEach(key => {
            const PartClass = this.partsClasses[key];
            if (PartClass) {
                parts[key] = new PartClass().create(avatarData[key]);
            }
        });
        return parts;
    }
}