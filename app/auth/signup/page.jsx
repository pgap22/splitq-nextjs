import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export default function SignUp() {
    return (
        <>
            <div className='flex flex-col gap-4'>
                <h1 className='font-bold text-2xl '>Crear Cuenta</h1>
                <p className='text-gray-400'>Crea una nueva cuenta en SplitQ</p>
                <div  className="flex flex-col w-full">
                    <label>Nombre</label>
                    <Input placeholder={"Nombre"} type={"text"} />
                </div>
                <div  className="flex flex-col w-full">
                    <label>Apellido</label>
                    <Input placeholder={"Apellido"} type={"text"} />
                </div>
                <div  className="flex flex-col w-full">
                    <label>Email</label>
                    <Input placeholder={"Email"} type={"email"} />
                </div>
                <div  className="flex flex-col w-full">
                    <label>Contraseña</label>
                    <Input placeholder={"Contraseña"} type={"Password"} />
                </div>
                <Button className="font-bold">Crear cuenta</Button>
            </div>


        </>
    )
}