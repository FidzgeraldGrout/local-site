import mongoUserModel from "../../mongo/models/mongoUserModel";
import bcrypt from "bcrypt";
import { v4 } from "uuid";
import mailService from "./mailService";
import * as tokenService from "./tokenService";
import DTOUser from "../dtos/dtoUser";
import mongoConnect from "../../mongo/mongoConnect";
import { ApiError } from "../../../middleware/exceptions";
import * as Yup from 'yup';

const minlengthPassword = process.env.NEXT_PUBLIC_MIN_LENGTH_PASSWORD;
const maxlengthPassword = process.env.NEXT_PUBLIC_MAX_LENGTH_PASSWORD;

const minlengthEmail = process.env.NEXT_PUBLIC_MIN_LENGTH_EMAIL;
const maxlengthEmail = process.env.NEXT_PUBLIC_MAX_LENGTH_EMAIL;

class UserService {

    async registration(email, password) {

        var User = null;

        try {

            const validationSchema = Yup.object().shape({
                email: Yup.string()
                    .required('Не указан электронный адрес')
                    .min(minlengthEmail, `Электронный адрес должен содержать от ${minlengthEmail} до ${maxlengthEmail} символов`)
                    .max(maxlengthEmail, `Электронный адрес должен содержать от ${minlengthEmail} до ${maxlengthEmail} символов`)
                    .email('Электронный адрес указан не корректно'),
                password: Yup.string()
                    .min(minlengthPassword, `Пароль должен содержать от ${minlengthPassword} до ${maxlengthPassword} символов`)
                    .max(maxlengthPassword, `Пароль должен содержать от ${minlengthPassword} до ${maxlengthPassword} символов`)
                    .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль должен содержать как минимум одну строчную букву, одну заглавную букву и одну цифру')
                    .required('Не указан пароль')
            });

            await validationSchema.validate({ email, password }, { abortEarly: false }).catch((e) => {

                throw ApiError.BadRequest(`Произошла ошибка валидации введёных данных: ${e.errors.join(", ")}`);

            });

            await mongoConnect();

            const candidate = await mongoUserModel.findOne({ email });

            if (candidate) {
                throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
            }

            const hashPassword = await bcrypt.hash(password, parseInt(process.env.NEXT_PRIVATE_PASSWORD_SALT))

            const activationLink = v4();

            User = await mongoUserModel.create({
                email: email,
                password: hashPassword,
                activationLink: activationLink
            });

            await mailService.sendActivationMail(email, `${process.env.NEXT_PUBLIC_API_URL}/api/authorization/activate/${activationLink}`).catch((e) => {

                ApiError.BadRequest(`Произошла ошибка отправки письма для активации на почту ${email}( ${e.response} )`);

            });

            const dtoUser = new DTOUser(User);

            const tokens = await tokenService.generateTokens({ ...dtoUser });

            await tokenService.saveToken(dtoUser.id, tokens.refreshToken);

            return { ...tokens, user: dtoUser }

        } catch (error) {

            if (User) await mongoUserModel.deleteOne({
                email: email
            })

            throw error;
        }

    }

    async activate(activationLink) {

        await mongoConnect();

        const user = await mongoUserModel.findOne({ activationLink });

        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }

        user.isActivated = true;

        await user.save();

    }

    async login(email, password) {

        const validationSchema = Yup.object().shape({
            email: Yup.string()
                .required('Не указан электронный адрес')
                .min(minlengthEmail, `Электронный адрес должен содержать от ${minlengthEmail} до ${maxlengthEmail} символов`)
                .max(maxlengthEmail, `Электронный адрес должен содержать от ${minlengthEmail} до ${maxlengthEmail} символов`)
                .email('Электронный адрес указан не корректно'),
            password: Yup.string()
                .min(minlengthPassword, `Пароль должен содержать от ${minlengthPassword} до ${maxlengthPassword} символов`)
                .max(maxlengthPassword, `Пароль должен содержать от ${minlengthPassword} до ${maxlengthPassword} символов`)
                .matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Пароль должен содержать как минимум одну строчную букву, одну заглавную букву и одну цифру')
                .required('Не указан пароль')
        });

        await validationSchema.validate({ email, password }, { abortEarly: false }).catch((e) => {

            throw ApiError.BadRequest(`Произошла ошибка валидации введёных данных: ${e.errors.join(", ")}`);

        });

        await mongoConnect();

        const User = await mongoUserModel.findOne({ email });

        if (!User) {
            throw ApiError.BadRequest(`Пользователь с указанным адресом электронной почты не найден`);
        }

        const isPassEquals = await bcrypt.compare(password, User.password)

        if (!isPassEquals) {
            throw ApiError.BadRequest(`Некорректный пароль`);
        }

        const dtoUser = new DTOUser(User);

        const tokens = await tokenService.generateTokens({ ...dtoUser });

        await tokenService.saveToken(dtoUser.id, tokens.refreshToken);

        return { ...tokens, user: dtoUser }

    }

    async logout( refreshToken ) {

        await mongoConnect();

        return await tokenService.removeToken( refreshToken );

    }

    async refresh( refreshToken ) {

        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }

        const userData = await tokenService.validateRefreshToken( refreshToken );

        await mongoConnect();

        const tokenFromDb = await tokenService.findToken( refreshToken );

        if( !userData || !tokenFromDb ){
            throw ApiError.UnauthorizedError();
        }

        const User = await mongoUserModel.findById( userData.id );

        if (!User) {
            throw ApiError.BadRequest(`При обновлении токена сессии была обнаружена ошибка`);
        }

        const dtoUser = new DTOUser(User);

        const tokens = await tokenService.generateTokens({ ...dtoUser });

        await tokenService.saveToken(dtoUser.id, tokens.refreshToken);

        return { ...tokens, user: dtoUser }

    }

    async getAllUsers(){

        await mongoConnect();
        
        return await mongoUserModel.find();

    }
}

export default new UserService();