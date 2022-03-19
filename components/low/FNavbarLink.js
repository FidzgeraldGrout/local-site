import React from 'react'
// 
const FNavbarLink = React.forwardRef(({ onClick, href, children }, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref}
            className='text-color_C hover:bg-color_C hover:text-color_G px-3 py-2 rounded-md text-sm font-bold font-font_B'
        >
            {children}
        </a>
    )
})

export default FNavbarLink;