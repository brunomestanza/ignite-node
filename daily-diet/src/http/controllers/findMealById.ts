import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetMealById } from '@/use-cases/factories/make-get-meal-by-id'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function findMealById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findMealByIdParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = findMealByIdParamsSchema.parse(request.params)

  try {
    const findMealByIdUseCase = makeGetMealById()

    const meal = await findMealByIdUseCase.execute({
      id,
      userId: request.user.sub,
    })
    return reply.status(200).send(meal)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
