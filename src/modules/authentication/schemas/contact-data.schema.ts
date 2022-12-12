import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "../../authentication/schemas/user.schema";

@Schema({ timestamps: true, collection: 'contact-info' })
export class ContactInfo {

    @Prop({ required: true, unique: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    user: User;

    @Prop({ type: String })
    email: string;

    @Prop({ type: String })
    phone: string;
    
}
export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);