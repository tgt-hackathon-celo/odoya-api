import { ApiProperty } from "@nestjs/swagger";
import { UserInterface } from "../interfaces/user.interface";
import { UserProfessionalProductRegisterDto } from "./user-professional-products-register.dto";

export abstract class UserProfessionalInfoRegisterDto{
  
    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    lastName: string;

    @ApiProperty({ type: String })
    email: string;

    @ApiProperty({ type: String })
    phone: string;

    @ApiProperty({ type: Date })
    birthDate: Date;

    @ApiProperty({ type: String })
    community: string;

    @ApiProperty({ type: String })
    maritalStatus: string;

    @ApiProperty({ type: String })
    parentage: string;

    @ApiProperty({ type: String })
    academicEducation: string;

    @ApiProperty({ type: Number })
    phoneMonthlyValue: number;

    @ApiProperty({ type: String })
    phoneType: string;

    @ApiProperty({ type: Boolean})
    hairSalon: boolean;

    @ApiProperty({ type: String})
    time: string;

    @ApiProperty({ type: String})
    cep: string;

    @ApiProperty({ type: String})
    street: string;

    @ApiProperty({ type: String})
    number: string;

    @ApiProperty({ type: String })
    complement: string;

    @ApiProperty({ type: String})
    district: string;

    @ApiProperty({ type: String})
    city: string;

    @ApiProperty({ type: String})
    state: string;

    @ApiProperty({ type: String})
    bank: string;

    @ApiProperty({ type: Number})
    Invoicing: number;

    @ApiProperty({ type: Number})
    clients: number;

    @ApiProperty({ type: String})
    cpnjMei: string;

    @ApiProperty({ type: String})
    productName1: string;

    @ApiProperty({ type: String})
    productManufacturer1: string;

    @ApiProperty({ type: String})
    productName2: string;

    @ApiProperty({ type: String})
    productManufacturer2: string;

    @ApiProperty({ type: String})
    productName3: string;

    @ApiProperty({ type: String})
    productManufacturer3: string;
    
    @ApiProperty({ type: String})
    productName4: string;

    @ApiProperty({ type: String})
    productManufacturer4: string;

    @ApiProperty({ type: String})
    productName5: string;

    @ApiProperty({ type: String})
    productManufacturer5: string;
    
   //user: UserInterface;
}