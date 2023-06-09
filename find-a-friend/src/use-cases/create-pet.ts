import {
  Age,
  Size,
  EnergyLevel,
  Space,
  IdependencyLevel,
  Type,
  Pet,
} from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreatePetUseCaseRequest {
  name: string
  about: string
  age: Age
  size: Size
  energy_level: EnergyLevel
  space: Space
  independency_level: IdependencyLevel
  type: Type
  orgId: string
  adoptionRequirements: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    space,
    independency_level,
    type,
    orgId,
    adoptionRequirements,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      space,
      independency_level,
      type,
      orgId,
      adoptionRequirements,
    })

    return { pet }
  }
}
