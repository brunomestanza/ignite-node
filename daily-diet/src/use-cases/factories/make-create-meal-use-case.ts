import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateMealUseCase } from '../create-meal'
import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'

export function makeCreateMealUseCase() {
  const mealsRepository = new PrismaMealsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateMealUseCase(mealsRepository, usersRepository)

  return useCase
}
