import { MdOutlineWarningAmber } from "react-icons/md"

function AlertWarning({ title, description }) {
    return (
        <div className="flex  items-center bg-yellow-bg-notification border border-yellow-border-notification rounded-md p-2">
            <MdOutlineWarningAmber className="text-yellow-text-notification font-bold text-3xl" />
            <div className="ml-3">
                <p className="font-bold">{title}</p>
                <p className="text-xs">{description}</p>
            </div>
        </div>
    )
}

export default AlertWarning