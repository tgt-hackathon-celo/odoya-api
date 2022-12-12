
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

@Schema({ timestamps: true, collection: 'professional-products' })
export class ProfessionalProducts {

    @Prop({ type: String})
    name: string;

    @Prop({ type: String})
    manufacturer: string;

}
export const ProfessionalProductsSchema = SchemaFactory.createForClass(ProfessionalProducts);