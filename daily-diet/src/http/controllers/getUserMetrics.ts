import { FastifyReply, FastifyRequest } from 'fastify'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeGetUserMetrics } from '@/use-cases/factories/make-get-user-metrics'

export async function getUserMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getUserMetricsUseCase = makeGetUserMetrics()

    const metrics = await getUserMetricsUseCase.execute({
      id: request.user.sub,
    })
    return reply.status(200).send(metrics)
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}
