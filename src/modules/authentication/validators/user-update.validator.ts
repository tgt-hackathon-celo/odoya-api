import { Injectable } from "@nestjs/common";
import { ValidatorContractInterface } from "../../../core/interfaces/validator-contract.interface";
import { ValidatorsUtil } from "../../../core/utils/validators.util";
import { UserUpdateDto } from "../dtos/user-update.dto";

@Injectable()
export class UserUpdateValidator implements ValidatorContractInterface {

    errors: any[];

    validate(dto: UserUpdateDto): boolean {

        const validator = new ValidatorsUtil();

        validator.isRequired(dto.name, 'nome é obrigatório!');
        validator.hasMinLen(dto.name, 2, 'nome deve ter no mínimo 2 caracteres!');
        validator.hasMaxLen(dto.name, 50, 'nome deve ter no máximo 50 caracteres!');

        this.errors = validator.errors;
        return validator.isValid();
    }
}