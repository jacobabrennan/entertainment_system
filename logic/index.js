

//== Entertainment System ======================================================

//-- Dependencies --------------------------------
import {
    DOM_ID_GAME_AREA,
} from './constants.js';
import { setup as setupDisplay } from './display.js';
import { setup as setupKeyboard } from './keyboard.js';

//-- Boot System ---------------------------------
// Retrieve container from DOM
const container = document.getElementById(DOM_ID_GAME_AREA);
// Setup sub system
setupDisplay(container);
setupKeyboard(container);
