import type { createShorter } from "../../domain/entities/Shorter";
import { ValidationError } from "../../domain/errors/customErrors";

export class ShortValidator {
  static validateCreateShorter(body: any): createShorter {
    if (!body.name || typeof body.name !== "string") {
      throw new ValidationError("Name is required and must be a string");
    }

    if (!body.link || typeof body.link !== "string") {
      throw new Error("longUrl is necessary");
    }
    if (!/^http(s){0,1}:\/\//.test(body.link)) {
      throw new Error("Long URL should start with 'http://' or 'https://'");
    }


    return {
      name: body.name.trim(),
      link: body.link.trim(),
    };
  }
}