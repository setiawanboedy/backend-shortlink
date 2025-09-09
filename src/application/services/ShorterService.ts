import { randomUUID } from "crypto";
import type {
  Shorter,
  createShortLink,
  createShorter,
} from "../../domain/entities/Shorter";
import type { ShortRepository } from "../../domain/repositories/ShorterRepository";
import type { IShorterService } from "../interfaces/IShorterService";
import { nanoid } from "nanoid";
import { ShortMapping, type ShortResponse } from "../mapping/ShortMapping";

export class ShorterService implements IShorterService {
  constructor(private readonly shortRepository: ShortRepository) {}
  async getShorteners(): Promise<ShortResponse[]> {
    const shorters = await this.shortRepository.getAll();
    const shortsMap = shorters.map((data) => ShortMapping.toResponse(data));
    return shortsMap;
  }
  async findShorter(id: string): Promise<ShortResponse | null> {
    const shorter = await this.shortRepository.findById(id);
    if (shorter) {
      return ShortMapping.toResponse(shorter);
    }
    return null;
  }

  async findByKeyId(keyId: string): Promise<Shorter | null> {
    const short = await this.shortRepository.findByShortLink(keyId);
    return short;
  }

  async createShorter(params: createShorter): Promise<ShortResponse> {
    const shortLink = this.converShortLink(params.link);
    const shortData: createShortLink = {
      name: params.name,
      link: params.link,
      shortLink: shortLink,
    };
    const shorter = await this.shortRepository.create(shortData);
    return ShortMapping.toResponse(shorter);
  }

  private converShortLink(link: string): string {
    const keySet: Set<String> = new Set();
    const shortURLs: { [key: string]: string } = {};
    const key = nanoid(5);
    if (keySet.has(key)) throw new Error("key is duplicate");
    keySet.add(key);
    shortURLs[key] = link;
    const shortUrl = `${key}`;
    return shortUrl;
  }
}
