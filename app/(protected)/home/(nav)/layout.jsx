import { MdOutlineCreditCard } from "react-icons/md";


export default async function NavLayout({ children }) {

    return (
        <>
            {children}
            <div className="fixed bottom-0 justify-items-center nav w-full grid grid-cols-4 py-4">
                <MdOutlineCreditCard size={26} />
                <MdOutlineCreditCard size={26} />
                <MdOutlineCreditCard size={26} />
                <MdOutlineCreditCard size={26} />
            </div>
        </>
    )
}