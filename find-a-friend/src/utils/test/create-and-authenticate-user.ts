import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      id: 'fake-id',
      name: 'Fake ORG name',
      ownerName: 'John Doe',
      email: 'john.doe@mail.com',
      cep: '12345-678',
      address:
        'Rua Maria Amália de Faria, 18,Centro, Formiga, Minas Gerais - Brasil',
      phone: '+55 (12) 91234-5678',
      password_hash: await hash('123456', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'john.doe@mail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
