import {Request} from "express";

export default interface RequestWithUser extends Request {
	user?: string;
	name?: string;
}
