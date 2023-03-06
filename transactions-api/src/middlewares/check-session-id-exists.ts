import { FastifyRequest, FastifyReply } from 'fastify'

export async function checkSessioIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionId = request.cookies.sessionId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized, please provide a cookie!',
    })
  }
}
