import { describe, it, expect, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotExists } from '../errors/resource-not-exists'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { GetMealByIdUseCase } from '../get-meal-by-id'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: GetMealByIdUseCase

describe('Get Meal By Id Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealByIdUseCase(mealsRepository, usersRepository)
  })

  it('should be able to get user meal', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password_hash: await hash('123456', 6),
      id: 'user-01',
    })

    await mealsRepository.create({
      is_in_diet: false,
      name: 'Yakissoba',
      user_id: 'user-01',
      created_at: new Date(),
      description: '',
      id: 'meal-01',
    })

    const { meal } = await sut.execute({
      userId: 'user-01',
      id: 'meal-01',
    })

    expect(meal!.id).toEqual('meal-01')
    expect(meal!.name).toEqual('Yakissoba')
  })

  it('should not be able to get user profile with invalid user id', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password_hash: await hash('123456', 6),
      id: 'user-01',
    })

    await mealsRepository.create({
      is_in_diet: false,
      name: 'Yakissoba',
      user_id: 'user-01',
      created_at: new Date(),
      description: '',
      id: 'meal-01',
    })

    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
        id: 'meal-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotExists)
  })

  it('should not be able to get user profile with invalid id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotExists)
  })
})
