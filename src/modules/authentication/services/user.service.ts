import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserRegisterDto } from "../dtos/user-register.dto";
import { UserInterface } from "../interfaces/user.interface";
import { UserListInterface } from "../interfaces/userList.interface";
import { UserStatusEnum } from "../schemas/user-status.enum";
import { User } from "../schemas/user.schema";

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly model: Model<UserInterface>,
    ) { }

    async list(): Promise<UserListInterface[]> {
        return await this.model
            .find({})
    }

    async getById(_id: string): Promise<UserInterface> {
        return await this.model
            .findOne({ _id });
    }

    async getByEmail(email: string): Promise<UserInterface> {
        return await this.model
            .findOne({ email });
    }

    async save(dto: UserRegisterDto): Promise<UserInterface> {
        const data = await new this.model(dto);
        return data.save();
    }

    async updatePassword(_id: string, password: string): Promise<UserInterface> {
        return await this.model.findOneAndUpdate({ _id }, {
            $set: {
                password
            }
        });
    }

    async delete(_id: string): Promise<UserInterface> {
        return await this.model.findByIdAndDelete(_id);
    }

    async updateStatus(_id: string, status: UserStatusEnum): Promise<UserInterface> {
        return await this.model.findOneAndUpdate(
            { _id },
            {
                $set: {
                    status
                },
            },
        );
    }

    async update(_id: string, name: string): Promise<UserInterface> {
        return await this.model.findOneAndUpdate(
            { _id },
            {
                $set: {
                    name,
                },
            },
        );
    }
}