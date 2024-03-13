"use client"
import { useState } from 'react';
import { logout } from "@/actions/logout";
import { MdLogout, MdMenu, MdOutlineClose, MdSettings } from "react-icons/md"
import { cn } from '@/lib/utils';
import { animated, useTransition } from '@react-spring/web'
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import SideContainer from '@/components/ui/SideContainer';

function HeaderAdmin() {
    const [viewComponent, setView] = useState(false)
    const transitions = useTransition(viewComponent, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: { duration: 150 }
    });

    function toggleView() {
        setView(!viewComponent)
    }



    return (
        <>
            <div className={cn(' sticky top-0 bg-background  p-4  md:mb-4')}>
                <SideContainer className={"max-w-5xl"}>
                    <div className='justify-between w-full items-center flex'>
                        <MdSettings className='md:hidden' onClick={toggleView} size={24} />
                        <div className='hidden md:flex gap-4'>
                            <div className='justify-center flex text-text-secundary'>
                                <Button>
                                    <form className='flex text-lg items-center gap-3' action={logout}>
                                        <MdLogout />
                                        <button>Cerrar sesion</button>
                                    </form>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SideContainer>
            </div>
            {transitions((style, item) => item ? <FloatingMenu close={toggleView} style={style} /> : "")}
        </>
    );
}

function FloatingMenu({ style, close }) {
    return (
        <animated.div style={style} className='fixed p-4 inset-0 bg-black bg-opacity-20 backdrop-blur-sm '>
            <div className="w-full rounded p-4 bg-foreground border-border border">
                <div className='flex justify-between items-center'>
                    <Logo width={100} />
                    <MdOutlineClose onClick={close} size={24} />
                </div>
                <div className='flex flex-col gap-2 mt-6'>
                    <AdminHeaderContent
                        description={"Cuenta"}
                        option={"Configuracion de la cuenta"}
                    />
                    <AdminHeaderContent
                        description={"Acciones"}
                        option={"Historial de Acciones"}
                    />
                    <div className='justify-center flex text-text-secundary'>
                        <Button>
                            <form className='flex text-lg items-center gap-3' action={logout}>
                                <MdLogout />
                                <button>Cerrar sesion</button>
                            </form>
                        </Button>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

const AdminHeaderContent = ({ description, option }) => {
    return (
        <div className='font-bold mb-5 flex flex-col text-text-secundary'>
            <div className='flex justify-end p-4'>
                <p className=' text-2xl'>{description}</p>
            </div>
            <div className='flex justify-center p-3 border-border border-b border-t'>
                <p className='text-lg text-text font-normal'>{option}</p>
            </div>
        </div>
    )
}

export default HeaderAdmin;