import { signOut } from "@/auth";
import { Logo } from "@/components/Logo";
import SellerQRScanner from "@/components/buttons/SellerQrScanner";
import IconBox from "@/components/ui/IconBox";
import SettingButton from "@/components/buttons/setting-button";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { authUser } from "@/lib/authUser";
import Link from "next/link";
import { MdOutlineFastfood, MdOutlineFoodBank, MdOutlineLocalPizza } from "react-icons/md";
import { getSellerStats } from "@/actions/getSellerStats";
import { Button } from "@/components/ui/button";
import SellerStats from "@/components/SellerStats";
import { data } from "autoprefixer";

export default async function SellerHome() {
    const user = await authUser()
    // const combos = await getCombos();
    //ya pero y richard?
    //Por veces no agarraba el logout asiq esto lo solucionaxd
    async function logout() {
        "use server"
        await signOut();
    }

    const { totalTickets, totalSales, mostSoldProductName, mostSoldComboName } = await getSellerStats();

    return (
        <>
            <div className="flex flex-row justify-between p-4">
                <Logo />
                <div className="flex gap-2 items-center">
                    <ThemeToggle />
                    <SettingButton logout={logout} user={user}>
                        <div>
                            <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">Historial</h3>
                            <Link href={"seller/stats"}>
                                <div className="border-t border-border border-b p-4">
                                    <p className="font-bold">Estadisticas</p>
                                </div>
                            </Link>
                        </div>
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

                    <Link href={"/seller/createCombo"}>
                        <div className="border-b border-border p-4">
                            <div className="flex flex-row items-center gap-4">
                                <IconBox Icon={MdOutlineFastfood} />
                                <h1>Crear un combo</h1>
                            </div>
                        </div>
                    </Link>

                    <Link href={"/seller/manageProducts"}>
                        <div className="border-b border-border p-4">
                            <div className="flex flex-row items-center gap-4">
                                <IconBox Icon={MdOutlineFoodBank} />
                                <h1>Administrar mis productos</h1>
                            </div>
                        </div>
                    </Link>
                </div>
                <h2 className="font-bold px-4 text-lg">Estadisticas</h2>
                <div className="flex flex-col p-4 gap-4">
                    <SellerStats
                        title={"Tickets Vendidos"}
                        data={totalTickets}
                    />
                    <SellerStats
                        title={"Ganancias Totales"}
                        data={totalSales.toFixed(2)}
                    />
                    <SellerStats
                        title={"Producto mas Vendido"}
                        data={mostSoldProductName}
                    />
                    <SellerStats
                        title={"Combo mas Vendido"}
                        data={mostSoldComboName}
                    />
                </div>
                <div className="p-4">
                    <Button className="w-full" asChild><Link href={"seller/stats"}>Más Detalles</Link></Button>
                </div>
            </div>
        </>
    )
}