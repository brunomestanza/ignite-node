import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetMealsByUserIdUseCase } from '../get-meals-by-user-id'

export function makeGetMealByUserId() {
  const mealsRepository = new PrismaMealsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetMealsByUserIdUseCase(mealsRepository, usersRepository)

  return useCase
}
