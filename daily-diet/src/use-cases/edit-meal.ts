import { Meal } from '@prisma/client'
import { MealsRepository } from '@/repositories/meals-repository'
import { ResourceNotExists } from './errors/resource-not-exists'

interface EditMealUseCaseRequest {
  mealId: string
  name: string | null
  description: string | null
  date: Date | null
  isInDiet: boolean | null
  userId: string
}

interface EditMealUseCaseResponse {
  meal: Meal
}

export class EditMealUseCase {
  constructor(private mealsRepository: MealsRepository) {}

  async execute({
    mealId,
    name,
    description,
    date,
    isInDiet,
    userId,
  }: EditMealUseCaseRequest): Promise<EditMealUseCaseResponse> {
    const mealToUpdate = await this.mealsRepository.findById(mealId)

    if (!mealToUpdate) {
      throw new ResourceNotExists()
    }

    const newMeal = {
      id: mealId,
      user_id: mealToUpdate.user_id,
      is_in_diet: isInDiet ?? mealToUpdate.is_in_diet,
      name: name ?? mealToUpdate.name,
      created_at: date ?? mealToUpdate.created_at,
      description: description ?? mealToUpdate.description,
    }

    const meal = await this.mealsRepository.save(newMeal)

    return { meal }
  }
}
