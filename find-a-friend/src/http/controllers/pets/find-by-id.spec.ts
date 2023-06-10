import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Find By Id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find using id', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await prisma.pet.create({
      data: {
        id: 'fake-pet-id',
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
      .get('/pets/fake-pet-id')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)
  })
})
