import { describe, it, expect, beforeEach, vi } from 'vitest'
import { InMemoryMealsRepository } from '@/repositories/in-memory/in-memory-meals-repository'
import { EditMealUseCase } from '../edit-meal'
import { ResourceNotExists } from '../errors/resource-not-exists'

let mealsRepository: InMemoryMealsRepository
let sut: EditMealUseCase

describe('Edit Meal Use Case', () => {
  beforeEach(() => {
    vi.setSystemTime(new Date(2000, 0, 17, 8, 0, 0))
    mealsRepository = new InMemoryMealsRepository()
    sut = new EditMealUseCase(mealsRepository)
  })

  it('should be able to edit a meal', async () => {
    const { id } = await mealsRepository.create({
      user_id: 'user-01',
      is_in_diet: false,
      name: 'Yakissoba',
      created_at: new Date(),
    })

    const { meal } = await sut.execute({
      mealId: id,
      name: 'Yakissoba',
      isInDiet: false,
      description: 'Its a new meal',
      date: new Date(),
      userId: 'user-01',
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.name).toEqual('Yakissoba')
    expect(meal.description).toEqual('Its a new meal')
    expect(meal.is_in_diet).toBeFalsy()
    expect(meal.user_id).toEqual(meal.user_id)
    expect(meal.created_at).toEqual(new Date(2000, 0, 17, 8, 0, 0))
  })

  it('should be able to edit a meal with null values', async () => {
    const { id } = await mealsRepository.create({
      user_id: 'user-01',
      is_in_diet: false,
      name: 'Yakissoba',
      created_at: new Date(),
      description: 'Its a new meal',
    })

    const { meal } = await sut.execute({
      mealId: id,
      name: null,
      isInDiet: null,
      description: null,
      date: null,
      userId: 'user-01',
    })

    expect(meal.id).toEqual(expect.any(String))
    expect(meal.name).toEqual('Yakissoba')
    expect(meal.description).toEqual('Its a new meal')
    expect(meal.is_in_diet).toBeFalsy()
    expect(meal.user_id).toEqual(meal.user_id)
    expect(meal.created_at).toEqual(new Date(2000, 0, 17, 8, 0, 0))
  })

  it('should not be able to edit a meal with invalid meal id', async () => {
    await expect(() =>
      sut.execute({
        mealId: 'invalid-id',
        name: 'Yakissoba',
        isInDiet: false,
        description: 'Its a new meal',
        date: new Date(),
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotExists)
  })
})
