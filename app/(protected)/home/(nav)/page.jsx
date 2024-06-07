import { getBalance } from "@/actions/getBalance";
import { signOut } from "@/auth";
import { Logo } from "@/components/Logo";
import SettingButtonUser from "@/components/buttons/SettingButtonUser";
import ThemeToggle from "@/components/buttons/theme-toggle";
import { authUser } from "@/lib/authUser";
import {
  MdOutlineFastfood,
  MdOutlineStore,
} from "react-icons/md";
import { getCategories } from "@/actions/categories";
import { getSellers } from "@/actions/getSellers";
import Link from "next/link";
import Balance from "@/components/realtime/Balance";

export default async function Home() {
  const user = await authUser();
  const categorie = await getCategories();
  const sellers = await getSellers();
  const balance = await getBalance();
  //Por veces no agarraba el logout asiq esto lo solucionaxd
  async function logout() {
    "use server";
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
        <Balance balance={balance} id={user.id} />
      </section>
      <h1 className="text-2xl mt-4 font-bold">Categorias</h1>
      <div className="flex mt-4 gap-4 overflow-auto">
        {categorie.map((item) => (
          <CategorieCard categorie={item} />
        ))}
      </div>
      <div className="mt-4">
        <h1 className="text-2xl font-bold">Favoritos de la comunidad</h1>
        <div className="flex-col gap-4">
          {sellers.map((item) => (
            <SellerCard seller={item} />
          ))}
        </div>
      </div>
    </>
  );
}
const SellerCard = ({ seller }) => {
  return (
    <Link href={"home/seller/" + seller.id}>
      <div className="min-w-48 mt-4">
        <div className="flex items-center border-border border rounded bg-foreground ">
          {/* {product.images.length ? <img className="w-20 h-20 object-cover rounded border border-border" src={product.images[0].url} />
                    : <div className="w-20 h-20 flex items-center justify-center">
                        <MdOutlineLocalOffer size={30} />
                    </div>} */}
          <div className="w-20 h-20 flex items-center justify-center">
            <MdOutlineStore size={30} />
          </div>
          <div className="p-2">
            <p className="font-bold">{seller.name}</p>
            {/* <h2 className="text-center ">{seller.email}</h2> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

const CategorieCard = ({ categorie }) => {
  return (
    <Link href={"/home/category/" + categorie.id}>
      <div className="flex gap-2 select-none items-center justify-center rounded border border-border bg-foreground p-4 ">
        <div className="rounded-full border w-fit bg-background border-border p-3">
          <MdOutlineFastfood size={24} />
        </div>
        <h1 className="min-w-max">{categorie.name}</h1>
      </div>
    </Link>
  );
};
