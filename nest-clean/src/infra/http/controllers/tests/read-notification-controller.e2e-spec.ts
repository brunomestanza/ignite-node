import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { NotificationFactory } from 'test/factories/make-notification'
import { StudentFactory } from 'test/factories/make-student'

describe('Read notification (E2E)', () => {
  let app: INestApplication
  let studentFactory: StudentFactory
  let prismaService: PrismaService
  let notificationFactory: NotificationFactory
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [StudentFactory, NotificationFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    studentFactory = moduleRef.get(StudentFactory)
    notificationFactory = moduleRef.get(NotificationFactory)
    prismaService = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PATCH] /notifications/:notificationId/read', async () => {
    const user = await studentFactory.makePrismaStudent({
      name: 'John Doe',
    })

    const accessToken = jwt.sign({ sub: user.id.toString() })

    const notification = await notificationFactory.makePrismaNotification({
      recipientId: user.id,
      title: 'New notification',
      content: 'Notification content',
    })

    const notificationId = notification.id.toString()

    const response = await request(app.getHttpServer())
      .patch(`/notifications/${notificationId}/read`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    const notificationOnDatabase = await prismaService.notification.findFirst({
      where: {
        recipientId: user.id.toString(),
      },
    })

    expect(response.statusCode).toBe(204)
    expect(notificationOnDatabase?.readAt).not.toBeNull()
  })
})
