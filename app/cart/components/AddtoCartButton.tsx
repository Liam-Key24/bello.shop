"use client";

import { useCartContext } from "../CartProvider";

interface Props {
  variantId: string;
  title: string;
  price: number;
  image?: string;
}

export default function AddtoCartButton({ variantId, title, price, image }: Props) {
  const { addToCart } = useCartContext();

  const handleAdd = () => {
    const item = {
      variantId,
      title: title || "Untitled product",
      price: Number(price ?? 0),
      image: image || "/placeholder.svg",
      quantity: 1,
    };
    console.log("AddtoCartButton -> addToCart payload:", item);
    addToCart(item);
    alert(`${title || "Product"} added to cart!`);
  };

  return (
    <button onClick={handleAdd} className="px-4 py-2 bg-purple-500 text-white rounded">
      Add to Cart
    </button>
  );
}