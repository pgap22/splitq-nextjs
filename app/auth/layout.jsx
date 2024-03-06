import { Logo } from "@/components/Logo"
import Link from "next/link"


const FormLayout = ({ children }) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center mt-10'>
                <Link href={"/"}>
                    <Logo width={150} />
                </Link>
            </div>
            <div className='p-6 md:max-w-lg mx-auto'>
                <div className='flex flex-col p-5 bg-foreground rounded-lg border-border border'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default FormLayout