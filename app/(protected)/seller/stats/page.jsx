import { getSalesByProductAndCombo } from "@/actions/getSalesByProductAndCombo";
import SellerStats from "@/components/SellerStats";
import BackButton from "@/components/buttons/BackButton";

export default async function SalesPage() {
    const { productSales, comboSales } = await getSalesByProductAndCombo();
    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-2xl font-bold">Ventas Totales</h1>
            <section>
                <h2 className="text-lg">Ventas Totales por Producto</h2>
                <div className="flex flex-col gap-4 p-4">
                    {
                        Object.entries(productSales).map(([productName, quantity]) => (
                            <SellerStats
                                key={productName + quantity}
                                title={productName}
                                data={quantity}
                            />
                        ))
                    }
                </div>
            </section>
            <section>
                <h2 className="text-lg">Ventas Totales por Combo</h2>
                <div className="flex flex-col gap-4 p-4">
                    {Object.entries(comboSales).map(([comboName, quantity]) => (
                        <SellerStats
                            key={comboName + quantity}
                            title={comboName}
                            data={quantity}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

