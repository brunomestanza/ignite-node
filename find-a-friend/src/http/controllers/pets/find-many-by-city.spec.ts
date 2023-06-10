import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Find Many By City (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await prisma.pet.create({
      data: {
        name: 'Fofura',
        about: 'Fofura é um cachorro carinhoso e dócil',
        age: 'Filhote',
        size: 'Pequenino',
        energy_level: 'Alta',
        space: 'Medio',
        independency_level: 'Alto',
        type: 'Cachorro',
        orgId: 'fake-id',
        adoptionRequirements: ['Não pode apartamento'],
      },
    })

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'Formiga' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)
  })
})
