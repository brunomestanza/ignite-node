import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { FindManyRecentQuestionsController } from './controllers/find-many-recent-questions.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question'
import { FindManyRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/find-many-recent-question'
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/register-student'
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/authenticate-student'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { FindQuestionBySlugController } from './controllers/find-question-by-slug.controller'
import { FindQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/find-question-by-slug'
import { EditQuestionController } from './controllers/edit-question.controller'
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/edit-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/delete-answer'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-question-best-answer'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/delete-question-comment'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/delete-answer-comment'
import { FindManyQuestionAnswersController } from './controllers/find-many-question-answers.controller'
import { FindManyQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/find-many-question-answers'
import { FindManyQuestionCommentsController } from './controllers/find-many-question-comments.controller'
import { FindManyQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/find-many-question-comments'
import { FindManyAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/find-many-answer-comments'
import { FindManyAnswerCommentsController } from './controllers/find-many-answer-comments.controller'
import { UploadAttachmentController } from './controllers/upload-attachment.controller'
import { StorageModule } from '../storage/storage.module'
import { UploadAndCreateAttachmentUseCase } from '@/domain/forum/application/use-cases/upload-and-create-attachment'
import { ReadNotificationController } from './controllers/read-notification.controller'
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FindManyRecentQuestionsController,
    FindQuestionBySlugController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    DeleteQuestionCommentController,
    CommentOnAnswerController,
    DeleteAnswerCommentController,
    FindManyQuestionAnswersController,
    FindManyQuestionCommentsController,
    FindManyAnswerCommentsController,
    UploadAttachmentController,
    ReadNotificationController,
  ],
  providers: [
    CreateQuestionUseCase,
    FindManyRecentQuestionsUseCase,
    RegisterStudentUseCase,
    AuthenticateStudentUseCase,
    FindQuestionBySlugUseCase,
    EditQuestionUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    ChooseQuestionBestAnswerUseCase,
    CommentOnQuestionUseCase,
    DeleteQuestionCommentUseCase,
    CommentOnAnswerUseCase,
    DeleteAnswerCommentUseCase,
    FindManyQuestionAnswersUseCase,
    FindManyQuestionCommentsUseCase,
    FindManyAnswerCommentsUseCase,
    UploadAndCreateAttachmentUseCase,
    ReadNotificationUseCase,
  ],
})
export class HttpModule {}
