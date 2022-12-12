import { UserStatusEnum } from "../schemas/user-status.enum";

export interface UserInterface extends Document {
    readonly _id: string;
    readonly email: string;
    readonly password: string;
    readonly status: UserStatusEnum;
}