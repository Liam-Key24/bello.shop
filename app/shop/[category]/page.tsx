import { redirect } from "next/navigation";

/**
 * Category routes are not used in the 2-product store.
 * Keep the path for old links, redirect to the simple shop grid.
 */
export default function CategoryPage() {
  redirect("/shop");
}
