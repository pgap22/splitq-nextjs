"use client";
import IconBox from "@/components/ui/IconBox";
import { MdOutlineArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BackButton({ href }) {
  const router = useRouter();

  if (href) {
    return (
      <Link href={href}>
        <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
      </Link>
    );
  }

  return (
    <IconBox
      onClick={() => router.back()}
      variant={"square"}
      Icon={MdOutlineArrowBack}
    />
  );
}
