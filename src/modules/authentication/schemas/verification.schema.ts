import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

@Schema({ timestamps: true, collection: Verification.name.toLowerCase() })
export class Verification {

    @Prop({ type: Number, required: true })
    attempt: number;

    @Prop({ type: Date, required: true })
    deadline: string;

    @Prop({ required: true, unique: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: User.name }] })
    user: User;

    @Prop({ type: Number, required: true })
    code: number;
}
export const VerificationSchema = SchemaFactory.createForClass(Verification);