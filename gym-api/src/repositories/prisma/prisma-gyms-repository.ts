import { Prisma, Gym } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: { name: { contains: query } },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
