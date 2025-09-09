import type { createShorter, Shorter } from "../../domain/entities/Shorter";
import type { ShortResponse } from "../mapping/ShortMapping";

export interface IShorterService {
    getShorteners(): Promise<ShortResponse[]>;
    findShorter(id: string): Promise<ShortResponse | null>;
    findByKeyId(keyId: string): Promise<Shorter | null>;
    createShorter(params: createShorter): Promise<ShortResponse>;
}