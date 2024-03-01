"use client"
import HeaderComponent from "@/components/index/HeaderComponent";
import TituloColor from "@/components/index/TituloColor"
import ButtonComponent from "@/components/index/buttonComponent"
import MainBox from "@/components/index/MainBox"
import Texto from "@/components/index/Texto"
import TituloBox from "@/components/index/TituloBox"

import { useTheme } from "@/components/theme-provider"
import Image from "next/image";

import { MdOutlineAccountBalanceWallet, MdPersonAddAlt } from "react-icons/md"


function UserIndex() {

  const {setTheme} = useTheme()
  setTheme('light')
  
  return (
    <div>
      <HeaderComponent/>
      <TituloColor texto={"Recarga, Compra y disfruta"}/>

      <p className=" font-black p-2 text-center text-[#828282] text-base">Descubre una nueva manera de comprar con SplitQ - Una novedosa logistica que facilita tus compras</p>
      
      <div className="flex justify-center mb-8"> 
          <button className="border border-gradient rounded-md w-fit font-black px-12 py-2">Empieza Ya!</button>
      </div>

      <TituloColor texto={"Pasos para usar SplitQ"}/>      
      <div className=" w-screen flex flex-col justify-center items-center mt-8 gap-8">
      <MainBox>
        
        <TituloBox texto={"Crear una cuenta"} imagen={<MdPersonAddAlt/>}/>
        <Texto texto={"Primero necesitaras una cuenta para usar SplitQ"}/>
        <Texto texto={"Rellena los datos que te solicitamos para crear tu cuenta, esta te servira para ingresar a nuestra plataforma"}/>
        <ButtonComponent texto={"Crea tu cuenta"}/>
      </MainBox>

      <MainBox>
        
        <TituloBox texto={"Recarga de saldo"} imagen={<MdOutlineAccountBalanceWallet/>}/>
        <Texto texto={"Necesitas ir al Punto de Recarga para depositar el saldo que deseas"}/>
        <Texto texto={"Luego necesitaras mostrar tu QR"}/>

        <div className="flex gap-2 items-center">
        <Image width={220} height={300} src="/imgPrueba.jpg" className=" max-w-full rounded-2xl"/>
        <Texto texto={"Tu cuenta contara con QR que servira como tu tarjeta virtual"}/>
        </div>
      </MainBox>
      </div>


    </div>
  )
}



export default UserIndex
