import { FastifyInstance } from 'fastify'
import { profile } from './controllers/profile'
import { verifyJWT } from './middlewares/verify-jwt'
import { createMeal } from './controllers/createMeal'
import { updateMeal } from './controllers/updateMeal'
import { deleteMeal } from './controllers/deleteMeal'
import { findManyMeals } from './controllers/findManyMeals'
import { getUserMetrics } from './controllers/getUserMetrics'

export async function authenticatedOnlyRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
  app.get('/meals', { onRequest: [verifyJWT] }, findManyMeals)
  app.get('/meals/:userId', { onRequest: [verifyJWT] }, findManyMeals)
  app.get('/metrics', { onRequest: [verifyJWT] }, getUserMetrics)
  app.post('/meals', { onRequest: [verifyJWT] }, createMeal)
  app.patch('/meals/:mealId', { onRequest: [verifyJWT] }, updateMeal)
  app.delete('/meals/:mealId', { onRequest: [verifyJWT] }, deleteMeal)
}
