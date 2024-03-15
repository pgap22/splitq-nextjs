"use client"
import Image from "next/image"

export const Logo = ({ width = 100 }) => {
    return (
        <>
            <Image
                className="md:max-w-[140px] md:w-full dark:hidden"
                width={width}
                height={48.8}
                src="/logo.svg"
                alt="Logo SplitQ" />
            <Image
                className="md:max-w-[140px] md:w-full hidden dark:block"
                width={width}
                height={48.8}
                src="/logo_dark.svg"
                alt="Logo SplitQ" />
        </>
    )
}