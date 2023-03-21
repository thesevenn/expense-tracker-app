import {NextFunction, Request, Response} from "express";

export default function logger(
	req: Request,
	res: Response,
	next: NextFunction
): void {
	console.log(`request made at: ${req.originalUrl} :: method:${req.method}`);
	next();
}
