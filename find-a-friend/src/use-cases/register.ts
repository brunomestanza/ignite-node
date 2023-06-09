import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { Org } from '@prisma/client'
import { OrgsRepository } from '@/repositories/orgs-repository'

interface RegisterUseCaseRequest {
  name?: string
  ownerName: string
  email: string
  cep: string
  address: string
  phone: string
  password: string
}

interface RegisterUseCaseResponse {
  user: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    name,
    ownerName,
    email,
    cep,
    address,
    phone,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.orgsRepository.create({
      name: name ?? null,
      ownerName,
      email,
      cep,
      address,
      phone,
      password_hash,
    })

    return { user }
  }
}
