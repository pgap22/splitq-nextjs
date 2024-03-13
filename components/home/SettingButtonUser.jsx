"use client"
import { MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import IconBox from "../ui/IconBox";
import { logout } from "@/actions/logout";
import { Button } from "../ui/button";

export default function SettingButtonUser({ user }) {
    return (
        <>
            <IconBox variant={"square"} Icon={MdOutlineSettings} />


            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10">
                <div className="text-right overflow-scroll bg-foreground border-l border-border max-h-[100svh] h-screen absolute right-0 grid grid-rows-[min-content_1fr]">


                    <div className="">
                        <h2 className="font-bold p-4 text-xl">{user.name} {user.lastname}</h2>
                        <div>
                            <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">Cuenta</h3>
                            <div className="border-t border-border border-b p-4">
                                <p className="font-bold">Configuracion de cuenta</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">Historial</h3>
                            <div className="border-t border-border border-b p-4">
                                <p className="font-bold">Historial de acciones</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">Rembolsos</h3>
                            <div className="border-t border-border border-b p-4">
                                <p className="font-bold">Crear Rembolsos</p>
                            </div>
                            <div className="border-border border-b p-4">
                                <p className="font-bold">Mis Rembolsos</p>
                            </div>
                        </div>


                    </div>


                    <form className="p-4 grid items-end" action={logout}>
                        <Button className="w-full flex items-center gap-2">
                            <MdOutlineLogout size={20} />
                            <p>Cerrar Sesion</p>
                        </Button>
                    </form>


                </div>
            </div>
        </>
    )
}