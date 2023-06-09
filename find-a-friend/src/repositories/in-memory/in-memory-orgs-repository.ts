import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name ?? null,
      ownerName: data.ownerName,
      email: data.email,
      cep: data.cep,
      address: data.address,
      phone: data.phone,
      password_hash: data.password_hash,
    }

    this.items.push(org)

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.items.find((org) => org.email === email)

    if (!org) {
      return null
    }

    return org
  }
}
