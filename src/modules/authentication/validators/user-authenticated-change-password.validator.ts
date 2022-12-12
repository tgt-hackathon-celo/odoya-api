import { Injectable } from "@nestjs/common";
import { ValidatorContractInterface } from "../../../core/interfaces/validator-contract.interface";
import { ValidatorsUtil } from "../../../core/utils/validators.util";
import { UserAuthenticatedChangePasswordDto } from "../dtos/user-authenticated-change-password.dto";

@Injectable()
export class UserAuthenticatedChangePasswordValidator implements ValidatorContractInterface {

    errors: any[];

    validate(dto: UserAuthenticatedChangePasswordDto): boolean {

        const validator = new ValidatorsUtil();

        validator.isRequired(dto.previousPassword, 'senha é obrigatório!');
        validator.hasMinLen(dto.previousPassword, 6, 'senha deve ter no mínimo 6 caracteres!');
        validator.hasMaxLen(dto.previousPassword, 20, 'senha deve ter no máximo 20 caracteres!');

        validator.isRequired(dto.newPassword, 'nova senha é obrigatório!');
        validator.hasMinLen(dto.newPassword, 6, 'nova senha deve ter no mínimo 6 caracteres!');
        validator.hasMaxLen(dto.newPassword, 20, 'nova senha deve ter no máximo 20 caracteres!');

        this.errors = validator.errors;
        return validator.isValid();
    }
}