import { Injectable } from "@nestjs/common";
import { ValidatorContractInterface } from "../../../core/interfaces/validator-contract.interface";
import { ValidatorsUtil } from "../../../core/utils/validators.util";
import { UserActivateDto } from "../dtos/user-register-password.dto";

@Injectable()
export class UserActivateValidator implements ValidatorContractInterface {

    errors: any[];

    validate(dto: UserActivateDto): boolean {

        const validator = new ValidatorsUtil();

        validator.isRequired(dto.email, 'email é obrigatório!');
        validator.isEmail(dto.email, 'email é inválido!');

        validator.isRequired(dto.code, 'codigo é obrigatório!');

        this.errors = validator.errors;
        return validator.isValid();
    }
}