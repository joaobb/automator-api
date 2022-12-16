import { Request, Response } from "express";
import { GetAutomatasService } from "../services/GetAutomatasService";

class GetAutomatasController {
  async handle(request: Request, response: Response) {
    const { isAdmin, userId, pageSize, offset } = request;
    try {
      console.log({isAdmin});
      const getAutomatasService = new GetAutomatasService();
      const result = await getAutomatasService.execute({
        isAdmin,
        userId,
        pageSize,
        offset,
      });

      return response.status(200).json(result);
    } catch (error: any) {
      return response.status(400).json(error.message);
    }
  }
}

export { GetAutomatasController };
