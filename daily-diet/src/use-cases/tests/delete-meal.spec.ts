import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { ResourceNotExists } from '../errors/resource-not-exists'
import { DeleteMealUseCase } from '../delete-meal'

let mealsRepository: InMemoryMealsRepository
let sut: DeleteMealUseCase

describe('Delete Meal Use Case', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date(2000, 0, 17, 8, 0, 0))
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteMealUseCase(mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const { id } = await mealsRepository.create({
      user_id: 'user-01',
      is_in_diet: false,
      name: 'Yakissoba',
      created_at: new Date(),
    })

    const meals = await sut.execute({
      id,
    })

    expect(meals).toBeTruthy()
  })

  it('should delete only meal at once', async () => {
    const { id } = await mealsRepository.create({
      user_id: 'user-01',
      is_in_diet: false,
      name: 'Yakissoba 1',
      created_at: new Date(),
    })

    await mealsRepository.create({
      user_id: 'user-01',
      is_in_diet: false,
      name: 'Yakissoba 2',
      created_at: new Date(),
    })

    await sut.execute({
      id,
    })

    const meals = await mealsRepository.findManyByUserId('user-01')

    expect(meals).toHaveLength(1)
  })

  it('should not be able to delete a meal with invalid meal id', async () => {
    await expect(() =>
      sut.execute({
        id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotExists)
  })
})
