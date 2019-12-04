

//== Entertainment System ======================================================
/*
    This module provides the following API

    boot(DOMIdString): Loads the system and prepares to perform I/O using the
        element specified by id.

    async sleep(duration): Resolves after specified duration; use with await.
    
    Keyboard (exported as module.keyboard):
    - keyCheck(key): returns true if key is currently depressed, false otherwise
    - registerKeyHandler(key, function): set specified function to be invoked
        whenever specified key is pressed
    - cancelKeyHandler(key): cancels any handlers on the specified key
    - flushKeyHandlers(): cancel all key handlers

    Display (exported as module.display):
    - blank(): Erases all drawn data from the canvas.
    - drawString(string, posX, posY[, color]):
        Draws a string at the specified position. Optionally, the color can be
        specified. Note that drawing strings uses a different sized coordinate
        system. String coordinates can be converted to normal coordinates by
        multiplying by DISPLAY_FONT_SIZE.
    - drawRectangle(posX, posY, width, height, color):
        Draws a filled colored rectangle with the specified dimensions at the
        specified coordinates.
    - drawCircle(posX, posY, radius, color)
        Draws a filled colored circle of the specified radius at the specified
        coordinates.
*/

//-- Dependencies --------------------------------
import * as display from './display.js';
import * as keyboard from './keyboard.js';

//-- Export select constants ---------------------
export {
    DISPLAY_WIDTH_DEFAULT as DISPLAY_WIDTH,
    DISPLAY_HEIGHT_DEFAULT as DISPLAY_HEIGHT,
    DISPLAY_FONT_SIZE,
} from './constants.js';

//-- Define and export system --------------------
const system = {}
export default system;

//-- System Boot ---------------------------------
system.boot = function (containerId) {
    // Retrieve container from DOM
    const container = document.getElementById(containerId);
    // Setup sub system
    display.setup(container);
    keyboard.setup(container);
};

//-- Expose sub systems --------------------------
system.display = Object.assign({}, display);
delete system.display.setup;
system.keyboard = Object.assign({}, keyboard);
delete system.keyboard.setup;

//-- Expose system utilities ---------------------
system.sleep = function (duration) {
    return new Promise(function (resolve) {
        setTimeout(resolve, duration);
    });
};
