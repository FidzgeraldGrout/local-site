import Link from 'next/link';
import { useStore } from "../hight/StoreProvider";
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import { HomeIcon, UserCircleIcon } from '@heroicons/react/solid';
import FNavbarLink from '../low/FNavbarLink';
import FNavbarProfile from '../low/FNavbarProfile/FNavbarProfile';

const FNavbar = observer(function FNavbar() {

    const router = useRouter();

    // use store from the store context
    const user = useStore().MOBXUser;

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
                        <Link href="/" passHref>
                            <FNavbarLink >
                                <HomeIcon className="h-8 w-8 block md:hidden" />
                                <p className="text-color_G hidden md:block">На главную</p>
                            </FNavbarLink>
                        </Link>
                    }

                    {user?.isAuth ?
                        <FNavbarProfile />
                        // <Link href="/" >
                        //     <a className='text-color_G hover:bg-color_C hover:text-color_G px-3 py-2 rounded-md text-sm font-bold font-font_B'>
                        //         {user.user?.email}
                        //     </a>
                        // </Link>
                        : router.pathname != "/authorization/login" && router.pathname != "/authorization/registration" &&
                        <Link href="/authorization/login" >
                            <FNavbarLink >
                                <UserCircleIcon className="h-8 w-8 block md:hidden" />
                                <p className="text-color_G hidden md:block">Войти</p>
                            </FNavbarLink>
                        </Link>
                    }

                </div>
            </div>
        </nav>

    );

});


export default FNavbar;