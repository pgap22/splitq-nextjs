import { Logo } from "@/components/Logo"
import Link from "next/link"


const FormLayout = ({ children }) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center mt-6'>
                <Link href={"/"}>
                    <Logo width={120} />
                </Link>
            </div>
            <div className='p-4 md:max-w-lg mx-auto'>
                <div className='flex flex-col p-5 bg-foreground rounded-lg border-border border'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default FormLayout