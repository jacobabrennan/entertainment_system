

//== Player ====================================================================
/*
    Exports Player class:
    - inherited values from Particle (particle.js)
    - speed: The distance the player will be displayed laterally every game loop
        iteration when receiving commands from the player.
    - move(): moves the player laterally, taking into account own speed and the
        edges of the game area.
    - shoot(): Creates a laser projectile in front of the player.
*/

//-- Dependencies --------------------------------
import { KEY_ARROW_LEFT, KEY_ARROW_RIGHT, KEY_SPACE } from './logic/constants.js';
import system, { DISPLAY_WIDTH, DISPLAY_HEIGHT } from './logic/index.js';
import { Particle } from './particle.js';

//-- Player --------------------------------------
export class Player extends Particle {
    color = 'red';
    speed = 4;
    takeTurn() {
        if(system.keyboard.keyCheck(KEY_ARROW_LEFT)) {
            this.move(-1);
        }
        if(system.keyboard.keyCheck(KEY_ARROW_RIGHT)) {
            this.move(1);
        }
        if(system.keyboard.keyCheck(KEY_SPACE)) {
            this.shoot();
        }
    }
    move(direction) {
        this.translate(direction*this.speed);
        const xMin = 0;
        const xMax = DISPLAY_WIDTH-this.width;
        if(this.x < xMin) { this.x = xMin;}
        if(this.x > xMax) { this.x = xMax;}
    }
    shoot() {
        const projectile = new Laser();
        // Center projectile on player along x axis
        projectile.x = this.x + (this.width-projectile.width)/2;
        // Align top edge of projectile with top edge of player
        projectile.y = this.y + (this.height-projectile.height);
        // Drawing a picture and labeling all the edges and displacements helps.
    }
}

//-- Laser Projectile ----------------------------
class Laser extends Particle {
    width = 2;
    height = 8;
    speed = 8;
    takeTurn() {
        this.translate(0, this.speed)
        if(this.y >= DISPLAY_HEIGHT) {
            this.dispose();
        }
    }
}
