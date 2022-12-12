import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserProfessionalInfoRegisterDto } from "../dtos/user-professional-info-register.dto";
import { UserStatusEnum } from "../schemas/user-status.enum";
import { ProfessionalInfo } from "../schemas/professional-info.schema";
import { User } from "../schemas/user.schema";
import { PersonalInfoUpdateDto } from "../dtos/user-personal-info-update.dto";
import { UserInterface } from "../interfaces/user.interface";
import { UserProfessionalInterface } from "../interfaces/user-professional-info.interface";
import { UserRegisterDto } from "../dtos/user-register.dto";

@Injectable()
export class UserPersonalService {

    constructor(
        @InjectModel(ProfessionalInfo.name) private readonly model: Model<UserProfessionalInterface>,
    ) { }


    async list(): Promise<UserProfessionalInterface[]> {
        return await this.model
            .find({});
    }
    
    async save(dto: UserProfessionalInfoRegisterDto): Promise<UserProfessionalInterface> {
        const data = await new this.model(dto);
        return data.save();
    }

    async update(user: UserInterface, dto: PersonalInfoUpdateDto): Promise<UserProfessionalInterface> {
        return await this.model.findOneAndUpdate({ user }, {
            $set: {
                name: dto.name,
                phone: dto.phone,
                password: dto.password,
                cep: dto.cep,
                address: dto.address,
                number: dto.number,
                street: dto.street,
                city: dto.city,
                state: dto.state,
            }
        });
    }
}