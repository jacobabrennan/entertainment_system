

//== Display ===================================================================
/*
    This module provides functions for drawing graphics on the system display.
    Note that the coordinates used in this system differ from those commonly
    used in computer graphics. Computer graphics usually place the origin in the
    upper left corner; this module places the origin in the lower left. This
    coordinate system should provide an easier introduction for programmers
    used to mathematical convention.

    Exports:
    - setup(DOMElement): part of system boot.
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
import {
    DOM_STYLE_DYNAMIC,
    DISPLAY_WIDTH_DEFAULT,
    DISPLAY_HEIGHT_DEFAULT,
    DISPLAY_FONT_SIZE,
    DISPLAY_FONT_FAMILY,
} from './constants.js';

//-- Module State --------------------------------
let context;

//-- Setup (boot) --------------------------------
export function setup(elementContainer) {
    // Create display canvas
    const elementCanvas = document.createElement('canvas');
    elementCanvas.width  = DISPLAY_WIDTH_DEFAULT;
    elementCanvas.height = DISPLAY_HEIGHT_DEFAULT;
    // Load custom font by appending dynamic style sheet
    const elementStyle = document.createElement('style');
    elementStyle.innerText = DOM_STYLE_DYNAMIC;
    document.head.appendChild(elementStyle);
    // Configure necessary container/canvas CSS
    elementContainer.style.outline = 'none';
    elementContainer.style.overflow = 'hidden';
    elementCanvas.style.background = 'black';
    elementCanvas.style.width = '100%';
    elementCanvas.style.height = '100%';
    elementCanvas.style.objectFit = 'contain';
    elementCanvas.style.imageRendering = 'crisp-edges';
    // Focus controll on container
    elementContainer.tabIndex = 1;
    elementContainer.appendChild(elementCanvas);
    elementContainer.focus();
    // Request and configure display context
    context = elementCanvas.getContext('2d');
    context.imageSmoothingEnabled = false;
    context.font = `${DISPLAY_FONT_SIZE}px ${DISPLAY_FONT_FAMILY}`;
}

//-- Screen Blanking -----------------------------
export function blank() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

//-- Text drawing --------------------------------
export function drawString(string, posX, posY, color='#fff') {
    // Save drawing context state
    context.save();
    // Translate cartesian character coords to context coords
    const drawHeight = context.canvas.height;
    let drawX = posX*DISPLAY_FONT_SIZE;
    let drawY = drawHeight - (posY*DISPLAY_FONT_SIZE);
    // Draw string
    context.fillStyle = color;
    context.fillText(string, drawX, drawY);
    // Restore drawing context state
    context.restore();
}

//-- Drawing Geometry ----------------------------
export function drawRectangle(posX, posY, width, height, color) {
    // Save drawing context state
    context.save();
    // Translate cartesian coords to context coords
    const drawHeight = context.canvas.height;
    let drawX = posX;
    let drawY = drawHeight - (posY+height);
    // Fill rectangle
    context.fillStyle = color;
    context.fillRect(drawX, drawY, width, height);
    // Restore drawing context state
    context.restore();
}
export function drawCircle(posX, posY, radius, color) {
    // Save drawing context state
    context.save();
    // Translate cartesian coords to context coords
    const drawHeight = context.canvas.height;
    let drawX = posX;
    let drawY = drawHeight - (posY);
    // Fill circle
    context.fillStyle = color;
    context.beginPath();
    context.ellipse(drawX, drawY, radius, radius, 0, 0, Math.PI*2);
    context.fill();
    // Restore drawing context state
    context.restore();
}
