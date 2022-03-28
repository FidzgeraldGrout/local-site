import { FInputLogin } from "../low/FInputLogin";
import { FInputEmail } from "../low/FInputEmail";
import { FInputPassword } from "../low/FInputPassword";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react'
import Link from 'next/link';
import { ApiError } from "../../middleware/exceptions";
import { useStore } from "../hight/StoreProvider";
import { observer } from 'mobx-react-lite'

const inputs = {
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

const FFormProfile = observer(function FFormProfile() {

    /*
        Использование глобальных данных
    */

    const user = useStore().MOBXuser;

    /*
        ---------------
    */

    return (
        <motion.div
            variants={inputs}
            className="flex flex-auto justify-center text-center"
        >
            <p className="text-xl sm:text-2xl pt-10 font-medium text-color_B title-font">
                Профиль
            </p>
        </motion.div>
    );

});


export default FFormProfile;