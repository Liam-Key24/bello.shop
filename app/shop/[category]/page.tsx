import { redirect } from "next/navigation";

/**
 * Category page - redirects to main shop page
 * This route is reserved for future category filtering
 */
export default function CategoryPage() {
  redirect("/shop");
}

