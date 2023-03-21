import {env} from "./constants/_env";
import {appProvider} from "./app";

const app = appProvider();
app.listen(env.PORT, (): void => {
	console.log("Server running At url:http://localhost:" + env.PORT);
});
