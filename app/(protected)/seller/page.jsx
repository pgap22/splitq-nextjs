import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/home/SettingButtonUser";
import IconBox from "@/components/ui/IconBox";
import { Button } from "@/components/ui/button";
import { authUser } from "@/lib/authUser";
import Link from "next/link";
import { use } from "react";
import { MdFastfood, MdFoodBank, MdLocalPizza } from "react-icons/md";


export default async function SellerHome() {
    const user = await authUser()
    return (
        <>
            <div className="flex flex-row justify-between p-4">
                <Logo />
                <SettingButtonUser user={user} />
            </div>

            <div>
                <h1 className="text-2xl font-bold flex gap-1 p-3">Bienvenido
                    <p className="text-gradient bg-gradient-principal">
                        {user.name}
                    </p>
                    <p>
                        👋
                    </p>
                </h1>
            </div>

            <div className="flex flex-col p-4 gap-4">
                <h1 className="font-bold text-lg">Escanear Qr</h1>

                <Button>Escanear</Button>

                <h1 className="font-bold text-lg">Productos</h1>

                <div>

                    <Link href={"/seller/createProduct"}>
                        <div className=" border-t border-b border-border p-4">

                            <div className="flex flex-row items-center gap-4">

                                <IconBox Icon={MdLocalPizza} />

                                <h1>Agregar un producto</h1>

                            </div>

                        </div>
                    </Link>

                    <div className="border-b border-border p-4">

                        <div className="flex flex-row items-center gap-4">

                            <IconBox Icon={MdFastfood} />

                            <h1>Crear un combo</h1>

                        </div>

                    </div>

                    <div className="border-b border-border p-4">

                        <div className="flex flex-row items-center gap-4">

                            <IconBox Icon={MdFoodBank} />

                            <h1>Administrar mis productos</h1>

                        </div>

                    </div>

                </div>

                <h1 className="text-lg font-bold">Ventas</h1>

                <div className="border border-border bg-foreground font-bold rounded-lg">

                    <div className="flex flex-row p-2">

                        <p className="text-xs">Total de tikets vendidos: <span className="text-gradient bg-gradient-principal">0</span> </p>

                    </div>

                    <div className="flex flex-row p-2">

                        <p className="text-xs">Producto mas vendido: <span className="text-gradient bg-gradient-principal">Chory</span> </p>

                    </div>

                    <div className="flex flex-row p-2">

                        <p className="text-xs">Combo mas vendido: <span className="text-gradient bg-gradient-principal">Chory + Soda</span> </p>

                    </div>

                </div>

            </div>
        </>
    )
}