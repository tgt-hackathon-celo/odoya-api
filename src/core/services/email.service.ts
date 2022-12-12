import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectSendGrid, SendGridService } from "@ntegral/nestjs-sendgrid";
import { EnviromentVariablesEnum } from "../dtos/enviroment.variables.enum";

@Injectable()
export class EmailService {

    constructor(
        @InjectSendGrid() private readonly client: SendGridService,
        private readonly configService: ConfigService,
    ) { }

    async sendEmail(to: string, subject: string, text: string, html: string) {

        const msg = {
            to,
            from: this.configService.get(EnviromentVariablesEnum.NOSQL_CONNECTION_STRING),
            subject,
            text,
            html
        };

        await this.client.send(msg);
    }
}