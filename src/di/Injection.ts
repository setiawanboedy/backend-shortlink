import type { IShorterService } from "../application/interfaces/IShorterService";
import { ShorterService } from "../application/services/ShorterService";
import type { ShortRepository } from "../domain/repositories/ShorterRepository";
import { PrismaRepository } from "../infrastructure/repositories/PrismaRepository";
import { ShortController } from "../presentation/controllers/ShortController";

export class Injection {
    private static instance: Injection;

    private _shortRepository: ShortRepository;
    private _shortService: IShorterService;
    private _shortController: ShortController;

    private constructor(){
        this._shortRepository = new PrismaRepository();
        this._shortService = new ShorterService(this._shortRepository);
        this._shortController = new ShortController(this._shortService);
    }

    public static getInstance(): Injection {
        if (!Injection.instance) {
            Injection.instance = new Injection();
        }
        return Injection.instance;
    }

    // public get shortRepository(): ShortRepository {
    //     return this._shortRepository;
    // }

    // public get shortService(): IShorterService {
    //     return this._shortService;
    // }

    public get shortController(): ShortController {
        return this._shortController;
    }

}