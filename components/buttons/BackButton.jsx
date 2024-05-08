"use client";
import IconBox from "@/components/ui/IconBox";
import { MdOutlineArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function BackButton({ href }) {
  const router = useRouter();

  if (href) {
    return (
      <div className="w-fit">
        <Link href={href}>
          <IconBox variant={"square"} Icon={MdOutlineArrowBack} />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-fit">
      <IconBox
        onClick={() => router.back()}
        variant={"square"}
        className="w-fit"
        Icon={MdOutlineArrowBack}
      />
    </div>
  );
}
