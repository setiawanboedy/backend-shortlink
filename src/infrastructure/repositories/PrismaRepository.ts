import { PrismaClient } from "@prisma/client";
import type { createShorter, createShortLink, Shorter } from "../../domain/entities/Shorter";
import type { ShortRepository } from "../../domain/repositories/ShorterRepository";

const prisma = new PrismaClient();

export class PrismaRepository implements ShortRepository {
    async getAll(): Promise<Shorter[]> {
        const shorters = await prisma.shorter.findMany();
        return shorters
    }
    async findById(id: string): Promise<Shorter | null> {
        const shorter = await prisma.shorter.findUnique({
            where: {id}
        });
        return shorter;

    }
    async findByShortLink(keyId: string): Promise<Shorter | null> {
        const shorter = await prisma.shorter.findFirst({
            where: { shortLink: keyId }
        });
        return shorter;

    }
    async create(params: createShortLink): Promise<Shorter> {
        const create = await prisma.shorter.create({
            data: {
                name: params.name,
                link: params.link,
                shortLink: params.shortLink || null
            }
        });

        return create;
    }

}