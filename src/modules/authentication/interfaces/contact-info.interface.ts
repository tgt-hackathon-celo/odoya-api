import { UserInterface } from "../../authentication/interfaces/user.interface";

export interface ContactInfoInterface extends Document {
    readonly _id: string;
    readonly email: string;
    readonly phone: string;
    readonly user: UserInterface;
}