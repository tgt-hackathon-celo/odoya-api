import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { ResponseDto } from "../dtos/response.dto";
import CryptoUtil from "../utils/crypto.util";

export class EncryptInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const payloadKey = process.env.PAYLOAD_KEY;
        const payload = context.switchToHttp().getRequest().body.payload;

        console.log(payload);
        if (!payload)
            throw new HttpException(
                new ResponseDto(false, null, ['payload é obrigatório!']),
                HttpStatus.BAD_REQUEST,
            );

        const decryptedBody = JSON.parse(CryptoUtil.decrypt(
            payloadKey,
            context.switchToHttp().getRequest().body.payload));

        if (!decryptedBody)
            throw new HttpException(
                new ResponseDto(false, null, ['erro ao descriptografar o payload!']),
                HttpStatus.BAD_REQUEST,
            );

        context.switchToHttp().getRequest().body = decryptedBody;

        return next.handle();
    }
}