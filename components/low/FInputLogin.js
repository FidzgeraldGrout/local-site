import { useState } from 'react'

const minlength = 4;
const maxlength = 30;

export function FInputLogin({ onLoginChange }) {

    const [isInputValidate, setInputValidate] = useState(true);

    const handleChange = (e) => {

        let value = e.target.value;

        let isValid = (value.length > minlength)
            && (value.length < maxlength)
            && (/\d/.test(value))
            && (/[a-z]/.test(value))
            && (/^[A-Za-z0-9]+$/.test(value));

        setInputValidate(value == "" || isValid);
        onLoginChange(value, isValid);

    }

    return (
        <>
            <input
                id="login"
                type="text"
                name="login"
                placeholder="Логин"
                onChange={handleChange}
                minLength={minlength}
                maxLength={maxlength}
                className="border border-gray-300 block w-full
                    focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 
                    rounded-md shadow-sm disabled:bg-gray-100"
            />
            {isInputValidate ? null :
                <p className="text-color_C text-xs italic">
                    Логин должен содержать от {minlength} до {maxlength} символов, где должны использоваться только латинские буквы и цифры
                </p>
            }
        </>
    )

}