import {Request, Response} from "express";
import {sanitize} from "../utils/validations/sanitize";

export default function signup(req: Request, res: Response): void {
	let {email, password} = req.body;
	email = sanitize(email);
	password = sanitize(password);
	console.log("reached");

	res.send("hello");
	try {
		if (!email || !password) {
			res.status(400);
			throw new Error("Some fields are empty!");
		}
	} catch (error) {
		if (error instanceof Error) console.log(error.message);
	}
}
