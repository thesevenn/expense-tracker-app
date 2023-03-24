import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import indexRouter from "./routes";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import {env} from "./constants/_env";
import logger from "./middlewares/logger";

const app: express.Application = express();

app.use(cors({credentials: true, origin: env.ORIGIN}));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(logger);
app.use("/v1/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

export function appProvider() {
	return app;
}

export default app;
