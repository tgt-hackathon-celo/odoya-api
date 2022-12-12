import { UserInterface } from "./user.interface";

export interface VerificationInterface extends Document {
    readonly _id: string;
    readonly attempt: number;
    readonly deadline: Date;
    readonly user: UserInterface;
    readonly code: number;
}