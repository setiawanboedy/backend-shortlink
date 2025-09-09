export interface Shorter {
    id: string;
    name: string;
    link: string;
    shortLink?: string | null
    createdAt: Date;
    updatedAt: Date;
}

export interface createShorter {
    name: string;
    link: string;
}

export interface createShortLink extends createShorter {
    shortLink?: string;
}