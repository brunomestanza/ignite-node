import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHttp(question: QuestionDetails) {
    return {
      questionId: question.questionId.toString(),
      authorId: question.authorId.toString(),
      authorName: question.authorName,
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      bestAnswerId: question.bestAnswerId?.toString(),
      attachments: question.attachments.map(AttachmentPresenter.toHttp),
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
