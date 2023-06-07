import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotExists } from './errors/resource-not-exists'

interface GetMealsByUserIdUseCaseRequest {
  id: string
}

interface GetMealsByUserIdUseCaseResponse {
  meals: Meal[]
}

export class GetMealsByUserIdUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
  }: GetMealsByUserIdUseCaseRequest): Promise<GetMealsByUserIdUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotExists()
    }

    const meals = await this.mealsRepository.findManyByUserId(id)

    return { meals }
  }
}
