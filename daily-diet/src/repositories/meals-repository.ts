import { Meal, Prisma } from '@prisma/client'

export interface UserMetricsResponse {
  mealsCount: number
  inDietMealsCount: number
  outDietMealsCount: number
  bestInDietMealsScore: number
}

export interface MealsRepository {
  create(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  save(data: Prisma.MealUncheckedCreateInput): Promise<Meal>
  delete(id: string): Promise<Meal | null>
  findManyByUserId(id: string): Promise<Meal[]>
  getUserMetrics(id: string): Promise<UserMetricsResponse>
}
