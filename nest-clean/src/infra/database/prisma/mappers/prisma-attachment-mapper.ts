import { UniqueEntityID } from '@/core/value-objects/unique-entity-id'
import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { Attachment as PrismaAttachment, Prisma } from '@prisma/client'

export class PrismaAttachmentMapper {
  // static toDomain(raw: PrismaAttachment): Attachment {
  //   return Attachment.create(
  //     {
  //       content: raw.content,
  //       authorId: new UniqueEntityID(raw.authorId),
  //       questionId: new UniqueEntityID(raw.questionId),
  //       createdAt: raw.createdAt,
  //       updatedAt: raw.updatedAt,
  //     },
  //     new UniqueEntityID(raw.id),
  //   )
  // }

  static toPrisma(raw: Attachment): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      title: raw.title,
      url: raw.url,
    }
  }
}
