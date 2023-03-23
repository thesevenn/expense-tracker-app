"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function logout(req, res) {
    try {
        res
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .clearCookie("user")
            .json({
            success: true,
            message: "user logged out",
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "An error occured on our side, try again later.",
            });
        }
    }
}
exports.default = logout;
