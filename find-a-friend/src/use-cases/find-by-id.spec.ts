import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FindByIdUseCase } from './find-by-id'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: FindByIdUseCase

describe('Find By Id Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new FindByIdUseCase(petsRepository)
  })

  it('should be able to find a pet with a id', async () => {
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

    const { pet } = await sut.execute({
      id: 'fake-pet-1',
    })

    expect(pet!.id).toEqual(expect.any(String))
  })

  it('should not be able to to find a pet without a id', async () => {
    await expect(() =>
      sut.execute({
        id: 'fake-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
