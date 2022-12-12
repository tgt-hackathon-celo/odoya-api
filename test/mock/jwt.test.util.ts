import { JwtService } from "@nestjs/jwt";
import { FunctionsEnum } from "../../src/core/interfaces/function-enum";
import { UserTypeEnum } from "../../src/modules/authentication/schemas/user-type.enum";

export class JwtTestUtil {
    createToken(
        userId: string,
        email: string,
        functions: FunctionsEnum[],
        type: UserTypeEnum,
        branchId: string
    ) {
        const jwt = new JwtService({ secret: process.env.JWT_KEY });
        const user = { userId, email, functions, type, branchId };
        const accessToken = jwt.sign(user, { expiresIn: 1000 });
        return { expiresIn: 1000, accessToken };
    }
}