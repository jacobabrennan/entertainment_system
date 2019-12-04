

//== Entertainment System ======================================================

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
