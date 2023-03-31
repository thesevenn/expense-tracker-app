"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseMessage(options) {
    const { message, success = false, quote } = options;
    let response = { success, message };
    if (quote) {
        response.quote = quote;
    }
    return response;
}
exports.default = responseMessage;
