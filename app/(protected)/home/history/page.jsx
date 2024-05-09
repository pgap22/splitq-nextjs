import { getHistoryByUserId } from "@/actions/getHistoryByUserId";
import BackButton from "@/components/buttons/BackButton";
import { authUser } from "@/lib/authUser";
import showEsDate from "@/lib/showEsDate";
import dayjs from "dayjs";

export default async function HistoryPage() {
  const { id } = await authUser();
  const history = await getHistoryByUserId(id);
  console.log(history);
  return (
    <>
      <main>
        <div className="p-4">
          <BackButton href={"/home"} />
          <h1 className="font-bold my-4 text-2xl">Historial de Acciones</h1>
        </div>
        {history.map((day) => (
          <div>
            <p className="font-bold px-4 mt-4 pb-0 text-text-secundary capitalize text-lg">
              {showEsDate(day.date, false)}
            </p>
            {day.actions.map((action) => (
              <div className="border-b p-4 border-border">
                <ActionTitle type={action.type} />
                <div className="border text-text-secundary w-fit my-1 border-border text-xs p-1 rounded bg-foreground">
                  {dayjs(action.date).format("hh:mm:ss A")}
                </div>
                <ActionValue action={action} />
              </div>
            ))}
          </div>
        ))}
      </main>
    </>
  );
}

const ActionTitle = ({ type }) => {
  const titleMap = {
    recharge: "Recarga",
    purchase: "Compra",
    refound: "Reembolso",
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
      <p className="font-bold text-gradient bg-gradient-principal">${value}</p>
    );
  if (type == "purchase" || type == "ticket")
    return (
      <div>
        <p>
          Producto: <span>{value.name}</span>
        </p>
        <p>
          Cantidad: <span>{action.quantity}</span>
        </p>
      </div>
    );
};
