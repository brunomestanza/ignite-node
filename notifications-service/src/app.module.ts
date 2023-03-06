import { Module } from '@nestjs/common';
import { HTTPModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';

// Os decorators como o abaixo são usados para acoplar funcionamento em algo, como variável, classe ou algo assim. Eles são chamados com @.
// O Module abaixo é feito pra acoplar vários controllers e providers. Um module pode importar outro module, sendo o App o principal.
@Module({
  imports: [HTTPModule, DatabaseModule],
  // Controllers são pontos de entrada da aplicação que lidam com chamadas HTTP.
  controllers: [],
  // Services são classes sem propósito específico dentro do Nest. É uma classe genérica usada em controllers e outros services.
  providers: [],
})
export class AppModule {}
