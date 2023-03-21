"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _env_1 = require("./constants/_env");
const app_1 = require("./app");
const app = (0, app_1.appProvider)();
app.listen(_env_1.env.PORT, () => {
    console.log("Server running At url:http://localhost:" + _env_1.env.PORT);
});
