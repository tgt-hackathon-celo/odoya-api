import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ContactInfoRegisterDto } from "../dtos/contact-info-register.dto";
import { ContactInfoInterface } from "../interfaces/contact-info.interface";
import { ContactInfo } from "../schemas/contact-data.schema";

@Injectable()
export class ContactInfoService {

    constructor(
        @InjectModel(ContactInfo.name) private readonly model: Model<ContactInfoInterface>,
    ) { }

    async save(dto: ContactInfoRegisterDto): Promise<ContactInfoInterface> {
        const data = await new this.model(dto);
        return data.save();
    }
}