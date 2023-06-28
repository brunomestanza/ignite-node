import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FindManyQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FindManyQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FindManyQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionId,
    page,
  }: FindManyQuestionAnswersUseCaseRequest): Promise<FindManyQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return { answers }
  }
}
