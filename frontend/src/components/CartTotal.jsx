import { ShopContext } from "../context/ShopContext.jsx";
import { useContext } from "react";
import Title from "./Title.jsx";

const CartTotal = ({ isBelowMinimum }) => {
    const { currency, deliveryFee, getCartAmount } = useContext(ShopContext);

    return (
        <div className={"w-full"}>
            <div className={"text-xl"}>
                <Title primaryText={"SEPET"} secondaryText={"TOPLAMI"} />
            </div>

            <div className={"flex flex-col gap-2 mt-2 text-sm"}>
                <div className={"flex justify-between"}>
                    <p>Sepet Tutarı</p>
                    <p> {currency} {getCartAmount()}.00 </p>
                </div>
                <hr />

                <div className={"flex justify-between"}>
                    <p>Kargo Bedeli</p>
                    <p> {currency} {deliveryFee}.00 </p>
                </div>
                <hr />

                <div className={"flex justify-between"}>
                    <b>Toplam</b>
                    <b> {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00 </b>
                </div>
            </div>

            {isBelowMinimum && (
                <p className="text-red-500 text-sm mt-4">
                    Sepet tutarı minimum 1000 TL olmalıdır. Lütfen daha fazla ürün ekleyin.
                </p>
            )}
        </div>
    );
};

export default CartTotal;
