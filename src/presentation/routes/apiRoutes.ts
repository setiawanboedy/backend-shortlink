import Elysia from "elysia";
import type { ShortController } from "../controllers/ShortController";
import { createV1Routes } from "./v1Routes";
import swagger from "@elysiajs/swagger";

export function createApiRoutes(shortController: ShortController) {
    return new Elysia({prefix: '/api'})
    .use(swagger({
        path: '/docs',
        documentation: {
            info: {
                title: 'Short Link API',
                version: '1.0.0',
                description: 'REST API for Short link application with Clean Architecture',
            },
            tags: [
                { name: 'ShortLinks', description: 'ShortLinks management endpoints' },
            ]
        }
    }))
        .use(createV1Routes(shortController))
}