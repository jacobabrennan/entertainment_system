

//== Simple Example Game =======================================================
/*
    This example demonstrates basic use of the system API to capture player
    commands and display game objects in a game loop. Every game has at its core
    a process of:
        input -> game logic -> output
    
    The demo controls are as follows:
    - Left / Right arrow keys: Move laterally
    - Spacebar: Fire laser
*/

//-- Dependencies --------------------------------
import system, { DISPLAY_WIDTH } from './api/index.js';
import { particles } from './particle.js';
import { Player } from './player.js';

//-- Project Constants ---------------------------
const DOM_CONTAINER_ID = 'game_area'; /* The id of the target container for the
    game. The specified element must be a container, such as a div, and must be
    empty. */
const MAIN_LOOP_ITERATION_DELAY = 1000/30;

//-- Setup Game ----------------------------------
system.boot(DOM_CONTAINER_ID);
new Player(DISPLAY_WIDTH/2, 8);

//-- Enter main game loop ------------------------
(async function main() {
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
})();
