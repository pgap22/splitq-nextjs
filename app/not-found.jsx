import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdOutlineCloudOff } from "react-icons/md";


export default function ErrorBrosito() {

    return (
        <>
            <div className="flex flex-col min-h-screen items-center justify-center gap-2">
                <div className="flex items-center gap-4">
                    <MdOutlineCloudOff
                        size={40}
                    />
                    <h1 className="text-lg font-bold">Ups... Nada por aca :c</h1>
                </div>
                <Link href="/redirect">
                    <Button>
                        Regresar
                    </Button>
                </Link>
            </div>
        </>
    )
}