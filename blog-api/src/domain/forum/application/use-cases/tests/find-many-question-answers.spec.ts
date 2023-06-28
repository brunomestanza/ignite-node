import { InMemoryAnswersRepository } from 'tests/repositories/in-memory-answers-repository'
import { FindManyQuestionAnswersUseCase } from '../find-many-question-answers'
import { makeAnswer } from 'tests/factories/make-answer'
import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FindManyQuestionAnswersUseCase

describe('Find Many Question Answers Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FindManyQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to find question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionId: new UniqueEntityID('question-1') }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to find paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: new UniqueEntityID('question-1') }),
      )
    }

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})
