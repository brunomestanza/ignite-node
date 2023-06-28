import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FindManyAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FindManyAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FindManyAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FindManyAnswerCommentsUseCaseRequest): Promise<FindManyAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentsRepository.findManyByAnswerId(answerId, {
        page,
      })

    return { answerComments }
  }
}
