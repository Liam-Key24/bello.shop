"use client";

import { useEffect, useState } from "react";

export function useCart() {
  const [checkoutId, setCheckoutId] = useState<string | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("checkoutId");
    if (id) setCheckoutId(id);
  }, []);

  const saveCheckoutId = (id: string) => {
    localStorage.setItem("checkoutId", id);
    setCheckoutId(id);
  };

  return { checkoutId, saveCheckoutId };
}
