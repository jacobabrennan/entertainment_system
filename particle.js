

//== Particle ==================================================================
/*
    Exports:
    particles: an array of all particles in the game.
    Particle: class representing game objects that can move and be displayed.
    - x, y: the particle's coordinates.
    - width, height: the particle's dimensions.
    - color: the particle's display color.
    - constructor(posX=0, posY=0): specifies starting coordinates.
    - dispose(): removes the particle from the game.
    - translate(deltaX=0, deltaY=0): moves the particle's coordinates by the
        specified amount.
    - draw(): draws the particle to the screen
    - takeTurn(): instructs the particle to perform its specific game logic.
        This hook is provided for inheriting classes and instances to override.
*/

//-- Dependencies --------------------------------
import system from "./logic/index.js";

//-- Module State --------------------------------
export const particles = [];

//-- Particle Class ------------------------------
export class Particle {
    x = 0;
    y = 0;
    width = 16;
    height = 16;
    color = 'white';
    constructor(posX=0, posY=0) {
        this.x = Math.floor(posX);
        this.y = Math.floor(posY);
        particles.push(this);
    }
    dispose() {
        const indexSelf = particles.indexOf(this);
        if(!indexSelf) { return;}
        particles.splice(indexSelf, 1);
    }
    translate(deltaX=0, deltaY=0) {
        this.x += Math.floor(deltaX);
        this.y += Math.floor(deltaY);
    }
    draw() {
        system.display.drawRectangle(
            this.x, this.y,
            this.width, this.height,
            this.color,
        );
    }
    takeTurn() {}
}
