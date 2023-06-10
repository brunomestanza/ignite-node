import { Pet } from '@prisma/client'
import { FindManyParams, PetsRepository } from '@/repositories/pets-repository'

interface FindManyByCityUseCaseResponse {
  pets: Pet[]
}

export class FindManyByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    name,
    age,
    size,
    energy_level,
    space,
    independency_level,
    type,
  }: FindManyParams): Promise<FindManyByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity({
      city,
      name,
      age,
      size,
      energy_level,
      space,
      independency_level,
      type,
    })

    return { pets }
  }
}
