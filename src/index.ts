import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { Injection } from "./di/Injection";
import { createApiRoutes } from "./presentation/routes/apiRoutes";
import { createRedirectRoutes } from "./presentation/routes/redirectRoutes";

const app = new Elysia()
    .use(cors());
const injection = Injection.getInstance();     
app.use(createApiRoutes(injection.shortController));
app.use(createRedirectRoutes(injection.shortController));
app.listen(3000);

console.log('- Backend running at http://localhost:3000');
console.log('- API Documentation at http://localhost:3000/api/docs');