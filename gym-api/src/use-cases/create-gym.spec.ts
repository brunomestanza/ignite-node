import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let createGymsUseCase: CreateGymUseCase

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    createGymsUseCase = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await createGymsUseCase.execute({
      name: 'Test Gym',
      description: 'Some gym description',
      phone: 'Some phone number',
      latitude: -27.2092052,
      longitude: -27.2092052,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
