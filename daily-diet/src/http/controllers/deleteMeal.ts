import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeDeleteMealUseCase } from '@/use-cases/factories/make-delete-meal-use-case'

export async function deleteMeal(request: FastifyRequest, reply: FastifyReply) {
  const deleteMealParamsSchema = z.object({
    mealId: z.string().uuid(),
  })

  const { mealId } = deleteMealParamsSchema.parse(request.params)

  try {
    const deleteMealUseCase = makeDeleteMealUseCase()
    await deleteMealUseCase.execute({
      id: mealId,
    })

    return reply.status(200).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
