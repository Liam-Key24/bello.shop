import React from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  Truck,
  Leaf,
  Star,
  CheckCircle2,
  Heart,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  Minus,
  Plus,
  type LucideIcon,
} from "lucide-react";

const icons = {
  search: Search,
  bag: ShoppingBag,
  menu: Menu,
  close: X,
  truck: Truck,
  leaf: Leaf,
  star: Star,
  check: CheckCircle2,
  heart: Heart,
  globe: Globe,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  arrowRight: ArrowRight,
  minus: Minus,
  plus: Plus,
} as const;

export type IconName = keyof typeof icons;

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 20,
  className = "",
  strokeWidth = 2,
}: IconProps) {
  const LucideIcon: LucideIcon = icons[name];
  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden="true"
    />
  );
}
