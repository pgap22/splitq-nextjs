import { cn } from "@/lib/utils";

//need to add a max width
export default function ContainerCenter({children, className}) {
    return(
        <div className="flex justify-center">
            <div className={cn("w-full", className)}>{children}</div>
        </div>
    )
}