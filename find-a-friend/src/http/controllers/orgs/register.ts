import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().nullable(),
    ownerName: z.string(),
    email: z.string().email(),
    cep: z.string(),
    address: z.string(),
    phone: z.string(),
    password: z.string().min(6),
  })

  const { name, ownerName, email, cep, address, phone, password } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      ownerName,
      email,
      cep,
      address,
      phone,
      password,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
