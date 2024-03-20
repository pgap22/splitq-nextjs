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
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import FormAddProduct from "@/components/form/FormAddProduct";

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
            <FormAddProduct></FormAddProduct>
        </>
    )
}