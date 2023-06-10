import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FindManyByCityUseCase } from './find-many-by-city'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FindManyByCityUseCase

describe('Find Many By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindManyByCityUseCase(petsRepository)
  })

  it('should be able to find a pet with a city', async () => {
    const org = await orgsRepository.create({
      id: 'fake-org-1',
      name: 'Fake ORG name',
      ownerName: 'John Doe',
      email: 'john.doe@mail.com',
      cep: '12345-678',
      address:
        'Rua Maria Amália de Faria, 18,Centro, Formiga, Minas Gerais - Brasil',
      phone: '+55 (12) 91234-5678',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      id: 'fake-pet-1',
      name: 'Fake ORG name',
      about: 'Um cachorro fake',
      age: 'Filhote',
      energy_level: 'Alta',
      independency_level: 'Alto',
      orgId: 'fake-org-1',
      size: 'Grande',
      space: 'Amplo',
      type: 'Cachorro',
      adoptionRequirements: ['Não pode apartamento'],
      Org: org,
    })

    const { pets } = await sut.execute({
      city: 'Formiga',
    })

    expect(pets[0].id).toEqual(expect.any(String))
  })

  it('should be able to to find a pet with a city and filter it', async () => {
    const org = await orgsRepository.create({
      id: 'fake-org-1',
      name: 'Fake ORG name',
      ownerName: 'John Doe',
      email: 'john.doe@mail.com',
      cep: '12345-678',
      address:
        'Rua Maria Amália de Faria, 18,Centro, Formiga, Minas Gerais - Brasil',
      phone: '+55 (12) 91234-5678',
      password_hash: await hash('123456', 6),
    })

    await petsRepository.create({
      id: 'fake-pet-1',
      name: 'Fake ORG name',
      about: 'Um cachorro fake',
      age: 'Filhote',
      energy_level: 'Alta',
      independency_level: 'Alto',
      orgId: 'fake-org-1',
      size: 'Grande',
      space: 'Amplo',
      type: 'Cachorro',
      adoptionRequirements: ['Não pode apartamento'],
      Org: org,
    })

    await petsRepository.create({
      id: 'fake-pet-1',
      name: 'Fake ORG name',
      about: 'Um cachorro fake',
      age: 'Filhote',
      energy_level: 'Alta',
      independency_level: 'Alto',
      orgId: 'fake-org-1',
      size: 'Grande',
      space: 'Amplo',
      type: 'Gato',
      adoptionRequirements: ['Não pode apartamento'],
      Org: org,
    })

    const { pets } = await sut.execute({
      city: 'Formiga',
      type: 'Gato',
    })

    expect(pets).toHaveLength(1)
  })

  it('should not be able to to find a pet without a city', async () => {
    expect(() =>
      sut.execute({
        city: 'Wonderlands',
      }),
    ).toHaveLength(0)
  })
})
