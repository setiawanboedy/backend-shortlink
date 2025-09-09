import Elysia from "elysia";
import type { ShortController } from "../controllers/ShortController";
import { createShorterRoutes } from "./shortRouter";

export function createV1Routes(shortController: ShortController) {
    return new Elysia({prefix: '/v1'})
        .use(createShorterRoutes(shortController));
}