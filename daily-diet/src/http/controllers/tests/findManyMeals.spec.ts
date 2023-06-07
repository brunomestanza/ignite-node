import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Find many meals (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find meals', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const { token } = authResponse.body

    const user = await prisma.user.findFirstOrThrow()

    await prisma.meal.create({
      data: {
        is_in_diet: false,
        name: 'Meal 1',
        created_at: new Date(),
        description: '',
        user_id: user.id,
      },
    })

    await prisma.meal.create({
      data: {
        is_in_diet: false,
        name: 'Meal 2',
        created_at: new Date(),
        description: '',
        user_id: user.id,
      },
    })

    const mealsResponse = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)
      .send()

    const { meals } = mealsResponse.body

    expect(mealsResponse.statusCode).toEqual(200)
    expect(meals).toHaveLength(2)
  })
})
