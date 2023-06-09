import { RegisterUseCase } from '../register'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterUseCase(prismaOrgsRepository)

  return useCase
}
