import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnviromentVariablesEnum } from '../../core/dtos/enviroment.variables.enum';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [
                ConfigModule,
            ],
            useFactory: async (
                configService: ConfigService,
            ) => ({
                uri: (configService.get(EnviromentVariablesEnum.NOSQL_CONNECTION_STRING)),
                useNewUrlParser: true,
            }),
            inject: [
                ConfigService,
            ]
        })
    ],
})
export class DatabaseModule { }
