import { Request, Response } from "express";
import { GetUserAnswersService } from "../services/GetUserAnswersService";

class GetUserAnswersController {
  async handle(request: Request, response: Response) {
    const { userId, pageSize, offset } = request;
    try {
      const getUserAnswersService = new GetUserAnswersService();
      const result = await getUserAnswersService.execute({
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

export { GetUserAnswersController };
