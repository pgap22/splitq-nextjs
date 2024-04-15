import { getBalance } from "@/actions/getBalance";
import { signOut } from "@/auth";
import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/buttons/SettingButtonUser";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { authUser } from "@/lib/authUser";
import { MdFastfood, MdIcecream, MdLandscape, MdOutlineFastfood, MdOutlineLandscape, MdOutlineLocalCafe, MdOutlineLocalOffer, MdOutlineLunchDining, MdOutlineSportsBar } from "react-icons/md";
import { getProducts } from "@/actions/getProducts";
import { getCategories } from "@/actions/categories";
import utils from "util"

export default async function Home() {
    const user = await authUser();
    const product = await getProducts();
    const categorie = await getCategories();
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
            <div className="flex mt-8 gap-4 overflow-auto">
                {
                    categorie.map(item => <CategorieCard categorie={item} />)
                }
            </div>
            <div className="mt-4">
                <h1 className="text-2xl font-bold">Favoritos de la comunidad</h1>
                <div className="flex-col gap-4">
                    {
                        product.map(item => <ProductCard product={item} />)
                    }
                </div>
            </div>
        </>
    )
}
const ProductCard = ({ product }) => {
    return (
        <div className="min-w-48 p-4">
            <div className="flex items-center border-border border rounded bg-foreground ">

                {product.images.length ? <img className="w-20 h-20 object-cover rounded border border-border" src={product.images[0].url} />
                    : <div className="h-20 flex items-center justify-center">
                        <MdOutlineLocalOffer size={30} />
                    </div>}
                <div className="mt-4 p-2">
                    <h2 className="text-center ">{product.description}</h2>
                    <p className="text-center font-bold">{product.name}</p>
                </div>
            </div>
        </div>
    )
}

const CategorieCard = ({ categorie }) => {
    return (
        <div className="flex gap-2 items-center justify-center rounded border border-border bg-foreground p-4 ">
            <div className="rounded-full border w-fit bg-background border-border p-3">
                <MdOutlineFastfood
                    size={30}
                />
            </div>
            <h1 className="min-w-max">{categorie.name}</h1>
        </div>
    )
}