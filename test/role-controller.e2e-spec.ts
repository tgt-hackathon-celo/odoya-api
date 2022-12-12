import { HttpStatus, INestApplication } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { Test, TestingModule } from "@nestjs/testing";
import { RoleController } from "../src/modules/authentication/controllers/role.controller";
import { RoleSchema } from "../src/modules/authentication/schemas/role.schema";
import { UserSchema } from "../src/modules/authentication/schemas/user.schema";
import { RoleService } from "../src/modules/authentication/services/role.service";
import { closeInMongodConnection, rootMongooseTestModule } from "./mock/database.test.util";
import * as request from 'supertest';
import { FunctionsEnum } from "../src/core/interfaces/function-enum";
import { ResponseDto } from "../src/core/dtos/response.dto";
import { JwtStrategy } from "../src/modules/authentication/strategies/jwt-strategy";
import { JwtTestUtil } from "./mock/jwt.test.util";
import { UserTypeEnum } from "../src/modules/authentication/schemas/user-type.enum";

describe('RoleController (e2e)', () => {

    let app: INestApplication;
    let jwtMock = new JwtTestUtil();

    const apiUrl = '/role';

    const roleServiceMock = {
        list: jest.fn(),
    };

    beforeEach(async () => {

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                rootMongooseTestModule(),
                ConfigModule.forRoot(),
                MongooseModule.forFeature([
                    { name: 'user', schema: UserSchema },
                    { name: 'role', schema: RoleSchema },
                ]),
                PassportModule.register({ defaultStrategy: 'jwt' }),
                JwtModule.register({
                    secret: process.env.JWT_KEY,
                    signOptions: {
                        expiresIn: Number(process.env.JWT_EXPIRATION),
                    },
                }),
            ],
            controllers: [
                RoleController,
            ],
            providers: [
                JwtStrategy,
                { provide: RoleService, useValue: roleServiceMock },
            ]
        }).compile();

        jest.resetAllMocks()
        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        closeInMongodConnection();
        await app.close();
    });

    describe(`GET ${apiUrl}`, () => {

        it("should fail if bearer token is not valid", async () => {

            const bearer = '123154';

            return request(app.getHttpServer())
                .get(`${apiUrl}`)
                .set('accept', '*/*')
                .expect('Content-Type', /json/)
                .set('Authorization', `Bearer ${bearer}`)
                .expect(HttpStatus.UNAUTHORIZED)
                .expect((response: ResponseDto) => {
                    expect(response.success).toBeFalsy()
                });
        });

        it(`should thown if user does not have role function`, () => {

            const bearer = jwtMock.createToken(
                '1',
                'test@test.com',
                [FunctionsEnum.cortesia],
                UserTypeEnum.consultor,
                '1'
            );

            return request(app.getHttpServer())
                .get(`${apiUrl}`)
                .set('accept', '*/*')
                .expect('Content-Type', /json/)
                .set('Authorization', `Bearer ${bearer.accessToken}`)
                .expect(HttpStatus.FORBIDDEN)
                .then(response => {
                    expect(response.body.success).toBeFalsy()
                });
        });


        it(`success`, () => {

            const result = [
                { _id: '1', name: 'role1', description: 'desc role1', functions: [FunctionsEnum.compraGuiada] },
                { _id: '2', name: 'role2', description: 'desc role2', functions: [FunctionsEnum.compraGuiada] },
                { _id: '3', name: 'role3', description: 'desc role3', functions: [FunctionsEnum.compraGuiada] },
            ];

            roleServiceMock.list.mockReturnValue(result);

            const bearer = jwtMock.createToken(
                '1',
                'test@test.com',
                [FunctionsEnum.role],
                UserTypeEnum.consultor,
                '1'
            );

            return request(app.getHttpServer())
                .get(`${apiUrl}`)
                .set('accept', '*/*')
                .expect('Content-Type', /json/)
                .set('Authorization', `Bearer ${bearer.accessToken}`)
                .expect(HttpStatus.OK)
                .then(response => {
                    expect(response.body.success).toBeTruthy()
                    expect(response.body.data).toEqual(result)
                });
        });
    });
});