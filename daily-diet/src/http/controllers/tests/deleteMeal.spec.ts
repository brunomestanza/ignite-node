import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Delete meal (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a meal', async () => {
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
        name: 'Yakissoba',
        created_at: new Date(),
        description: '',
        user_id: user.id,
      },
    })

    const meal = await prisma.meal.findFirstOrThrow()

    const mealResponse = await request(app.server)
      .delete(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    const meals = await prisma.meal.findMany()

    expect(mealResponse.statusCode).toEqual(200)
    expect(meals).toHaveLength(0)
  })
})
