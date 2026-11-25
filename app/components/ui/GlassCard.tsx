import React from "react";

type GlassPadding = "sm" | "md" | "lg";

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  padding?: GlassPadding;
  as?: "div" | "section" | "article";
}

const paddingClasses: Record<GlassPadding, string> = {
  sm: "p-6",
  md: "p-8",
  lg: "p-10",
};

export function GlassCard({
  children,
  className = "",
  padding = "md",
  as: Tag = "div",
}: GlassCardProps) {
  return (
    <Tag
      className={`glass-bg glass-border glass-shadow rounded-md ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </Tag>
  );
}
