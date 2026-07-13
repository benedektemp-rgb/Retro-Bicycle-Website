import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "light";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-rust text-cream hover:bg-rust-dark border-rust-dark",
  secondary: "bg-transparent text-espresso hover:bg-espresso hover:text-cream border-espresso",
  light: "bg-transparent text-cream hover:bg-cream hover:text-espresso border-cream",
};

export default function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <Link
      href={href}
      className={`font-display inline-block rounded-sm border-2 px-6 py-3 text-lg tracking-wide transition-colors ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </Link>
  );
}
