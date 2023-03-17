import express from "express";
const routes = express.Router();

routes.get("/", (req, res) => {
	res.status(404).send("hello");
});

export default routes;
