import IconBox from "@/components/ui/IconBox";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Prueba() {
    return (
        <div>
            <Link href={"../admin"}>
                <IconBox
                    Icon={MdArrowBack}
                />
            </Link>
            <h1 className="text-2xl mt-4 mb-8">Crear perfil</h1>
            <form className="gap-4 flex flex-col">
                <FormInput
                    placeholder={"Nombre del perfil"}
                    label={"Nombre del perfil"}
                    type={"text"}
                    error={""}
                    register={""}
                />
                <FormInput
                    placeholder={"Correo del perfil"}
                    label={"Correo del perfil"}
                    type={"email"}
                    error={""}
                    register={""}
                />
                <FormInput
                    placeholder={"Contraseña del perfil"}
                    label={"Contraseña del perfil"}
                    type={"password"}
                    error={""}
                    register={""}
                />
                <Button>Crear perfil</Button>
            </form>
        </div>
    )
}