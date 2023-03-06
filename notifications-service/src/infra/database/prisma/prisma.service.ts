import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()

// A OnModuleInit possibilita que possamos executar algo assim que a aplicação for ao ar, no caso a conexão ao banco de dados.
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  // Caso a conexão ao prisma caia, o código abaixo fecha a aplicação.
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
