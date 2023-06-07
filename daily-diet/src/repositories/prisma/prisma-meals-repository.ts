import { Prisma, Meal } from '@prisma/client'
import { MealsRepository, UserMetricsResponse } from '../meals-repository'
import { prisma } from '@/lib/prisma'

export class PrismaMealsRepository implements MealsRepository {
  async create(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = await prisma.meal.create({
      data,
    })

    return meal
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.findUnique({
      where: {
        id,
      },
    })

    return meal
  }

  async save(data: Prisma.MealUncheckedCreateInput): Promise<Meal> {
    const meal = await prisma.meal.update({
      where: {
        id: data.id,
      },
      data,
    })

    return meal
  }

  async delete(id: string): Promise<Meal | null> {
    const meal = await prisma.meal.delete({
      where: {
        id,
      },
    })

    return meal
  }

  async findManyByUserId(id: string): Promise<Meal[]> {
    const meals = await prisma.meal.findMany({
      where: {
        user_id: id,
      },
    })

    return meals
  }

  // mealsCount: number
  // inDietMealsCount: number
  // outDietMealsCount: number
  // bestInDietMealsScore: number

  async getUserMetrics(id: string): Promise<UserMetricsResponse> {
    const mealsCount = await prisma.meal.count({
      where: {
        id,
      },
    })
    const inDietMealsCount = await prisma.meal.count({
      where: {
        id,
        is_in_diet: true,
      },
    })
    const outDietMealsCount = await prisma.meal.count({
      where: {
        id,
        is_in_diet: false,
      },
    })
    const mealsOrderedByDate = await prisma.meal.findMany({
      where: {
        id,
      },
      orderBy: {
        created_at: 'asc',
      },
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
      mealsCount,
      inDietMealsCount,
      outDietMealsCount,
      bestInDietMealsScore,
    }
  }
}
