import { useState } from 'react'

const minlength = 6;
const maxlength = 30;

export function FInputPassword({ onPasswordChange }) {

    const [isInputValidate, setInputValidate] = useState(true);

    const handleChange = (e) => {

        let value = e.target.value;

        let isValid = (value.length > minlength)
            && (value.length < maxlength)
            && (/\d/.test(value))
            && (/[a-z]/.test(value))
            && (/[A-Z]/.test(value));

        setInputValidate(value == "" || isValid);
        onPasswordChange(value, isValid);

    }

    return (
        <>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
                minLength={minlength}
                maxLength={maxlength}
                className="border border-gray-300 block w-full
                    focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 
                    rounded-md shadow-sm disabled:bg-gray-100"
            />
            {isInputValidate ? null :
                <p className="text-color_C text-xs italic">
                    Пароль должен содержать от {minlength} до {maxlength} символов, включая как минимум одну строчную букву, одну заглавную букву и одну цифру
                </p>
            }
        </>
    )

}