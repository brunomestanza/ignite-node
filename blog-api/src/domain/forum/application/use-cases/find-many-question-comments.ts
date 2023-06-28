import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FindManyQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FindManyQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FindManyQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FindManyQuestionCommentsUseCaseRequest): Promise<FindManyQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentsRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
