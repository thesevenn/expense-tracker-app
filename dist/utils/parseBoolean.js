"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseBoolean(target) {
    let boolean = false;
    if (target &&
        target != 0 &&
        target != undefined &&
        target != null &&
        target != "" &&
        target != "false") {
        boolean = true;
    }
    return boolean;
}
exports.default = parseBoolean;
