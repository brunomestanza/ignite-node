import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CreateMealUseCase } from '../create-meal'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ResourceNotExists } from '../errors/resource-not-exists'

let mealsRepository: InMemoryMealsRepository
let usersRepository: InMemoryUsersRepository
let sut: CreateMealUseCase

describe('Create Meal Use Case', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date(2000, 0, 17, 8, 0, 0))
    mealsRepository = new InMemoryMealsRepository()
    usersRepository = new InMemoryUsersRepository()
    sut = new CreateMealUseCase(mealsRepository, usersRepository)
  })

  it('should be able to create a meal', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password_hash: await hash('123456', 6),
    })

    const { meal } = await sut.execute({
      name: 'Yakissoba',
      isInDiet: false,
      userId: user.id,
      description: 'Its a new meal',
      date: new Date(),
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.name).toEqual('Yakissoba')
    expect(meal.description).toEqual('Its a new meal')
    expect(meal.is_in_diet).toBeFalsy()
    expect(meal.user_id).toEqual(user.id)
    expect(meal.created_at).toEqual(new Date(2000, 0, 17, 8, 0, 0))
  })

  it('should not be able to create a meal with invalid userId', async () => {
    await expect(() =>
      sut.execute({
        name: 'Yakissoba',
        isInDiet: false,
        userId: 'invalid-user-id',
        description: 'Its a new meal',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotExists)
  })

  it('should be able to create a meal without a description', async () => {
    await expect(() =>
      sut.execute({
        name: 'Yakissoba',
        isInDiet: false,
        userId: 'invalid-user-id',
        date: new Date(),
        description: null,
      }),
    ).rejects.toBeInstanceOf(ResourceNotExists)
  })
})
