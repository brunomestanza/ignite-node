import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['Filhote', 'Jovem', 'Adulto']),
    size: z.enum(['Pequenino', 'Medio', 'Grande']),
    energyLevel: z.enum([
      'Alta',
      'Muito_baixa',
      'Baixa',
      'Media',
      'Muito_alta',
    ]),
    space: z.enum(['Medio', 'Amplo', 'Pequeno']),
    independencyLevel: z.enum(['Medio', 'Alto', 'Baixo']),
    type: z.enum(['Cachorro', 'Gato', 'Peixe']),
    orgId: z.string(),
    adoptionRequirements: z.string(),
  })

  const {
    name,
    about,
    age,
    size,
    energyLevel,
    space,
    independencyLevel,
    type,
    orgId,
    adoptionRequirements,
  } = registerBodySchema.parse(request.body)

  try {
    const createPetUseCase = makeCreatePetUseCase()

    await createPetUseCase.execute({
      name,
      about,
      age,
      size,
      energy_level: energyLevel,
      space,
      independency_level: independencyLevel,
      type,
      orgId,
      adoptionRequirements,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
