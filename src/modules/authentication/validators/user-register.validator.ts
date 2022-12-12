import { Injectable } from "@nestjs/common";
import { ValidatorContractInterface } from "../../../core/interfaces/validator-contract.interface";
import { ValidatorsUtil } from "../../../core/utils/validators.util";
import { UserRegisterDto } from "../dtos/user-register.dto";

@Injectable()
export class UserRegisterValidator implements ValidatorContractInterface {

    errors: any[];

    validate(dto: UserRegisterDto): boolean {

        const validator = new ValidatorsUtil();

        validator.isRequired(dto.email, 'email é obrigatório!');
        validator.isEmail(dto.email, 'email inválido!');

        this.errors = validator.errors;
        return validator.isValid();
    }
}