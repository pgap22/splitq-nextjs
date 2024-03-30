"use client"
import Image from "next/image"

export const Logo = ({ width = 100 }) => {
    return (
        <>
            <Image
                className="dark:hidden"
                width={width}
                height={38}
                src="/logo.svg"
                alt="Logo SplitQ" />
            <Image
                className="hidden dark:block"
                width={width}
                height={38}
                src="/logo_dark.svg"
                alt="Logo SplitQ" />
        </>
    )
}