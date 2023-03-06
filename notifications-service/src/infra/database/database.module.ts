import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { NotificationsRepository } from 'src/application/repositories/notifications-repository';
import { PrismaNotificationRepository } from './prisma/repositories/prisma-notifications-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationRepository,
    },
  ],
  exports: [NotificationsRepository],
})
export class DatabaseModule {}
