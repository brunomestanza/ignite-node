import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindByIdUseCase } from '../find-by-id'

export function makeFindByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindByIdUseCase(petsRepository)

  return useCase
}
