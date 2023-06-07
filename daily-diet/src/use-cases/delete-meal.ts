import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotExists } from './errors/resource-not-exists'

interface DeleteMealUseCaseRequest {
  id: string
}

interface DeleteMealUseCaseResponse {
  meal: Meal | null
}

export class DeleteMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    id,
  }: DeleteMealUseCaseRequest): Promise<DeleteMealUseCaseResponse> {
    const mealToDelete = await this.mealsRepository.delete(id)

    if (!mealToDelete) {
      throw new ResourceNotExists()
    }

    return { meal: mealToDelete }
  }
}
