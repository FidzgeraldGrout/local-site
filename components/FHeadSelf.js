import React from "react";
import { motion } from "framer-motion";
import { FSplitText } from "./FSplitText";

const title = {
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

const img = {
    initial: {
        opacity: 0,
        scale: 1
    },
    animate: {
        opacity: 1,
        scale: [1, 1.05, 1],
        transition: {
            duration: 4,
            ease: [0.87, 0, 0.83, 1]
        }
    }
}

const text = {
    initial: i => ({
        opacity: 0,
    }),
    animate: i => ({
        opacity: 1,
        transition: {
            duration: Math.random(),
            ease: [0.87, 0, 0.83, 1]
        }
    })
}

export default function FHeadSelf() {
    return (
        <div
            className="flex-1"
        >
            <motion.img
                className="mx-auto pt-10"
                src='/imageSelf.png'
                alt="Self image"
                variants={img}
            />

            <div
                className="flex flex-wrap justify-center p-10 mm:space-x-8"
            >

                <div>
                    <FSplitText
                        className="text-2xl sm:text-4xl text-color_E font-font_A text-center font-bold"
                        variants={text}
                    >
                        ПРИВЕТ,
                    </FSplitText>
                </div>

                <div>
                    <FSplitText
                        className="text-2xl sm:text-4xl text-color_E font-font_A text-center font-bold"
                        variants={text}
                    >
                        Я ТАЛГАТ,
                    </FSplitText>
                </div>

                <div>
                    <FSplitText
                        className="text-2xl sm:text-4xl text-color_E font-font_A text-center"
                        variants={text}
                    >
                        И Я ПРОГРАММИСТ
                    </FSplitText>
                </div>

            </div>

        </div >
    );
};