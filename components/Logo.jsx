

import Image from "next/image"

export const Logo = ({width = 128}) => {

    return (
        <div>
            <Image className="dark:hidden" width={width} height={120} src="/logo.svg" alt="" />
            <Image className="hidden dark:block" width={width} height={120} src="/logo_dark.svg" alt="" />
        </div>
    )
}