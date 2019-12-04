

//== Display ===================================================================
/*
    Exports:
    - setup(DOMElement): part of system boot
*/

//-- Dependencies --------------------------------
import {
    DOM_STYLE_DYNAMIC,
    DISPLAY_FONT,
    DISPLAY_WIDTH_DEFAULT,
    DISPLAY_HEIGHT_DEFAULT,
} from './constants.js';

//-- Module State --------------------------------
let context;

//-- Setup (boot) --------------------------------
export function setup(elementContainer) {
    // Create display canvas
    const elementCanvas = document.createElement('canvas');
    elementCanvas.width  = DISPLAY_WIDTH_DEFAULT;
    elementCanvas.height = DISPLAY_HEIGHT_DEFAULT;
    // Add font style sheet
    const elementStyle = document.createElement('style');
    elementStyle.innerText = DOM_STYLE_DYNAMIC;
    document.head.appendChild(elementStyle);
    // Configure container/canvas CSS
    elementContainer.style.outline = 'none';
    elementContainer.style.overflow = 'hidden';
    elementCanvas.style.background = 'black';
    elementCanvas.style.width = '100%';
    elementCanvas.style.height = '100%';
    elementCanvas.style.objectFit = 'contain';
    elementCanvas.style.imageRendering = 'crisp-edges';
    // Container
    elementContainer.tabIndex = 1;
    elementContainer.appendChild(elementCanvas);
    // Context
    context = elementCanvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.font = DISPLAY_FONT;
    // Test
    context.fillStyle = 'black';
    context.fillRect(0,0,DISPLAY_WIDTH_DEFAULT,DISPLAY_HEIGHT_DEFAULT);
    context.fillStyle = 'white';
    setInterval(
        function () { context.fillText('Loaded', 0, 32);},
        100,
    );
    context.fillText(DISPLAY_FONT, 0, 16);
}
