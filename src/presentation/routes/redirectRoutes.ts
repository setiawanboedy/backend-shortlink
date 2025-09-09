import Elysia, { t } from "elysia";
import type { ShortController } from "../controllers/ShortController";

export function createRedirectRoutes(shortController: ShortController) {
    return new Elysia()
        .get("/:keyId", async ({ params, set, redirect }) => {
             const keyId = params.keyId;
             
             if (!keyId || keyId.length === 0) {
                 set.status = 400;
                 return { message: "the short url is wrong" };
             }
             try {
                 const short = await shortController.getShortByKeyId(keyId);
                 if (!short) {
                     set.status = 404;
                     return { message: "Short link not found" };
                 }
                 
                 return redirect(short.link);
             } catch (error) {
                 set.status = 500;
                 return { message: "Internal server error" };
             }
        }, {
            params: t.Object({
                keyId: t.String(),
            }),
           
        })
}