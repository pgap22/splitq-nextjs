import { Logo } from "@/components/Logo"


const FormLayout = ({children}) => {
    return (
        <>
            <div className='flex flex-col justify-center items-center mt-10'>
                <Logo width={150} />
            </div>
            <div className='p-6'>
                <div className='flex flex-col p-5 bg-foreground rounded-lg border-border border'>
                    {children}
                </div>
            </div>
        </>
    )
}

export default FormLayout