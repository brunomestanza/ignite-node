import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindByIdUseCase } from '@/use-cases/factories/make-find-by-id'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const findManyByCityParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findManyByCityParamsSchema.parse(request.params)

  try {
    const findByIdUseCase = makeFindByIdUseCase()

    await findByIdUseCase.execute({
      id,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
