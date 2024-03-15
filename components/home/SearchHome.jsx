"use client"
import { MdOutlineArrowBack, MdOutlineDelete, MdOutlineHistory, MdOutlineSearch } from "react-icons/md";
import IconBox from "../ui/IconBox";
import Input from "../ui/Input";
import { useTransition, animated } from "@react-spring/web";
import { useToggle } from "usehooks-ts";

export default function SearchHome() {
    const [search, toggleSearch] = useToggle(false);
    const transitionSearch = useTransition(search, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        config: {duration: 120}
    })



    return (
        <>
            <MdOutlineSearch onClick={toggleSearch} size={26} />
            {transitionSearch((style, item) => item ? (<animated.div style={style} className="fixed inset-0 p-4 bg-background z-10">
                <div className="grid grid-cols-[max-content_1fr] gap-4">
                    <div onClick={toggleSearch}>
                        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
                    </div>
                    <Input type="search" className="w-full" placeholder="Buscar producto" />
                </div>
                <div className="mt-4">
                    <h2 className="font-bold text-xl text-text-secundary mb-4">Reciente</h2>
                    <div className="flex gap-4 flex-col">
                        <div className="flex justify-between">
                            <div className="font-bold flex gap-2 items-center">
                                <MdOutlineHistory size={28} />
                                <p>Chory ejemplo</p>
                            </div>
                            <MdOutlineDelete size={28} />
                        </div>
                        <div className="flex justify-between">
                            <div className="font-bold flex gap-2 items-center">
                                <MdOutlineHistory size={28} />
                                <p>Chory ejemplo</p>
                            </div>
                            <MdOutlineDelete size={28} />
                        </div>
                        <div className="flex justify-between">
                            <div className="font-bold flex gap-2 items-center">
                                <MdOutlineHistory size={28} />
                                <p>Chory ejemplo</p>
                            </div>
                            <MdOutlineDelete size={28} />
                        </div>
                    </div>
                </div>
            </animated.div>) : "")}
        </>
    )
}