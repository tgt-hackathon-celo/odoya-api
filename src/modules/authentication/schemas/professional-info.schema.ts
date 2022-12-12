
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

@Schema({ timestamps: true, collection: 'personal-info' })
export class ProfessionalInfo {

    //@Prop({ required: true, unique: true, type: mongoose.Schema.Types.ObjectId, ref: User.name })
    //user: User;

    @Prop({ })
    name: string;

    @Prop({ })
    lastName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ })
    phone: string;
  
    @Prop({ type: Date })
    birthDate: Date;
  
    @Prop({ })
    community : string;

    @Prop({ })
    maritalStatus: string;

    @Prop({ })
    parentage: string;

    @Prop({ })
    academicEducation: string;

    @Prop({ })
    phoneMonthlyValue: number;

    @Prop({ })
    phoneType: string;

    @Prop({ type: Boolean})
    hairSalon: boolean;

    @Prop({ type: String})
    time: string;

    @Prop({ type: String})
    cep: string;

    @Prop({ type: String})
    street: string;

    @Prop({ type: String})
    number: string;

    @Prop({ type: String })
    complement: string;

    @Prop({ type: String})
    district: string;

    @Prop({ type: String})
    city: string;

    @Prop({ type: String})
    state: string;

    @Prop({ type: String})
    bank: string;

    @Prop({ type: Number})
    Invoicing: number;

    @Prop({ type: String})
    productName1: string;

    @Prop({ type: String})
    productManufacturer1: string;

    @Prop({ type: String})
    productName2: string;

    @Prop({ type: String})
    productManufacturer2: string;

    @Prop({ type: String})
    productName3: string;

    @Prop({ type: String})
    productManufacturer3: string;

    @Prop({ type: String})
    productName4: string;

    @Prop({ type: String})
    productManufacturer4: string;

    @Prop({ type: String})
    productName5: string;

    @Prop({ type: String})
    productManufacturer5: string;
    
}
export const ProfessionalInfoSchema = SchemaFactory.createForClass(ProfessionalInfo);