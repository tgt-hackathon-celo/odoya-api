import { UserInterface } from "./user.interface";

export interface UserProfessionalInterface extends Document {
    readonly _id: string;
    //readonly user: UserInterface;
    readonly name: string;
    readonly lastName: string;
    readonly phone : string;
    readonly birthDate: Date;
    readonly community : string;
    readonly maritalStatus: string;
    readonly parentage: string;
    readonly academicEducation: string;
    readonly phoneMonthlyValue: number;
    readonly phoneType: string;
    readonly hairSalon: Boolean;
    readonly time: string;
    readonly cep: string;
    readonly street: string;
    readonly number: string;
    readonly complement: string;
    readonly district: string;
    readonly city: string;
    readonly state: string;
    readonly bank: number;
    readonly Invoicing: number;
    readonly productName1: string;
    readonly productManufacturer1: string;
    readonly productName2: string;
    readonly productManufacturer2: string;
    readonly productName3: string;
    readonly productManufacturer3: string;
    readonly productName4: string;
    readonly productManufacturer4: string;
    readonly productName5: string;
    readonly productManufacturer5: string;
}