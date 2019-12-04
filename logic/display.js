

//== Display ===================================================================
/*
    Exports:
    - setup(DOMElement): part of system boot
*/

//-- Dependencies --------------------------------
import {
    DISPLAY_FONT,
    DISPLAY_WIDTH_DEFAULT,
    DISPLAY_HEIGHT_DEFAULT,
} from './constants.js';

//-- Module State --------------------------------
let context;

//-- Setup (boot) --------------------------------
export function setup(container) {
    // Canvas
    const canvasMain = document.createElement('canvas');
    canvasMain.width  = DISPLAY_WIDTH_DEFAULT;
    canvasMain.height = DISPLAY_HEIGHT_DEFAULT;
    // Container
    container.tabIndex = 1;
    container.appendChild(canvasMain);
    // Context
    context = canvasMain.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.font = DISPLAY_FONT;
}
