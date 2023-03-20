import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let searchGymsUseCase: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      name: 'Test Gym 1',
      description: 'Some description',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await gymsRepository.create({
      name: 'Test Gym 2',
      description: 'Some description',
      phone: null,
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await searchGymsUseCase.execute({
      query: '1',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Test Gym 1' })])
  })

  it('should be able to fetch paginated gym search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Test Gym ${i}`,
        description: 'Some description',
        phone: null,
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Test',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Test Gym 21' }),
      expect.objectContaining({ name: 'Test Gym 22' }),
    ])
  })
})
