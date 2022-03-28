import { UsersIcon, UserCircleIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { motion } from "framer-motion";

const itemList = [
    { id: 1, text: 'Профиль', url: '/dashboard/profile', icon: <UserCircleIcon className="h-6 w-6" /> },
    { id: 2, text: 'Пользователи', url: '/dashboard/users', icon: <UsersIcon className="h-6 w-6" /> }
];

const background = {
    initial: {
        x: '-16em',
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, -0.05, 0.01, 0.99],
            when: "beforeChildren",
            staggerChildren: 0.5
        },
    },
};

const itemMotion = {
    initial: {
        y: -20,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, -0.05, 0.01, 0.99],
        },
    },
};

export default function FSidebar() {
    return (
        <div
            className="hidden md:block"
        >
            <motion.nav
                initial="initial"
                animate="animate"
                key='FSidebar'
                variants={background}
                className="flex flex-col w-64 bg-color_A min-h-full"
            >
                {itemList.map((item) => {
                    return (
                        <motion.div
                            variants={itemMotion}
                            key={`navItem${item.id}`}
                        >
                            <Link
                                href={item.url}
                                key={`navItem${item.id}`}
                            >
                                <a
                                    className="flex items-center mt-4 py-2 px-4 bg-color_B bg-opacity-25 text-color_F"
                                    key={`navItem${item.id}`}
                                >
                                    {item.icon}
                                    <p className="mx-3 text-color_G">{item.text}</p>
                                </a>
                            </Link>
                        </motion.div>
                    )
                })}
            </motion.nav>
        </div>
    );

}