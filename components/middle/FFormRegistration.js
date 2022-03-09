import { FInputLogin } from "../low/FInputLogin";
import { FInputEmail } from "../low/FInputEmail";
import { FInputPassword } from "../low/FInputPassword";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react'
import Link from 'next/link';

const inputs = {
    initial: { y: -20, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
};

export default function FFormRegistration() {

    const [inputLogin, setInputLogin] = useState('');

    const [isInputValidateLogin, setInputValidateLogin] = useState(false);

    const loginChange = (email, validate) => {
        setInputLogin(email);
        setInputValidateLogin(validate)
    }

    const [inputEmail, setInputEmail] = useState('');

    const [isInputValidateEmail, setInputValidateEmail] = useState(false);

    const emailChange = (email, validate) => {
        setInputEmail(email);
        setInputValidateEmail(validate)
    }

    const [inputPassword, setInputPassword] = useState('');

    const [isInputValidatePassword, setInputValidatePassword] = useState(false);

    const passwordChange = (email, validate) => {
        setInputPassword(email);
        setInputValidatePassword(validate)
    }

    return (
        <div
            className="mx-auto w-full md:w-2/3 lg:w-1/3 text-color_A px-5"
        >

            <motion.div
                variants={inputs}
                className="flex flex-col w-full text-center"
            >
                <h1 className="mb-4 text-2xl px-5 pt-10 font-medium text-color_A sm:text-3xl title-font">
                    Регистрация аккаунта
                </h1>
            </motion.div>

            <motion.div
                className="mb-4"
                variants={inputs}
            >
                <FInputLogin
                    onLoginChange={loginChange}
                />
            </motion.div>

            <motion.div
                className="mb-4"
                variants={inputs}
            >
                <FInputEmail
                    onEmailChange={emailChange}
                />
            </motion.div>

            <motion.div
                className="mb-4"
                variants={inputs}
            >
                <FInputPassword
                    onPasswordChange={passwordChange}
                />
            </motion.div>

            <motion.div
                className="flex flex-wrap justify-between items-center"
                variants={inputs}
            >
                <button
                    disabled={!(isInputValidateEmail && isInputValidatePassword && isInputValidateLogin)}
                    className="w-full md:w-1/3 lg:w-full xl:w-1/3
                        inline-flex items-center justify-center px-4 py-2 bg-red-600 
                        font-semibold capitalize text-white
                        border border-transparent rounded-md 
                        hover:bg-red-700 active:bg-red-700 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 
                        disabled:opacity-25 transition"
                >
                    Зарегистрировать
                </button>
                <Link href="/login" >
                    <a
                        className="w-full md:w-2/3 lg:w-full xl:w-2/3 
                        text-center md:text-right lg:text-center xl:text-right
                        py-2 md:py-0 lg:py-2 xl:py-0
                        text-color_C underline"
                    >
                        Использовать существующий аккаунт
                    </a>
                </Link>
            </motion.div>

        </div>
    );

};