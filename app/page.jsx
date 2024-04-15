import HeaderComponent from "@/containers/HeaderComponent"
import Border from "@/components/ui/Border"
import Image from "next/image";
import { MdOutlineAccountBalanceWallet, MdOutlineCheckCircle, MdOutlineLocalMall, MdPersonAddAlt1 } from "react-icons/md"
import { Button } from "@/components/ui/button"
import IconBox from "@/components/ui/IconBox"
import Link from "next/link";
import ContainerCenter from "@/containers/ContainerCenter";


function UserIndex() {

  return (
    <>
      <HeaderComponent />
      <ContainerCenter className={"max-w-fit"}>
        <h1 className="capitalize font-black text-center md:text-6xl text-2xl">Recarga, Compra y <span className="text-gradient bg-gradient-principal">Disfruta</span></h1>

        <p className="p-2 text-center text-text-secundary text-base">Descubre una nueva manera de comprar con SplitQ - Una novedosa logistica que facilita tus compras</p>

        <div className="flex justify-center mb-8">
          <Link href={"/auth/signup"} className="px-12 py-2 font-black border rounded-md border-gradient w-fit">Empieza Ya!</Link>
        </div>

        <h2 className="capitalize font-black text-center md:text-6xl text-2xl">Pasos para usar <span className="text-gradient bg-gradient-principal">SplitQ</span></h2>
        <section className="flex flex-col px-4 gap-8 mt-6 mb-6">
          <Border icon title={"Crear una cuenta"}>
            <IconBox Icon={MdPersonAddAlt1} />
            <p>Primero necesitaras una cuenta para usar SplitQ</p>
            <p>Rellena los datos que te solicitamos para crear tu cuenta, esta te servira para ingresar a nuestra plataforma</p>
            <Button asChild className="font-bold">
              <Link href={"/auth/signup"}>
                Crear Cuenta
              </Link>
            </Button>

          </Border>

          <Border icon title={"Recarga de saldo"}>
            <IconBox Icon={MdOutlineAccountBalanceWallet} />
            <p>Necesitas ir al Punto de Recarga para depositar el saldo que deseas</p>
            <p>Luego necesitaras mostrar tu QR</p>
            <p>Tu cuenta contara con QR que servira como tu tarjeta virtual</p>
          </Border>

          <Border icon title={"Compra"}>
            <IconBox Icon={MdOutlineLocalMall} />
            <p>Busca el producto que quieras comprar y añadelo al carrito</p>
            <p>Tendras el total a pagar en tu carrito y pasaras al pago</p>
          </Border>
          <Border icon title={"Recoge tu producto"}>
            <IconBox Icon={MdOutlineCheckCircle} />
            <p>Despues de cada compra recibiras un ticket</p>
            <p>Este tendra un QR para que el vendedor pueda escanear tu ticket y darte tu producto</p>
          </Border>
        </section>

        {/* <section className="mt-4 px-4">
        <h2 className="text-center font-black text-gradient bg-aqua-gradient mb-2 text-3xl">QRewards</h2>
        <div className="border-4 rounded-lg p-4 text-center border-aqua-gradient">
          <h3 className="text-xl font-bold">Consigue articulos utilizando <span className="text-gradient font-black bg-aqua-gradient">QRewards</span></h3>
          <Border className={"bg-foreground !rounded p-1"}>
            <h3 className="text-gradient bg-blue-gradient font-black text-xl">PgapCoins</h3>
          </Border>
        </div>
      </section> */}
      </ContainerCenter>
    </>
  )
}



export default UserIndex
