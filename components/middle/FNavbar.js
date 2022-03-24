import { useStore } from "../hight/StoreProvider";
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid';
import FNavbarProfile from '../low/FNavbarProfile';
import FNextLink from '../low/FNextLink';

const FNavbar = observer(function FNavbar() {

    const router = useRouter();

    const user = useStore().MOBXUser;

    const logout = async (event) => {

        event.preventDefault()

        await user.logout();

        router.push('/');

    }

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

                    {router.pathname != "/" &&
                        <FNextLink
                            href="/"
                            className='text-color_C hover:bg-color_C hover:text-color_G px-3 py-2 rounded-md text-sm font-bold font-font_B'
                        >
                            <HomeIcon className="h-8 w-8 block md:hidden" />
                            <p className="text-color_G hidden md:block">На главную</p>
                        </FNextLink>
                    }

                    {user?.isAuth ?
                        <FNavbarProfile
                            userInitials={user?.user?.login}
                            logout={logout}
                        />
                        : router.pathname != "/authorization/login" && router.pathname != "/authorization/registration" &&
                        <FNextLink
                            href="/authorization/login"
                            className='text-color_C hover:bg-color_C hover:text-color_G px-3 py-2 rounded-md text-sm font-bold font-font_B'
                        >
                            <UserCircleIcon className="h-8 w-8 block md:hidden" />
                            <p className="text-color_G hidden md:block">Войти</p>
                        </FNextLink>
                    }

                </div>
            </div>
        </nav>

    );

});


export default FNavbar;