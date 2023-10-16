import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { FindQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/find-question-by-slug'
import { QuestionPresenter } from '../presenters/question-presenter'

@Controller('/questions/:slug')
export class FindQuestionBySlugController {
  constructor(private useCase: FindQuestionBySlugUseCase) {}
  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.useCase.execute({
      slug,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { question: QuestionPresenter.toHttp(result.value.question) }
  }
}
