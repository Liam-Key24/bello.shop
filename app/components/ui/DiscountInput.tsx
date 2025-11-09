



export default function DiscountInput() {
    return (
        <div className="glass relative rounded-4xl w-[90%] h-9 flex items-center">
            <input type="text" placeholder="Discount Code" className="px-3" />
            <button className="glass bg-[#DAE7DA] absolute right-0 h-9 rounded-4xl px-5">
                Apply
            </button>
        </div>
    );
};