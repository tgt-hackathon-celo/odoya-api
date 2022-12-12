import { Injectable } from "@nestjs/common";
import { ValidatorContractInterface } from "../../../core/interfaces/validator-contract.interface";
import { ValidatorsUtil } from "../../../core/utils/validators.util";
import { AuthenticateTokenDto } from "../dtos/authenticate-token.dto";

@Injectable()
export class AuthenticateTokenValidator implements ValidatorContractInterface {

    errors: any[];

    validate(dto: AuthenticateTokenDto): boolean {

        const validator = new ValidatorsUtil();

        validator.isRequired(dto.token, 'token é obrigatório!');

        this.errors = validator.errors;
        return validator.isValid();
    }
}