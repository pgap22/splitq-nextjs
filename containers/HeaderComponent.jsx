"use client"
import { useState } from 'react';
import { MdMenu, MdOutlineClose } from "react-icons/md"
import { Logo } from '../components/Logo';
import { cn } from '@/lib/utils';
import { animated, useTransition } from '@react-spring/web'
import { Button } from '../components/ui/button';
import Link from 'next/link';
import ContainerCenter from './ContainerCenter';
import ThemeToggle from '../components/buttons/theme-toggle';

function HeaderComponent() {
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
                <ContainerCenter className={"max-w-5xl"}>
                    <div className='justify-between w-full items-center flex'>
                        <Logo />
                        <div className='flex gap-2 items-center'>
                            <ThemeToggle />
                            <MdMenu className='md:hidden' onClick={toggleView} size={24} />
                            <div className='hidden md:flex gap-2'>
                                <Button asChild className="font-bold px-4 text-sm">
                                    <Link href={"/auth/login"}>
                                        Iniciar Sesion
                                    </Link>
                                </Button>

                                <Link href={"/auth/signup"} className=" px-4 bg-gradient-principal text-center bg-gradient font-bold text-sm p-2 rounded-md border-gradient border ">Crear Cuenta</Link>

                            </div>
                        </div>

                    </div>
                </ContainerCenter>
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
                    <Button asChild className="font-bold text-sm">
                        <Link href={"/auth/login"}>
                            Iniciar Sesion
                        </Link>
                    </Button>
                    <Link href={"/auth/signup"} className="bg-gradient-principal text-center bg-gradient font-bold text-sm p-2 rounded-md border-gradient border ">Crear Cuenta</Link>
                </div>
            </div>
        </animated.div>
    )
}

export default HeaderComponent;