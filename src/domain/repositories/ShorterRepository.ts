import type { createShorter, createShortLink, Shorter } from "../entities/Shorter";

export interface ShortRepository {
    getAll(): Promise<Shorter[]>;
    findById(id: string): Promise<Shorter | null>;
    findByShortLink(keyId: string): Promise<Shorter | null>;
    create(params: createShortLink): Promise<Shorter>;
}