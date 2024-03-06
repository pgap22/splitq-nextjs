import { cn } from "@/lib/utils"

function Border({ children,className, title, icon = false }) {

    return (
        <div className={cn("border-border text-[#949191] text-sm border rounded-xl flex flex-col p-4 gap-2", className)}>
            {
                icon && <div className="flex text-white items-center font-bold gap-2">
                    {children[0]}
                    <h3 className="text-lg">{title}</h3>
                </div>
            }
            {icon ? children.filter((_, i) => i !== 0) : children}
        </div>
    )

}

export default Border