import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { UsersRepository } from '@/repositories/users-repository'
import { ResourceNotExists } from './errors/resource-not-exists'

interface CreateMealUseCaseRequest {
  userId: string
  isInDiet: boolean
  name: string
  description: string | null
  date: Date
}

interface CreateMealUseCaseResponse {
  meal: Meal
}

export class CreateMealUseCase {
  constructor(
    private mealsRepository: MealsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    isInDiet,
    name,
    description,
    date,
  }: CreateMealUseCaseRequest): Promise<CreateMealUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotExists()
    }

    const meal = await this.mealsRepository.create({
      user_id: userId,
      is_in_diet: isInDiet,
      name,
      description,
      created_at: date,
    })

    return { meal }
  }
}
