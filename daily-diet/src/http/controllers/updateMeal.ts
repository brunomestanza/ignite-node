import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeEditMealUseCase } from '@/use-cases/factories/make-edit-meal-use-case'

export async function updateMeal(request: FastifyRequest, reply: FastifyReply) {
  const updateMealParamsSchema = z.object({
    mealId: z.string().uuid(),
  })

  const updateMealBodySchema = z.object({
    date: z.string(),
    description: z.string().nullable(),
    isInDiet: z.coerce.boolean(),
    name: z.string(),
  })

  const { date, description, isInDiet, name } = updateMealBodySchema.parse(
    request.body,
  )
  const { mealId } = updateMealParamsSchema.parse(request.params)

  const formattedDate = new Date(date)

  try {
    const updateMealUseCase = makeEditMealUseCase()
    await updateMealUseCase.execute({
      date: formattedDate,
      description,
      isInDiet,
      name,
      userId: request.user.sub,
      mealId,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
