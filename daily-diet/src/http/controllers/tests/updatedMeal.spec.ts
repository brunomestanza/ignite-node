import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Update meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update a meal', async () => {
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

    const meal = await prisma.meal.create({
      data: {
        created_at: new Date(),
        description: 'A description',
        is_in_diet: true,
        name: 'Yakissoba',
        user_id: user.id,
      },
    })

    const mealResponse = await request(app.server)
      .patch(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        date: new Date(),
        description: 'A description',
        isInDiet: 'true',
        name: 'Yakissoba',
      })

    expect(mealResponse.statusCode).toEqual(201)
  })
})
