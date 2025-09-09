import type { Shorter } from "../../domain/entities/Shorter";

export interface ShortResponse {
    id: string;
    name: string;
    originalUrl: string;
    shortUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

export class ShortMapping {
    static toResponse(entity: Shorter): ShortResponse {
        return {
            id: entity.id,
            name: entity.name,
            originalUrl: entity.link,
            shortUrl: `${process.env.HOST_NAME}/${entity.shortLink}`,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt
        };
    }
}