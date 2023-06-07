export class ResourceNotExists extends Error {
  constructor() {
    super('Resource not exists.')
  }
}
