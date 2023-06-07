import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotExists } from '../errors/resource-not-exists'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { randomUUID } from 'crypto'
import { GetUserMetricsUseCase } from '../get-user-metrics'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetUserMetricsUseCase(mealsRepository, usersRepository)
  })

  it('should be able to get user metrics', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password_hash: await hash('123456', 6),
    })

    const mealId = randomUUID()

    mealsRepository.create({
      is_in_diet: true,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(1998, 0, 17, 8, 0, 0),
      description: '',
      id: mealId,
    })

    mealsRepository.create({
      is_in_diet: true,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(2000, 0, 17, 8, 0, 0),
      description: '',
      id: mealId,
    })

    mealsRepository.create({
      is_in_diet: true,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(1999, 0, 17, 8, 0, 0),
      description: '',
      id: mealId,
    })

    const { metrics } = await sut.execute({
      id: createdUser.id,
    })

    const {
      bestInDietMealsScore,
      inDietMealsCount,
      mealsCount,
      outDietMealsCount,
    } = metrics

    expect(bestInDietMealsScore).toBe(3)
    expect(inDietMealsCount).toBe(3)
    expect(mealsCount).toBe(3)
    expect(outDietMealsCount).toBe(0)
  })

  it('should be able to break user score', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password_hash: await hash('123456', 6),
    })

    const mealId = randomUUID()

    mealsRepository.create({
      is_in_diet: true,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(1998, 0, 17, 8, 0, 0),
      description: '',
      id: mealId,
    })

    mealsRepository.create({
      is_in_diet: false,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(1999, 0, 17, 8, 0, 0),
      description: '',
      id: mealId,
    })

    mealsRepository.create({
      is_in_diet: true,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(2000, 0, 17, 8, 0, 0),
      description: '',
      id: mealId,
    })

    const { metrics } = await sut.execute({
      id: createdUser.id,
    })

    const {
      bestInDietMealsScore,
      inDietMealsCount,
      mealsCount,
      outDietMealsCount,
    } = metrics

    expect(bestInDietMealsScore).toBe(1)
    expect(inDietMealsCount).toBe(2)
    expect(mealsCount).toBe(3)
    expect(outDietMealsCount).toBe(1)
  })

  it('should not be able to get user metrics with invalid id', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotExists)
  })
})
