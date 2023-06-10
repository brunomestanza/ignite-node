import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindManyByCityUseCase } from '../find-many-by-city'

export function makeFindManyByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindManyByCityUseCase(petsRepository)

  return useCase
}
