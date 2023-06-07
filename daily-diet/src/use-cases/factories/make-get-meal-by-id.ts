import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { GetMealByIdUseCase } from '../get-meal-by-id'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeGetMealById() {
  const mealsRepository = new PrismaMealsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetMealByIdUseCase(mealsRepository, usersRepository)

  return useCase
}
