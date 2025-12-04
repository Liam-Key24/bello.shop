import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Bello Shop",
  description: "Browse our collection of premium health and beauty products.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="max-w-6xl mx-auto mt-20 px-4">
      {children}
    </section>
  );
}
