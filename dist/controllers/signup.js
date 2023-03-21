"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sanitize_1 = require("../utils/validations/sanitize");
function signup(req, res) {
    let { email, password } = req.body;
    email = (0, sanitize_1.sanitize)(email);
    password = (0, sanitize_1.sanitize)(password);
    console.log("reached");
    res.send("hello");
    try {
        if (!email || !password) {
            res.status(400);
            throw new Error("Some fields are empty!");
        }
    }
    catch (error) {
        if (error instanceof Error)
            console.log(error.message);
    }
}
exports.default = signup;
