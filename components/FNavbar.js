import Link from 'next/link';

export default function FNavbar({ isAuthorized }) {

    return (

        <nav className="bg-color_A">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative flex items-center justify-between h-20">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="block h-16 w-auto"
                            src='/logo.png'
                            alt="Workflow"
                        />
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <Link href={ isAuthorized ? "/" : "/authorization"} >
                        <a className='text-color_G hover:bg-color_C hover:text-color_G px-3 py-2 rounded-md text-sm font-bold font-font_B'>
                            { isAuthorized ? "На главную" : "Войти"}
                        </a>
                    </Link>
                </div>
            </div>
        </nav>

    );
    
};