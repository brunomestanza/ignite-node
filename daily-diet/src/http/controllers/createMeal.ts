import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeCreateMealUseCase } from '@/use-cases/factories/make-create-meal-use-case'

export async function createMeal(request: FastifyRequest, reply: FastifyReply) {
  const createMealBodySchema = z.object({
    date: z.string(),
    description: z.string().nullable(),
    isInDiet: z.coerce.boolean(),
    name: z.string(),
  })

  const { date, description, isInDiet, name } = createMealBodySchema.parse(
    request.body,
  )

  const formattedDate = new Date(date)

  try {
    const createMealUseCase = makeCreateMealUseCase()
    await createMealUseCase.execute({
      date: formattedDate,
      description,
      isInDiet,
      name,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
