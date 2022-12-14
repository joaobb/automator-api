import { automataRepository } from "../repositories/automataRepository";
import { Automata } from "../entities/Automata";
import { Privacy } from "../enums/Privacy";

interface AutomataRequest {
  isAdmin: boolean;
  userId: number;
  pageSize?: number;
  offset?: number;
}

interface AutomataResponse {
  automatas: Automata[];
  count: number;
}

class GetAutomatasService {
  async execute({
    isAdmin,
    userId,
    pageSize,
    offset,
  }: AutomataRequest): Promise<AutomataResponse> {
    const whereClause = !isAdmin
      ? [{ privacy: Privacy.public }, { author: { id: userId } }]
      : undefined;

    const [automatas, count] = await automataRepository.findAndCount({
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        description: true,
        privacy: true,
      },
      where: whereClause,
      take: pageSize,
      skip: offset,
    });

    return { automatas, count };
  }
}

export { GetAutomatasService };
