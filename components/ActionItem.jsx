"use client"
import { multiplyDecimal } from "@/lib/decimal";
import clsx from "clsx";
import dayjs from "dayjs";
import { MdOutlineArrowDropDownCircle } from "react-icons/md";
import { useToggle } from "usehooks-ts";

export default function ActionItem({ action }) {
    const [show, toggleShow] = useToggle(false);
    console.log(action)
    return (
        <div onClick={toggleShow} className="border-b cursor-pointer last:border-none p-4 border-border">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <ActionIcon type={action.type} />
                    <div className="flex sm:items-center md:gap-2 sm:flex-row flex-col">
                        <ActionTitle action={action} type={action.type} />
                        <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
                            {dayjs(action.date).format("hh:mm:ss A")}
                        </div>
                    </div>
                </div>
                <MdOutlineArrowDropDownCircle size={24} />
            </div>
            {show && <ActionValue action={action} />}
        </div>
    )
}


const ActionIcon = ({ type }) => {

    return (
        <div className={clsx("w-4 aspect-square rounded-full",
            type == "recharge" && "bg-green-500",
            type == "purchase" && "bg-blue-500",
            type == "refound" && "bg-yellow-500",
            type == "ticket" && "bg-sky-200"
        )}>
        </div>
    )
}

const ActionTitle = ({ type, action }) => {
    const refoundMap = {
        accepted: "Rembolso aceptado",
        denied: "Rembolso denegado",
        created: "Solicitud de rembolso",
        canceled: "Rembolso cancelado"
    }
    const titleMap = {
        recharge: "Recarga",
        purchase: "Compra",
        refound: refoundMap[action.status],
        ticket: "Canjeo",
    };
    return (
        <p className="font-bold text-lg">
            {titleMap[type] ? titleMap[type] : type}
        </p>
    );
};

const ActionValue = ({ action }) => {
    const { type, value } = action;
    if (type == "recharge" || type == "refound")
        return (
            <>
                {
                    type == "refound" && (
                        <div>
                            {action.status == "accepted" && <p>Saldo Rembolsado: <span className="text-red-500 font-bold">${value}</span></p>}
                            {action.status == "denied" && <p>Saldo Recuperado: <span className="text-green-500 font-bold">${value}</span></p>}
                            {action.status == "created" && <p>Saldo a Rembolsar: <span className="text-yellow-500 font-bold">${value}</span></p>}
                            {action.status == "canceled" && <p>Saldo a Recuperado: <span className="text-yellow-500 font-bold">${value}</span></p>}
                        </div>
                    )
                }
                {
                    type == "recharge" && <p>Saldo Agregado: <span className="text-green-500 font-bold">${value}</span></p>
                }
            </>
        );
    if (type == "purchase" || type == "ticket")
        return (
            <div>
                <p>
                    Producto: <span className="text-blue-300">{value.name}</span>
                </p>
                {
                    type == "purchase" && <p>Precio Individual: <span className="text-yellow-500 font-bold">${value.price}</span></p>
                }
                <p>
                    Cantidad: <span className="text-blue-300">{action.quantity}</span>
                </p>

                {
                    type == "purchase" && <p>Total: <span className="text-red-500 font-bold">${multiplyDecimal(value.price, action.quantity)}</span></p>
                }
            </div>
        );
};
