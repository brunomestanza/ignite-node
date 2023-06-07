import { Prisma, Meal } from '@prisma/client'
import { MealsRepository, UserMetricsResponse } from '../meals-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryMealsRepository implements MealsRepository {
  public items: Meal[] = []

  async findById(id: string) {
    const meal = this.items.find((meal) => meal.id === id)

    if (!meal) {
      return null
    }

    return meal
  }

  async getUserMetrics(id: string): Promise<UserMetricsResponse> {
    const userMeals = this.items.filter((item) => item.user_id === id)

    const mealsCount = userMeals.length
    const inDietMealsCount = userMeals.filter(
      (meal) => meal.is_in_diet === true,
    ).length
    const outDietMealsCount = userMeals.filter(
      (meal) => meal.is_in_diet === false,
    ).length
    const mealsOrderedByDate = userMeals.sort(function (a, b) {
      return +a.created_at - +b.created_at
    })

    let bestInDietMealsScore = 0
    let actualScore = 0
    mealsOrderedByDate.forEach((item) => {
      if (item.is_in_diet === true) {
        actualScore += 1
      } else {
        actualScore = 0
      }
      if (actualScore > bestInDietMealsScore) {
        bestInDietMealsScore = actualScore
      }
    })

    return {
      bestInDietMealsScore,
      inDietMealsCount,
      mealsCount,
      outDietMealsCount,
    }
  }

  async save(data: Meal): Promise<Meal> {
    const mealIndex = this.items.findIndex((item) => item.id === data.id)

    if (mealIndex >= 0) {
      this.items[mealIndex] = data
    }

    return data
  }

  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    let description = null
    if (data.description) {
      description = data.description
    }

    let createdAt = new Date()
    if (data.created_at) {
      createdAt = new Date(data.created_at)
    }

    const meal = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description,
      is_in_diet: data.is_in_diet,
      user_id: data.user_id,
      created_at: createdAt,
    }

    this.items.push(meal)

    return meal
  }

  async delete(id: string): Promise<Meal | null> {
    const meal = this.items.find((meal) => meal.id === id)

    if (!meal) {
      return null
    }

    const meals = this.items.filter((meal) => meal.id !== id)

    this.items = meals

    return meal
  }

  async findManyByUserId(id: string): Promise<Meal[]> {
    const meals = this.items.filter((meal) => meal.user_id === id)

    return meals
  }
}
