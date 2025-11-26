import { ShoppingCart } from "lucide-react";
import { useCart } from '../../../cart/CartProvider';

/**
 * Navigation cart icon - displays cart icon with item count badge
 */
export default function NavCartIcon() {
  const { cart } = useCart();

  // total quantity of all items
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-700" aria-label="Shopping cart" />

      {totalItems > 0 && (
        <span 
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
          aria-label={`${totalItems} items in cart`}
        >
          {totalItems}
        </span>
      )}
    </div>
  );
}

