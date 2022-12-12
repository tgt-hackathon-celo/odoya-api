import { UserInterface } from "./user.interface";

export interface UserProductsInterface extends Document {
    readonly name: string;
    readonly manufacturer: string;
}