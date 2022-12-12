import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserStatusEnum } from "./user-status.enum";
import * as mongoose from 'mongoose';
import { ProfessionalProducts, ProfessionalProductsSchema } from "./user-professional-products.schema";

@Schema({ timestamps: true, collection: 'user' })
export class User {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ })
    password: string;

    @Prop({ required: true, enum: [UserStatusEnum.active] })
    status: UserStatusEnum;
}
export const UserSchema = SchemaFactory.createForClass(User);