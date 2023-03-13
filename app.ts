import express from "express";
import cors from "cors";
import {env} from "./constants/_env";
import indexRouter from "./routes";

const app: express.Application = express();
cors({origin: "http:localhost:3000"});
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/v1", indexRouter);

app.listen(env.PORT, () => {
	console.log("running at: ", env.PORT);
});

export default app;
