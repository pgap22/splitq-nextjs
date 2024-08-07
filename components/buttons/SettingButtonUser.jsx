"use client";
import { MdOutlineLogout, MdOutlineSettings } from "react-icons/md";
import IconBox from "../ui/IconBox";
import { Button } from "../ui/button";
import { useTransition, animated } from "@react-spring/web";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import Link from "next/link";

export default function SettingButtonUser({ user, logout }) {
  const [menuSetting, setMenuSetting] = useState(false);
  const [bgMenu, setbgMenu] = useState(false);

  const bgTransition = useTransition(bgMenu, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 50 },
  });

  const transitionsMenu = useTransition(menuSetting, {
    from: { translateX: "100%" },
    enter: { translateX: "0%" },
    leave: { translateX: "100%" },
    config: { duration: 120 },
  });

  const toggleView = () => {
    setMenuSetting(!menuSetting);
    setbgMenu(!bgMenu);
  };

  return (
    <>
      <div onClick={toggleView}>
        <IconBox variant={"square"} Icon={MdOutlineSettings} />
      </div>

      {bgTransition((style, item) =>
        item ? (
          <animated.div
            style={style}
            className="fixed inset-0  min-h-[100dvh] bg-black bg-opacity-30 backdrop-blur-sm z-10"
          >
            {transitionsMenu((style, item) =>
              item ? (
                <SideMenu
                  user={user}
                  logout={logout}
                  close={toggleView}
                  style={style}
                />
              ) : (
                ""
              )
            )}
          </animated.div>
        ) : (
          ""
        )
      )}
    </>
  );
}

function SideMenu({ style, user, close, logout }) {
  const ref = useRef();
  useOnClickOutside(ref, close);
  return (
    <animated.div
      ref={ref}
      style={style}
      className="text-right overflow-scroll bg-foreground border-l border-border max-h-[100svh] h-screen absolute right-0 grid grid-rows-[min-content_1fr]"
    >
      <div className="">
        <h2 className="font-bold p-4 text-xl">
          {user.name} {user.lastname}
        </h2>
        <div>
          <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">
            Cuenta
          </h3>
          <Link href={"/home/settings"}>
            <div className="border-t border-border border-b p-4">
              <p className="font-bold">Configuracion de cuenta</p>
            </div>
          </Link>
        </div>

        <div>
          <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">
            Historial
          </h3>
          <Link href={"/home/history"}>
            <div className="border-t border-border border-b p-4">
              <p className="font-bold">Historial de acciones</p>
            </div>
          </Link>
          <Link href={"/home/orders"}>
            <div className="border-border border-b p-4">
              <p className="font-bold">Ordenes / Facturas</p>
            </div>
          </Link>
        </div>

        <div>
          <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">
            Rembolsos
          </h3>
          <Link href={"/home/create-refound"}>
            <div className="border-t border-border border-b p-4">
              <p className="font-bold">Crear Rembolsos</p>
            </div>
          </Link>
          <Link href={"/home/my-refounds"}>
            <div className="border-border border-b p-4">
              <p className="font-bold">Mis Rembolsos</p>
            </div>
          </Link>
        </div>

        <div>
          <h3 className="text-text-secundary p-4 pb-2 font-bold text-lg">
            SplitPay
          </h3>
          <Link href={"/home/splitpay"}>
            <div className="border-t border-border border-b p-4">
              <p className="font-bold">Conectarse a SplitPay</p>
            </div>
          </Link>
        </div>
      </div>

      <form className="p-4 grid items-end" action={logout}>
        <Button className="w-full flex items-center gap-2">
          <MdOutlineLogout size={20} />
          <p>Cerrar Sesion</p>
        </Button>
      </form>
    </animated.div>
  );
}
