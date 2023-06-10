import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeFindManyByCityUseCase } from '@/use-cases/factories/make-find-many-by-city'

export async function findManyByCity(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findManyByCityQuerySchema = z.object({
    city: z.string(),
    name: z.string().optional(),
    age: z.enum(['Filhote', 'Jovem', 'Adulto']).optional(),
    size: z.enum(['Pequenino', 'Medio', 'Grande']).optional(),
    energyLevel: z
      .enum(['Alta', 'Muito_baixa', 'Baixa', 'Media', 'Muito_alta'])
      .optional(),
    space: z.enum(['Medio', 'Amplo', 'Pequeno']).optional(),
    independencyLevel: z.enum(['Medio', 'Alto', 'Baixo']).optional(),
    type: z.enum(['Cachorro', 'Gato', 'Peixe']).optional(),
  })

  const { city, name, age, size, energyLevel, space, independencyLevel, type } =
    findManyByCityQuerySchema.parse(request.query)

  try {
    const findManyByCityPetUseCase = makeFindManyByCityUseCase()

    await findManyByCityPetUseCase.execute({
      city,
      name,
      age,
      size,
      energy_level: energyLevel,
      space,
      independency_level: independencyLevel,
      type,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
