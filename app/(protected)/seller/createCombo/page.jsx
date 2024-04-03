import IconBox from "@/components/ui/IconBox";
import SettingButton from "@/components/buttons/setting-button";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import FormAddCombo from "@/components/form/FormAddCombo";

export default async function AddCombo() {
    return (
        <>
            <div className="flex justify-between p-4">
                <Link href={"/seller"}>
                    <IconBox
                        Icon={MdArrowBack}
                    />
                </Link>
            </div>
            <FormAddCombo />
        </>
    )
}