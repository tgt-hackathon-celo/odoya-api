import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { EnviromentVariablesEnum } from './core/dtos/enviroment.variables.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('main');
  
  if (configService.get(EnviromentVariablesEnum.ENABLE_CORS) === 'true') {

    const corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
      allowedHeaders: 'Content-Type, Accept, Authorization'
    };
    app.enableCors(corsOptions);
  }

  const swaggerOptions = new DocumentBuilder()
    .setTitle('PROJETO-CELO - API access control')
    .setVersion('0.0.1')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get(EnviromentVariablesEnum.PORT) || 3000;
  await app.listen(port);
  logger.log(`projeto-celo-access-control-api started at port ${port}`);
}
bootstrap();
