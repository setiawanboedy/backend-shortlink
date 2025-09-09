import Elysia, { t } from "elysia";
import type { ShortController } from "../controllers/ShortController";

export function createShorterRoutes(shortController: ShortController) {
    return new Elysia({prefix: '/shorters'})
        .get("/", () => shortController.getAllShorts(), {
            detail: {
                tags: ["Shorters"],
                summary: "Get all links",
                description:
                "Retrieves all links",
            },
            })
        .get("/:id", ({params}) => shortController.getShort(params), {
            params: t.Object({
                id: t.String(),
            }),
            detail: {
                tags: ["Shorters"],
                summary: "Get shorter by ID",
                description: "Retrieves a specific shorter by its ID",
            },
        })
        .post("/", ({ body }) => shortController.createShortLink(body), {
            body: t.Object({
                name: t.String(),
                link: t.String(),
            }),
            detail: {
                tags: ["Shorters"],
                summary: "Create a new shortlink",
                description:
                "Creates a new shortlink with the specified name, path, and optional parent",
            },
            })    

}