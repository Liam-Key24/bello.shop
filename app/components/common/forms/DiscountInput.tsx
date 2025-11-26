/**
 * Discount input - input field for applying discount codes
 */
export default function DiscountInput() {
    return (
        <div className="glass relative rounded-4xl w-[90%] h-9 flex items-center">
            <input 
              type="text" 
              placeholder="Discount Code" 
              className="px-3 flex-1 bg-transparent outline-none"
              aria-label="Enter discount code"
            />
            <button 
              className="glass bg-frosty-green absolute right-0 h-9 rounded-4xl px-5"
              aria-label="Apply discount code"
            >
                Apply
            </button>
        </div>
    );
};

