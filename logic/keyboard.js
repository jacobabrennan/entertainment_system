

//== Keyboard ==================================================================
/*
    Exports:
    - setup(DOMElement): part of system boot
    - keyCheck(key): returns true if key is currently depressed, false otherwise
    - registerKeyHandler(key, function): set specified function to be invoked
        whenever specified key is pressed
    - cancelKeyHandler(key): cancels any handlers on the specified key
    - flushKeyHandlers(): cancel all key handlers
*/

//-- Dependencies --------------------------------
import {
} from './constants.js';

//-- Module State --------------------------------
const keyState = [];
let keyHandlers = {};

//-- Setup (boot) --------------------------------
export function setup(container) {
    function handleEventKeyDown(eventKeyDown) {
        handleKeyDown(eventKeyDown.key.toLowerCase());
    }
    function handleEventKeyUp(eventKeyUp) {
        handleKeyUp(eventKeyUp.key.toLowerCase());
    }
    container.addEventListener('keydown', handleEventKeyDown);
    container.addEventListener('keyup'  , handleEventKeyUp  );
}

//-- Key Management ------------------------------
export function keyCheck(key) {
    // enforce canonical key representation
    key = key.toLowerCase();
    // check key state
    let codeIndex = key.charCodeAt();
    if(!keyState[codeIndex]){
        return false;
    }
    return true;
}
export function registerKeyHandler(key, handler) {
    // enforce canonical key representation
    key = key.toLowerCase();
    // Set handler
    keyHandlers[key] = handler;
}
export function cancelKeyHandler(key) {
    // enforce canonical key representation
    key = key.toLowerCase();
    // Delete handler
    delete keyHandlers[key];
}
export function flushKeyHandlers() {
    keyHandlers = {};
}

//-- Keyboard state change handlers --------------
function handleKeyDown(key) {
    // Set keyState
    let codeIndex = key.charCodeAt();
    keyState[codeIndex] = true;
    // trigger key handler
    const keyHandler = keyHandlers[key]
    if(!keyHandler) { return;}
    keyHandler(key);
}
function handleKeyUp(key) {
    let codeIndex = key.charCodeAt();
    keyState[codeIndex] = false;
}
