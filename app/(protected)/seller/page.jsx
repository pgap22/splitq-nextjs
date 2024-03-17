import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/home/SettingButtonUser";
import QrScannerButton from "@/components/qrScannerButton";
import SellerQRScanner from "@/components/seller/SellerQrScanner";
import IconBox from "@/components/ui/IconBox";
import { Button } from "@/components/ui/button";
import SettingButton from "@/components/ui/setting-button";
import ThemeToggle from "@/components/ui/theme-toggle";
import { authUser } from "@/lib/authUser";
import Link from "next/link";
import { MdOutlineFastfood, MdOutlineFoodBank, MdOutlineLocalPizza } from "react-icons/md";


export default async function SellerHome() {
    const user = await authUser()
    return (
        <>
            <div className="flex flex-row justify-between p-4">
                <Logo />
                <div className="flex gap-2 items-center">
                    <ThemeToggle />
                    <SettingButton user={user}>
                        pon aca lo q sea xd
                    </SettingButton>
                </div>
            </div>

            <div>
                <h1 className="text-2xl font-bold px-4">Bienvenido <br /> <span className="text-gradient bg-gradient-principal">{user.name}</span> 👋</h1>
            </div>

            <div className="p-4 flex flex-col mb-2 gap-2">
                <h2 className="font-bold text-lg">Escanear Qr</h2>
                <SellerQRScanner />
            </div>


            <div className="flex flex-col gap-4">

                <h2 className="font-bold px-4 text-lg">Productos</h2>


                <div>

                    <Link href={"/seller/createProduct"}>
                        <div className=" border-t border-b border-border p-4">
                            <div className="flex flex-row items-center gap-4">
                                <IconBox Icon={MdOutlineLocalPizza} />
                                <h1>Agregar un producto</h1>
                            </div>
                        </div>
                    </Link>

                    <div className="border-b border-border p-4">
                        <div className="flex flex-row items-center gap-4">
                            <IconBox Icon={MdOutlineFastfood} />
                            <h1>Crear un combo</h1>
                        </div>
                    </div>

                    <div className="border-b border-border p-4">
                        <div className="flex flex-row items-center gap-4">
                            <IconBox Icon={MdOutlineFoodBank} />
                            <h1>Administrar mis productos</h1>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-2">
                    <h2 className="text-lg mb-4 font-bold">Ventas</h2>
                    <div className="border border-border bg-foreground font-bold rounded-lg">
                        <div className="flex flex-row p-2">
                            <p className="text-xs">Total de tickets vendidos: <span className="text-gradient bg-gradient-principal">0</span> </p>
                        </div>
                        <div className="flex flex-row p-2">
                            <p className="text-xs">Producto mas vendido: <span className="text-gradient bg-gradient-principal">Chory</span> </p>
                        </div>
                        <div className="flex flex-row p-2">
                            <p className="text-xs">Combo mas vendido: <span className="text-gradient bg-gradient-principal">Chory + Soda</span> </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}