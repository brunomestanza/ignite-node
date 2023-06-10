import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { findManyByCity } from './find-many-by-city'
import { findById } from './find-by-id'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.post('/pets', create)
  app.get('/pets', findManyByCity)
  app.get('/pets/:id', findById)
}
