export default function SellerStats({data , title}) {
    return (
        <div className="flex-col items-center justify-center flex bg-foreground rounded p-4">
            <h2 className="font-bold text-lg text-text-secundary">{title}</h2>
            <p className="text-gradient bg-gradient-principal font-bold">{data}</p>
        </div>
    )
}