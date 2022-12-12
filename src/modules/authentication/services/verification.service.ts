import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VerificationInterface } from "../interfaces/verification.interface";
import NumberUtil from "../../../core/utils/number.util";
import { Verification } from "../schemas/verification.schema";
import { EmailService } from "../../../core/services/email.service";
import { UserInterface } from "../interfaces/user.interface";

@Injectable()
export class VerificationService {

    private readonly logger = new Logger(VerificationService.name);

    constructor(
        @InjectModel(Verification.name) private readonly model: Model<VerificationInterface>,
        private readonly emailService: EmailService,
    ) { }

    async save(user: UserInterface): Promise<VerificationInterface> {

        let deadline: Date = new Date();
        deadline.setMinutes(deadline.getMinutes() + 5);

        const code = NumberUtil.generateRandomNumber();

        const verification = {
            attempt: 0,
            deadline,
            user,
            code,
        };

        const data = new this.model(verification);

        return await data.save();
    }

    async getById(id: string): Promise<VerificationInterface> {
        return await this.model.findById(id);
    }

    async getByUser(user: UserInterface): Promise<VerificationInterface> {
        return await this.model.findOne({ user })
            .populate('user');
    }

    async delete(id: string) {
        return await this.model.findByIdAndDelete(id);
    }

    async sendVerificationEmail(
        user: UserInterface,
        title: string,
        text: string,
        html: string,
    ) {
        const verificacao = await this.getByUser(user);

        const result = await this.emailService.sendEmail(
            verificacao.user[0].email,
            title,
            text,
            html,
        );
    }

    async incrementAttempt(_id: string, attempt: number) {
        return await this.model.findOneAndUpdate(
            { _id },
            {
                $set: {
                    attempt,
                },
            },
        );
    }
}