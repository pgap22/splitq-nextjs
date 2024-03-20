import { cn } from "@/lib/utils"
import { Textarea } from "../ui/textarea"

function FormTextArea({
    label,
    placeholder,
    error,
    register
}) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col-reverse">
                <Textarea required className={cn("!bg-background !text-md !border !border-border valid:border-blue-500 transition-all", error && "!border-red-500 !placeholder-red-500",)} placeholder={placeholder} {...register} />
                <label className={cn(error && "!text-red-500", "label-valid")}>{label}</label>
            </div>
            <p className={cn("text-red-500 mt-1 text-xs", error && "border-red-500")}>{error}</p>
        </div>
    )
}
export default FormTextArea