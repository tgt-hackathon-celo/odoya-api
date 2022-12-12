import { UserStatusEnum } from "../schemas/user-status.enum";

export interface UserListInterface extends Document {
    readonly _id: string;
    readonly email: string;
    readonly status: UserStatusEnum;
}