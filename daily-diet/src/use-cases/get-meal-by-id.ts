import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotExists } from './errors/resource-not-exists'

interface GetMealByIdUseCaseRequest {
  id: string
  userId: string
}

interface GetMealByIdUseCaseResponse {
  meal: Meal | null
}

export class GetMealByIdUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    userId,
  }: GetMealByIdUseCaseRequest): Promise<GetMealByIdUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotExists()
    }

    const meal = await this.mealsRepository.findById(id, userId)

    return { meal }
  }
}
