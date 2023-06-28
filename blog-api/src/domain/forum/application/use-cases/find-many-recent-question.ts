import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FindManyRecentQuestionsUseCaseRequest {
  page: number
}

interface FindManyRecentQuestionsUseCaseResponse {
  questions: Question[]
}

export class FindManyRecentQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FindManyRecentQuestionsUseCaseRequest): Promise<FindManyRecentQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({ page })

    return { questions }
  }
}
