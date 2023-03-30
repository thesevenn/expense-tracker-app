import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
	res.status(200).json({
		success: true,
		message: "Request was completed gracefully",
	});
});

export default routes;
