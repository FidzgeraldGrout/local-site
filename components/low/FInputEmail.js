export function FInputEmail({ onEmailChange }) {

    const handleChange = (e) => {
        onEmailChange(
            e.target.value,
            (e.target.value == null) || 
            (e.target.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) != null)
        );
    }

    return (
        <>
            <input
                id="email"
                type="text"
                name="email"
                placeholder="Адрес электронной почты"
                onChange={handleChange}
                className="border border-gray-300 block w-full
                    focus:border-red-300 focus:outline-none focus:ring focus:ring-red-200 focus:ring-opacity-50 
                    rounded-md shadow-sm disabled:bg-gray-100" />
        </>
    )

}