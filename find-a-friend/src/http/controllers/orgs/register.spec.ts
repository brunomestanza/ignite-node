import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      name: 'Fake ORG name',
      ownerName: 'John Doe',
      email: 'john.doe@mail.com',
      cep: '12345-678',
      address:
        'Rua Maria Amália de Faria, 18,Centro, Formiga, Minas Gerais - Brasil',
      phone: '+55 (12) 91234-5678',
      password: '123456',
    })

    expect(response.statusCode).toEqual(201)
  })
})
