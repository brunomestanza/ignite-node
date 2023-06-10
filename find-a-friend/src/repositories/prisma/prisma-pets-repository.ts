import { Prisma, Pet } from '@prisma/client'
import { FindManyParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
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
    const pets = await prisma.pet.findMany({
      where: {
        name,
        age,
        size,
        energy_level,
        space,
        independency_level,
        type,
        Org: {
          address: { contains: city },
        },
      },
    })

    return pets
  }

  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}
