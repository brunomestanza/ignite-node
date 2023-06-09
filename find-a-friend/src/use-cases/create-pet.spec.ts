import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { CreatePetUseCase } from './create-pet'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreatePetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to create a pet', async () => {
    await orgsRepository.create({
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

    const { pet } = await sut.execute({
      name: 'Fofura',
      about: 'Fofura é um cachorro carinhoso e dócil',
      age: 'Filhote',
      size: 'Pequenino',
      energy_level: 'Alta',
      space: 'Medio',
      independency_level: 'Alto',
      type: 'Cachorro',
      orgId: 'fake-org-1',
      adoptionRequirements: '["Não pode apartamento"]',
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not create pet with invalid org', async () => {
    await expect(() =>
      sut.execute({
        name: 'Fofura',
        about: 'Fofura é um cachorro carinhoso e dócil',
        age: 'Filhote',
        size: 'Pequenino',
        energy_level: 'Alta',
        space: 'Medio',
        independency_level: 'Alto',
        type: 'Cachorro',
        orgId: 'fake-org-1',
        adoptionRequirements: '["Não pode apartamento"]',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
