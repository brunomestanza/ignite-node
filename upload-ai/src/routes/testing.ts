import { FastifyInstance } from "fastify";
import { createReadStream } from 'node:fs'
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import { openai } from "../lib/openai"

export async function testingRoute(app: FastifyInstance) {
  app.post('/testing', async (req, reply) => {
    const bodySchema = z.object({
      template: z.string(), 
      temperature: z.number().min(0).max(1).default(0.5)
    })

    const { template, temperature } = bodySchema.parse(req.body)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      temperature,
      messages: [
        { role: 'user', content: template }
      ]
    })

    return response
  })
}