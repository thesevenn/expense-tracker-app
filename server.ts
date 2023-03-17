import app from "./app";
import {env} from "./constants/_env";

app.listen(env.PORT, (): void => {
	console.log("Listening at port number: " + env.PORT);
});
