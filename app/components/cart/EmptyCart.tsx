import Link from "next/link";
import { Button } from "@/app/components/ui/Button";

export function EmptyCart() {
  return (
    <div className="text-center py-16">
      <h1 className="mb-4">Your Cart is Empty</h1>
      <p className="text-mid-gray mb-8">
        Add sustainable kitchen essentials to get started.
      </p>
      <Link href="/shop">
        <Button variant="primary">Continue Shopping</Button>
      </Link>
    </div>
  );
}
