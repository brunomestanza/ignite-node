import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async create(data: Prisma.PetCreateInput): Promise<Pet> {
    const org: Pet = {
      id: data.id ?? randomUUID(),
      name: data.name ?? null,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      space: data.space,
      independency_level: data.independency_level,
      type: data.type,
      orgId: data.orgId,
      adoptionRequirements: data.adoptionRequirements,
    }

    this.items.push(org)

    return org
  }
}
