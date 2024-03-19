import SettingButtonUser from "@/components/home/SettingButtonUser";
import IconBox from "@/components/ui/IconBox";
import SettingButton from "@/components/ui/setting-button";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { authUser } from "@/lib/authUser";
import { use } from "react";
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function AddProduct() {
    const user = await authUser()
    return (
        <>
            <div className="flex justify-between p-4">
                <Link href={"/seller"}>
                    <IconBox
                        Icon={MdArrowBack}
                    />
                </Link>
                <SettingButton user={user}>
                    <div>
                        <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">Historial</h3>
                        <div className="border-t border-border border-b p-4">
                            <p className="font-bold">Historial de acciones</p>
                        </div>
                    </div>
                </SettingButton>
            </div>
            <h1>Añadir producto</h1>
            <div>
                <FormInput
                    label={"Nombre del producto"}
                    placeholder={"Nombre del producto"}
                    type={"text"}
                />
                <FormTextArea
                    placeholder={"Escribe acá"}
                    label={"Descripcion del producto"}
                />
                <Select>
                {/* className={cn("!bg-background !text-text-secundary !border", formState.errors.role?.message ? "!border-red-500" : getValues("role") ? "!border-blue-500" : "!border-border")} */}
                    <SelectTrigger>
                        <SelectValue placeholder="Seleccione el rol" />
                    </SelectTrigger>
                    <SelectContent className="!bg-foreground">
                        <SelectGroup>
                            <SelectLabel>Rol</SelectLabel>
                            <SelectItem className="!bg-background" value="mod">Moderador</SelectItem>
                            <SelectItem className="!bg-background" value="seller">Vendedor</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}