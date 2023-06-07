import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeGetMealByUserId } from '@/use-cases/factories/make-get-meal-by-user-id'

export async function findManyMeals(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const findManyMealsUseCase = makeGetMealByUserId()
    const meals = await findManyMealsUseCase.execute({
      id: request.user.sub,
    })

    return reply.status(200).send(meals)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
