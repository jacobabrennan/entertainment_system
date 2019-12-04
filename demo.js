

//== Simple Example Game =======================================================
/*
    This example demonstrates basic use of the system API to capture player
    commands and display game objects in a game loop. Every game has at its core
    a process of:
        input -> game logic -> output
*/

//-- Dependencies --------------------------------
import system, { DISPLAY_WIDTH } from './api/index.js';
import { particles } from './particle.js';
import { Player } from './player.js';

//-- Project Constants ---------------------------
const MAIN_LOOP_ITERATION_DELAY = 1000/30;

//-- Setup Game ----------------------------------
system.boot('game_area');
new Player(DISPLAY_WIDTH/2, 8);

//-- Enter main game loop ------------------------
async function main() {
    while(true) {
        // Blank whole screen
        system.display.blank();
        // Perform game logic
        for(let indexP = 0; indexP < particles.length; indexP++) {
            let particleIndexed = particles[indexP];
            particleIndexed.takeTurn();
        }
        // Redraw screen
        for(let indexP = 0; indexP < particles.length; indexP++) {
            let particleIndexed = particles[indexP];
            particleIndexed.draw();
        }
        // Delay before continuing to next iteration
        await system.sleep(MAIN_LOOP_ITERATION_DELAY);
    }
}
main(); /*
    This is a clumsy construction, but necessary with how we've defined
    the game loop using an async function for our iteration delay.
*/
