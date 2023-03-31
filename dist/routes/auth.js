"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const login_1 = __importDefault(require("../controllers/login"));
const logout_1 = __importDefault(require("../controllers/logout"));
const signup_1 = __importDefault(require("../controllers/signup"));
const newAccess_1 = __importDefault(require("../controllers/newAccess"));
// GET at - /logout
//  logs user out and invadlidates the access-token
router.get("/logout", logout_1.default);
// POST at - /login
//  logins existing user using email login w/ jwt or email and password login.
//  body contains - email and password(if pass implemeneted).
router.post("/login", login_1.default);
// POST at - /sign-up
//  registers new user with email.
//  body contains - email, dob, username, pass(?), store status
router.post("/sign-up", signup_1.default);
// GET at - /new-access
//  generates a new access token for given valid refresh token.
//  body contains - {}, refresh token from cookies
router.get("/new-access", newAccess_1.default);
exports.default = router;
