import { Logo } from "../Logo";
import IconBox from "../ui/IconBox";

export default function HomeHeader() {
    return (
        <>
            <div className="flex justify-between items-center">
                <Logo />
                <IconBox variant={"square"} Icon={MdOutlineSettings} />
            </div>
        </>
    )
}