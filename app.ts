import express from "express";
import cors from "cors";

import indexRouter from "./routes";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";

const app: express.Application = express();
cors({origin: "http:localhost:3000"});
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/v1/", indexRouter);
app.use("/v1/auth", authRouter);
app.use("/v1/user", userRouter);

export default app;
