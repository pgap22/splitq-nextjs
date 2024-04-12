import { getBalance } from "@/actions/getBalance";
import { signOut } from "@/auth";
import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/buttons/SettingButtonUser";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { authUser } from "@/lib/authUser";
import { MdFastfood, MdIcecream, MdLandscape, MdOutlineFastfood, MdOutlineLandscape, MdOutlineLocalCafe, MdOutlineLocalOffer, MdOutlineLunchDining, MdOutlineSportsBar } from "react-icons/md";
import { getProducts } from "@/actions/getProducts";
import utils from "util"

export default async function Home() {
    const user = await authUser();
    const product = await getProducts();
    console.log(utils.inspect(product, {depth: null}))
    const balance = await getBalance();
    //Por veces no agarraba el logout asiq esto lo solucionaxd
    async function logout() {
        "use server"
        await signOut();
    }
    return (
        <>
            <div className="flex justify-between items-center">
                <Logo />
                <div className="flex gap-2 items-center">
                    <ThemeToggle size={22} />
                    <SettingButtonUser logout={logout} user={user} />
                </div>
            </div>
            <section className="mt-6">
                <div className="bg-foreground border-border border rounded p-4">
                    <h1 className="font-bold text-2xl" >Tu saldo: <span className="font-bold text-gradient-principal text-gradient bg-gradient-principal">${+balance}</span></h1>
                    <p className="text-text-secundary text-md">Tu saldo actual para comprar productos dentro de <span className="font-bold text-gradient-principal text-gradient bg-gradient-principal">SplitQ</span></p>
                </div>
            </section>
            <div className="mt-4">
                <h1 className="text-2xl font-bold">Que deseas comprar Hoy ?</h1>
                <div className="flex flex-row mt-4 justify-between gap-4 font-bold">
                    <div className="flex flex-col items-center justify-center rounded border border-border bg-foreground p-4 w-full">
                        <div className="rounded-full border bg-background border-border w-fit p-3">
                            <MdOutlineFastfood
                                size={30}
                            />
                        </div>
                        <h1>Combos</h1>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col items-center justify-center rounded border border-border bg-foreground p-4">
                            <div className="rounded-full border bg-background border-border w-fit p-3">
                                <MdOutlineLunchDining
                                    size={30}
                                />
                            </div>
                            <h1>Platos Fuertes</h1>
                        </div>
                        <div className="flex flex-row gap-4 mt-3">
                            <div className="flex flex-col items-center justify-center rounded border border-border bg-foreground p-4 ">
                                <div className="rounded-full border bg-background border-border w-fit p-3">
                                    <MdIcecream
                                        size={30}
                                    />
                                </div>
                                <h1>Postres</h1>
                            </div>
                            <div className="flex flex-col items-center justify-center rounded border border-border bg-foreground p-4 ">
                                <div className="rounded-full border bg-background border-border w-fit p-3">
                                    <MdOutlineSportsBar
                                        size={30}
                                    />
                                </div>
                                <h1>Antojitos</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <h1>Favoritos de la comunidad</h1>
                <div className="flex overflow-auto">
                    {
                        product.map(item => <ProductCard product={item}/>)
                    }
                </div>
            </div>
        </>
    )
}
const ProductCard = ({product}) =>{
    return(
        <div className="min-w-48 p-4">
            <div className=" items-center border-border border rounded bg-foreground ">

            {product.images.length ? <img className="w-full h-40 object-cover rounded border border-border" src={product.images[0].url} />
            : <div className="h-40 flex items-center justify-center">
                <MdOutlineLocalOffer size={50}/>
                </div>}
            <div className="mt-4 p-4">
                <h2>aedpakopfaeo</h2>
            </div>
            </div>
            <p>{product.name}</p>
        </div>
    )
}