import {
  MealsRepository,
  UserMetricsResponse,
} from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotExists } from './errors/resource-not-exists'

interface GetUserMetricsUseCaseRequest {
  id: string
}

interface GetUserMetricsUseCaseResponse {
  metrics: UserMetricsResponse
}

export class GetUserMetricsUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotExists()
    }

    const metrics = await this.mealsRepository.getUserMetrics(id)

    return { metrics }
  }
}
