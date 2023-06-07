import { PrismaMealsRepository } from '@/repositories/prisma/prisma-meals-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics'

export function makeGetUserMetrics() {
  const mealsRepository = new PrismaMealsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new GetUserMetricsUseCase(mealsRepository, usersRepository)

  return useCase
}
