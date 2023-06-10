import {
  Age,
  EnergyLevel,
  IdependencyLevel,
  Pet,
  Prisma,
  Size,
  Space,
  Type,
} from '@prisma/client'

export interface FindManyParams {
  city: string
  name?: string
  age?: Age
  size?: Size
  energy_level?: EnergyLevel
  space?: Space
  independency_level?: IdependencyLevel
  type?: Type
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyByCity({
    city,
    name,
    age,
    size,
    energy_level,
    space,
    independency_level,
    type,
  }: FindManyParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
