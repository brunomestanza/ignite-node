import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Fofura',
        about: 'Fofura é um cachorro carinhoso e dócil',
        age: 'Filhote',
        size: 'Pequenino',
        energyLevel: 'Alta',
        space: 'Medio',
        independencyLevel: 'Alto',
        type: 'Cachorro',
        orgId: 'fake-id',
        adoptionRequirements: ['Não pode apartamento'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
