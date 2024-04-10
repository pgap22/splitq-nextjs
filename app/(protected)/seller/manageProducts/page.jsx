import { getProducts } from "@/actions/getProducts";
import IconBox from "@/components/ui/IconBox";
import Input from "@/components/ui/Input";
import { MdOutlineArrowBack, MdOutlineFastfood, MdOutlineLocalOffer, MdOutlineLocalPizza } from "react-icons/md";

export default async function ManageProduct() {
    const productos = await getProducts();
    console.log(productos);
    return (
        <main>
            <section className="p-4 grid grid-cols-[max-content_1fr] gap-2">
                <IconBox
                    variant="square"
                    Icon={MdOutlineArrowBack}
                />
                <Input type="search" placeholder="Buscar producto" />
            </section>
            <h1 className="font-bold text-2xl p-4">Mis Productos</h1>
            <div className="grid grid-cols-2 border-b border-border mb-4">
                <div className="flex justify-center ">
                    <div className="w-fit flex flex-col items-center">
                        <MdOutlineLocalPizza size={24} />
                        <p className="font-bold">Producto</p>
                        <div className="-mb-0.5 h-1 w-[120%] rounded-full bg-text"></div>
                    </div>
                </div>
                <div className="text-text-secundary flex justify-center">
                    <div className="w-fit flex flex-col items-center">
                        <MdOutlineFastfood size={24} />
                        <p className="font-bold">Combos</p>
                        {/* <div className="-mb-0.5 h-2 w-[120%] rounded-full bg-text"></div> */}
                    </div>
                </div>
            </div>

            {
                productos.map(producto => (
                    <div className="border-b border-border">
                        <div className="flex items-start gap-4 p-4">
                            <div className="p-4 aspect-square rounded bg-foreground border border-border">
                                <MdOutlineLocalOffer size={24} />
                            </div>
                            <div>
                                <h2 className="font-bold">{producto.name}</h2>
                                <p className="text-xs text-text-secundary">{producto.seller.name}</p>
                                <h3 className="text-gradient text-lg font-black bg-gradient-principal">${producto.price}</h3>
                            </div>
                        </div>
                    </div>
                ))
            }
        </main>
    )
}