

export default function CartInfoCard() {
    return (
        <div className="glass w-full h-auto p-5 rounded-4xl space-y-4">
                <div className="flex justify-between items-center ">
                    <div className=" w-fit h-auto flex justify-center items-center gap-2">
                        <h4>Subtotal</h4>
                        <p className="text-xs">('X' Items)</p>
                    </div>

                    <div>
                        <span>£Subtotal Amount</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className=" w-fit h-auto flex justify-center items-center gap-2">
                        <h4>Shipping Cost</h4>
                    </div>

                    <div>
                        <span>£Shipping Amount|| Free</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className=" w-fit h-auto flex justify-center items-center gap-2">
                        <h4>Total</h4>
                    </div>

                    <div>
                        <span>£Total Amount</span>
                    </div>
                </div>

            </div>
    )
};