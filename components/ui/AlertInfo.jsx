import { MdOutlineInfo, MdOutlineWarningAmber } from "react-icons/md"

function AlertInfo({ title, description, ...props }) {
    return (
        <div className="grid grid-cols-[max-content_1fr] items-start bg-blue-bg-notification border border-blue-border-notification rounded-md p-2">
            <MdOutlineInfo size={32} />
            <div className="ml-3">
                <p className="font-bold">{title}</p>
                <p className="text-xs">{description}</p>
            </div>
        </div>
    )
}

export default AlertInfo