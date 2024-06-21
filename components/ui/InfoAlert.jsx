import { MdOutlineInfo, MdOutlineWarningAmber } from "react-icons/md"

function InfoAlert({ title, description, ...props }) {
    return (
        <div className="grid grid-cols-[max-content_1fr] items-center bg-background border border-border text-sm mt-2 rounded-md p-2">
            <MdOutlineInfo size={24} />
            <div className="ml-3">
                <p className="text-md">{description}</p>
            </div>
        </div>
    )
}

export default InfoAlert