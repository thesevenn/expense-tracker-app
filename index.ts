import app from "./app";
import {env} from "./constants/_env";

app.listen(env.PORT, (): void => {
	console.log("Server running At url:http://localhost:" + env.PORT);
});
