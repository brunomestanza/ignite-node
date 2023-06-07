import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotExists } from '../errors/resource-not-exists'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetMealsByUserIdUseCase } from '../get-meals-by-user-id'
import { randomUUID } from 'crypto'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: GetMealsByUserIdUseCase

describe('Get Meals Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealsByUserIdUseCase(mealsRepository, usersRepository)
  })

  it('should be able to get user meals', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password_hash: await hash('123456', 6),
    })

    const mealId = randomUUID()

    mealsRepository.create({
      is_in_diet: false,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(2000, 0, 17, 8, 0, 0),
      description: '',
      id: mealId,
    })

    const { meals } = await sut.execute({
      id: createdUser.id,
    })

    expect(meals).toHaveLength(1)
    expect(meals[0].id).toEqual(mealId)
    expect(meals[0].is_in_diet).toBeFalsy()
    expect(meals[0].name).toBe('Yakissoba')
    expect(meals[0].created_at).toEqual(new Date(2000, 0, 17, 8, 0, 0))
    expect(meals[0].description).toBeFalsy()
  })

  it('should be able to get more than one meal', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password_hash: await hash('123456', 6),
    })

    mealsRepository.create({
      is_in_diet: false,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(2000, 0, 17, 8, 0, 0),
      description: '',
    })

    mealsRepository.create({
      is_in_diet: false,
      name: 'Yakissoba',
      user_id: createdUser.id,
      created_at: new Date(2000, 0, 17, 8, 0, 0),
      description: '',
    })

    const { meals } = await sut.execute({
      id: createdUser.id,
    })

    expect(meals).toHaveLength(2)
  })

  it('should not be able to get user profile with invalid id', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotExists)
  })
})
