import { NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { ValidatorContractInterface } from '../interfaces/validator-contract.interface';

export class ValidatorInterceptor implements NestInterceptor {
  constructor(public validationContractInterface: ValidatorContractInterface) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const body = context.switchToHttp().getRequest().body;

    const valid = this.validationContractInterface.validate(body);

    if (!valid)
      throw new HttpException(
        new ResponseDto(false, null, this.validationContractInterface.errors),
        HttpStatus.BAD_REQUEST,
      );

    return next.handle();
  }
}