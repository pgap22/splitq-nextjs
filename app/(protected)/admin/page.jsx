import { logout } from "@/actions/logout";
import { Logo } from "@/components/Logo";
import IconBox from "@/components/ui/IconBox";
import { authUser } from "@/lib/authUser";
import { Settings } from "lucide-react";
import { MdOutline10K, MdOutlineSettings, MdOutlineStorefront, MdOutlineVerifiedUser } from "react-icons/md";


export default async function Home() {
    const user = await authUser();

    return (
        <div>
            {/* <p>Home Admin ! {user.name}</p> */}
            <div className="flex justify-between items-center p-4">
                {/* <Logo
                    width={150}
                /> */}
                <h1 className="text-3xl font-bold">Bienvenido al panel de administracion</h1>
                <IconBox
                    Icon={MdOutlineSettings}
                />
            </div>

            <div>
                <p className="text-xl font-bold text-text-secundary p-4">Vendedores</p>
                <div>
                    <ActionLayout
                        description={"Crear vendedores"}
                    >
                        <IconBox
                            Icon={MdOutlineStorefront}
                        />
                    </ActionLayout>
                    <ActionLayout
                        description={"Administrar vendedores"}
                    >
                        <IconBox
                            Icon={MdOutlineStorefront}
                        />
                    </ActionLayout>
                </div>
            </div>

            <div className="mt-8">
                <p className="text-xl font-bold text-text-secundary p-4">Categoria</p>
                <div>
                    <ActionLayout
                        description={"Crear categoria"}
                    >
                        <IconBox
                            Icon={MdOutlineStorefront}
                        />
                    </ActionLayout>
                    <ActionLayout
                        description={"Administrar categorias"}
                    >
                        <IconBox
                            Icon={MdOutlineStorefront}
                        />
                    </ActionLayout>
                </div>
            </div>

            {/* <form action={logout}>
                <button>Cerrar sesion</button>
            </form> */}
        </div>
    )
}

const ActionLayout = ({ children, description }) => {
    return (
        <section className="flex items-center first:border-t gap-3 p-4 border-b border-border">
            {children}
            <p className="text-md font-bold">{description}</p>
        </section>
    )
}

const FloatingMenu = ({style, close}) =>{
    return(
        <div>
            
        </div>
    )
}