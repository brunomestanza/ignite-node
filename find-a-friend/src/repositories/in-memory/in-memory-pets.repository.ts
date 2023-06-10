import { Prisma, Pet } from '@prisma/client'
import { FindManyParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

type PetWithOrg = Prisma.PetGetPayload<{ include: { Org: true } }>

export class InMemoryPetsRepository implements PetsRepository {
  public items: PetWithOrg[] = []

  async create(data: PetWithOrg): Promise<Pet> {
    const org = {
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
      Org: data.Org,
    } as PetWithOrg

    this.items.push(org)

    return org
  }

  async findManyByCity({
    city,
    name,
    age,
    size,
    energy_level,
    space,
    independency_level,
    type,
  }: FindManyParams): Promise<Pet[]> {
    let pets = this.items.filter((org) => org.Org.address.includes(city))

    if (!pets) {
      return []
    }

    if (name) {
      pets = pets.filter((org) => org.name === name)
    }

    if (age) {
      pets = pets.filter((org) => org.age === age)
    }

    if (size) {
      pets = pets.filter((org) => org.size === size)
    }

    if (energy_level) {
      pets = pets.filter((org) => org.energy_level === energy_level)
    }

    if (space) {
      pets = pets.filter((org) => org.space === space)
    }

    if (independency_level) {
      pets = pets.filter((org) => org.independency_level === independency_level)
    }

    if (type) {
      pets = pets.filter((org) => org.type === type)
    }

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
