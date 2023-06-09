import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

let usersRepository: InMemoryOrgsRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryOrgsRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      id: 'fake-id-01',
      name: 'Fake ORG name',
      ownerName: 'John Doe',
      email: 'john.doe@mail.com',
      cep: '12345-678',
      address:
        'Rua Maria Amália de Faria, 18,Centro, Formiga, Minas Gerais - Brasil',
      phone: '+55 (12) 91234-5678',
      password_hash: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'john.doe@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    expect(() =>
      authenticateUseCase.execute({
        email: 'john.doe@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      id: 'fake-id-01',
      name: 'Fake ORG name',
      ownerName: 'John Doe',
      email: 'john.doe@mail.com',
      cep: '12345-678',
      address:
        'Rua Maria Amália de Faria, 18,Centro, Formiga, Minas Gerais - Brasil',
      phone: '+55 (12) 91234-5678',
      password_hash: await hash('123456', 6),
    })

    expect(() =>
      authenticateUseCase.execute({
        email: 'john.doe@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
