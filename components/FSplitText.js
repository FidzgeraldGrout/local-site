import React from 'react'
import { motion } from 'framer-motion'

export function FSplitText({ children, ...rest }) {

    let words = children.split('')

    return words.map((word, i) => {
        return (
            <motion.span
                key={children + i}
                custom={i}
                {...rest}
            >
                {word + (i !== words.length - 1 ? '\u00A0' : '')}
            </motion.span>
        )
    })

}