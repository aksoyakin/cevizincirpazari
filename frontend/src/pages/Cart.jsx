import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import Title from "../components/Title.jsx";
import { assets } from "../assets/assets.js";
import CartTotal from "../components/CartTotal.jsx";

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate, getCartAmount } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const minimumCartValue = 1000;

    const isBelowMinimum = getCartAmount() < minimumCartValue;

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item],
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    const calculatePrice = (productData, size) => {
        const sizePrice = productData.sizePrices.find(
            (sp) => Number(sp.size) === Number(size)
        );
        return sizePrice ? sizePrice.price : productData.basePrice;
    };

    return (
        <div className={"border-t pt-14"}>
            <div className={"text-2xl mb-3"}>
                <Title primaryText={"MEVCUT"} secondaryText={"SEPETİNİZ"} />
            </div>

            <div>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);

                    return (
                        <div
                            key={index}
                            className={
                                "py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_ 2fr_0.5fr] items-center gap-4"
                            }
                        >
                            <div className={"flex items-start gap-6"}>
                                <img
                                    className={"w-16 sm:w-20"}
                                    src={productData.image[0]}
                                    alt={"image"}
                                />
                                <div>
                                    <p className={"text-xs sm:text-lg font-medium"}> {productData.name} </p>
                                    <div className={"flex items-center gap-5 mt-2"}>
                                        <p> {currency} {calculatePrice(productData, item.size)} </p>
                                        <p className={"px-2 sm:px-3 sm:ppy-1 border bg-slate-50"}> {item.size} </p>
                                    </div>
                                </div>
                            </div>
                            <input
                                className={"border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"}
                                type={"number"}
                                min={1}
                                defaultValue={item.quantity}
                                onChange={(e) =>
                                    e.target.value === "" || e.target.value === "0"
                                        ? null
                                        : updateQuantity(item._id, item.size, Number(e.target.value))
                                }
                            />
                            <img
                                src={assets.bin_icon}
                                alt={"bin-icon"}
                                className={"w-4 mr-4 sm:w-5 cursor-pointer"}
                                onClick={() => updateQuantity(item._id, item.size, 0)}
                            />
                        </div>
                    );
                })}
            </div>

            <div className={"flex justify-end my-20"}>
                <div className={"w-full sm:w-[450px]"}>
                    <CartTotal isBelowMinimum={isBelowMinimum} />
                    <div className={"w-full text-end"}>
                        <button
                            onClick={() => navigate("/place-order")}
                            disabled={isBelowMinimum}
                            className={`text-sm my-8 px-8 py-3 ${
                                isBelowMinimum ? "bg-gray-300 cursor-not-allowed" : "bg-black text-white"
                            }`}
                        >
                            ÖDEMEYE GEÇ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
