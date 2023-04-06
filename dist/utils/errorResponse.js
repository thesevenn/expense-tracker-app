"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function responseMessage(options) {
    const { message, quote } = options;
    const success = options.success || false;
    let response = { success, message };
    if (quote) {
        response.quote = quote;
    }
    return response;
}
exports.default = responseMessage;
