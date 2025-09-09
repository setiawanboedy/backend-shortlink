import type { IShorterService } from "../../application/interfaces/IShorterService";
import type { ShortResponse } from "../../application/mapping/ShortMapping";
import type { Shorter } from "../../domain/entities/Shorter";
import {
  ResponseFormatter,
  type ApiResponse,
} from "../../utils/ResponseFormatter";
import { ShortValidator } from "../validators/ShortValidator";

export class ShortController {
  constructor(private readonly shortService: IShorterService) {}

  async getAllShorts(): Promise<ApiResponse<ShortResponse[]>> {
    try {
      const shorts = await this.shortService.getShorteners();
      return ResponseFormatter.success(shorts, "Shorts successfully");
    } catch (error) {
      return ResponseFormatter.error(error, "Short ");
    }
  }

  async getShort(params: {id: string}): Promise<ApiResponse<ShortResponse | null>> {
      try {
          if (params.id && params.id.length === 0) {
              return ResponseFormatter.error("id cannot be null or empty", "Error params");
          }
          const short = await this.shortService.findShorter(params.id);
          return ResponseFormatter.success(short, "Short sucessfully");
      } catch (error) {
          return ResponseFormatter.error(error, "Short error")
      }
  }

  async getShortByKeyId(keyId: string): Promise<Shorter | null> {
    return await this.shortService.findByKeyId(keyId);
  }

  async createShortLink(body: any): Promise<ApiResponse<ShortResponse>> {
    try {
      const validateData = ShortValidator.validateCreateShorter(body);
      const short = await this.shortService.createShorter(validateData);
      return ResponseFormatter.success(short, "Create short link successfully");
    } catch (error) {
      return ResponseFormatter.error(error, "Create short link failed");
    }
  }
}
