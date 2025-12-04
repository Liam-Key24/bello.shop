import Link from "next/link";
import { CaretLeft } from "@phosphor-icons/react";

interface BackButtonProps {
  href?: string;
  label?: string;
  className?: string;
  useIcon?: boolean;
}

export default function BackButton({
  href = "/shop",
  label = "Back to shop",
  className,
  useIcon = false,
}: BackButtonProps) {
  const defaultClassName = useIcon
    ? "rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/10 hover:shadow-md hover:shadow-black/50 transition-all duration-100 hover:backdrop-blur-3xl"
    : "inline-flex items-center rounded-full w-10 h-10 hover:bg-black/10 transition";

  return (
    <Link href={href} className={className || defaultClassName} aria-label={label}>
      {useIcon ? <CaretLeft className="w-8 h-8" weight="regular" /> : "←"}
    </Link>
  );
}

