import { redirect } from "next/navigation";

/**
 * Legacy /product listing — redirect to the simple /shop grid.
 */
export default function ProductsPage() {
  redirect("/shop");
}
