import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FindByIdUseCaseRequest {
  id: string
}

interface FindByIdUseCaseResponse {
  pet: Pet | null
}

export class FindByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: FindByIdUseCaseRequest): Promise<FindByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return { pet }
  }
}
