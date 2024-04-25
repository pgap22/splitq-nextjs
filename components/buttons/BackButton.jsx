"use client";
import IconBox from "@/components/ui/IconBox";
import { MdOutlineArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
      <IconBox onClick={()=> router.back()} variant={"square"} Icon={MdOutlineArrowBack} />
  );
}
