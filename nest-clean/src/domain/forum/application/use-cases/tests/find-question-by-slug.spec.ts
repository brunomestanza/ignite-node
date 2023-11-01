import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { FindQuestionBySlugUseCase } from '../find-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'
import { makeAttachment } from 'test/factories/make-attachment'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionRepository: InMemoryQuestionsRepository
let sut: FindQuestionBySlugUseCase

describe('Find Question By Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository,
    )
    sut = new FindQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const student = makeStudent({ name: 'John Doe' })

    inMemoryStudentsRepository.items.push(student)

    const newQuestion = makeQuestion({
      authorId: student.id,
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const attachment = makeAttachment({ title: 'Some attachment' })

    inMemoryAttachmentsRepository.items.push(attachment)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        attachmentId: attachment.id,
        questionId: newQuestion.id,
      }),
    )

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        authorName: 'John Doe',
        attachments: [
          expect.objectContaining({
            title: 'Some attachment',
          }),
        ],
      }),
    })
  })
})
