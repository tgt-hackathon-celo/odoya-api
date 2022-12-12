import { Injectable } from "@nestjs/common";
import { ValidatorContractInterface } from "../../../core/interfaces/validator-contract.interface";
import { ValidatorsUtil } from "../../../core/utils/validators.util";
import { AuthenticateDto } from "../dtos/authenticate.dto";

@Injectable()
export class AuthenticateValidator implements ValidatorContractInterface {

    errors: any[];

    validate(dto: AuthenticateDto): boolean {

        const validator = new ValidatorsUtil();

        validator.isRequired(dto.email, 'email é obrigatório!');
        validator.isEmail(dto.email, 'email é inválido!');

        validator.isRequired(dto.password, 'password é obrigatório!');
        validator.hasMinLen(dto.password, 6, 'password deve ter no mínimo 6 caracteres!');
        validator.hasMaxLen(dto.password, 20, 'password deve ter no máximo 20 caracteres!');

        this.errors = validator.errors;
        return validator.isValid();
    }
}