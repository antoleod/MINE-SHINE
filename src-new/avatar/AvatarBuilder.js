import { Body } from './parts/Body.js';
import { Head } from './parts/Head.js';
import { Eyes } from './parts/Eyes.js';
import { Eyebrows } from './parts/Eyebrows.js';
import { Mouth } from './parts/Mouth.js';
import { Hair } from './parts/Hair.js';
import { Clothes } from './parts/Clothes.js';
import { Shoes } from './parts/Shoes.js';
import { Accessories } from './parts/Accessories.js';
import { Avatar } from './Avatar.js';

export class AvatarBuilder {
    build(config) {
        const hair = new Hair(config);
        const parts = {
            body: new Body(config),
            head: new Head(config),
            eyes: new Eyes(config),
            eyebrows: new Eyebrows(config),
            mouth: new Mouth(config),
            hairBack: hair.back,
            hairFront: hair.front,
            hair,
            clothes: new Clothes(config),
            shoes: new Shoes(config),
            accessories: new Accessories(config),
        };
        return new Avatar(parts);
    }
}
