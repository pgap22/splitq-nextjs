import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";

export default async function LoginPage() {
    return (
        <div className='flex flex-col gap-4'>
            <h1 className='font-bold text-2xl text-center'>Iniciar Sesion</h1>
            <p className='text-text-secundary text-center'>Accede a nuestra plataforma</p>
            <div  className="flex flex-col w-full">
                <label className='font-normal'>Email</label>
                <Input
                    placeholder={"Email"}
                    name={"email"}
                    type={"email"}
                />
            </div>
            <div className="flex flex-col w-full">
                <label className='font-normal'>Contraseña</label>
                <Input
                    placeholder={"Contraseña"}
                    name={"password"}
                    type={"password"}
                />
            </div>
            <p className='text-text-secundary text-sm underline'>Olvidaste tu contraseña?</p>
            {/* <button className='p-3 bg-action-bg-button text-action-text-button rounded-md font-bold'>Iniciar Sesion</button> */}
            <Button className="font-bold">Iniciar Sesion</Button>
        </div>
    )
}

