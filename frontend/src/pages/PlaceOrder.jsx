import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal.jsx";
import {assets} from "../assets/assets.js";
import {useContext, useState} from "react";
import {ShopContext} from "../context/ShopContext.jsx";
import axios from "axios";
import {toast} from "react-toastify";

const PlaceOrder = () => {
    const [method, setMethod] = useState("HAVALE/EFT");
    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        deliveryFee,
        products
    } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "Türkiye",
        phone: "",
    });
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "phone" && value.startsWith('0')) {
            return;
        }

        setFormData(data => ({...data, [name]: value}))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + deliveryFee,
            }
            switch (method) {
                // api calls for cod
                case 'HAVALE/EFT': {
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
                    console.log(response.data);

                    if (response.data.success) {
                        setCartItems({});
                        navigate("/orders");
                        toast.success("Siparişiniz başarıyla alınmıştır.");
                    } else {
                        toast.error(response.data.message);
                    }
                    break;
                }

                default:
                    break;
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }


    return (
        <form onSubmit={onSubmitHandler}
              className={"flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t"}>
            {/* LEFT SIDE */}
            <div className={"flex flex-col gap-4 w-full sm:max-w-[480px]"}>
                <div className={"text-xl sm:text-2xl my-3"}>
                    <Title primaryText={"TESLİMAT"} secondaryText={"BİLGİLERİ"}/>
                </div>
                <div className={"flex gap-3"}>
                    <input
                        required
                        onChange={onChangeHandler}
                        name={"firstName"}
                        value={formData.firstName}
                        className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                        type={"text"}
                        placeholder={"Adınız"}
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name={"lastName"}
                        value={formData.lastName}
                        className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                        type={"text"}
                        placeholder={"Soyadınız"}
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name={"email"}
                    value={formData.email}
                    className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                    type={"email"}
                    placeholder={"Email Adresiniz"}
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name={"street"}
                    value={formData.street}
                    className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                    type={"text"}
                    placeholder={"Sokak"}
                />
                <div className={"flex gap-3"}>
                    <input
                        required
                        onChange={onChangeHandler}
                        name={"city"}
                        value={formData.city}
                        className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                        type={"text"}
                        placeholder={"Şehir"}
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name={"state"}
                        value={formData.state}
                        className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                        type={"text"}
                        placeholder={"Mahalle"}
                    />
                </div>
                <div className={"flex gap-3"}>
                    <input
                        required
                        onChange={onChangeHandler}
                        name={"zipcode"}
                        value={formData.zipcode}
                        className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                        type={"number"}
                        placeholder={"Posta Kodu"}
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name={"country"}
                        value={formData.country}
                        className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                        type={"text"}
                        placeholder={"Ülke"}
                        disabled={true}
                    />
                </div>
                <div className={"flex gap-3"}>
                    <p className={"text-m mt-2"}>+90</p>
                    <input
                        required
                        onChange={onChangeHandler}
                        name={"phone"}
                        value={formData.phone}
                        className={"border border-gray-300 rounded py-1.5 px-3.5 w-full"}
                        type={"tel"}
                        placeholder={"Telefon Numaranız"}
                        minLength={10}
                        maxLength={10}
                    />

                </div>

            </div>

            { /* RIGHT SIDE */}
            <div className={"mt-8"}>
                <div className={"mt-8 min-w-80"}>
                    <CartTotal/>
                </div>

                <div className={"mt-12"}>
                    <Title primaryText={"ÖDEME"} secondaryText={"YÖNTEMİ"}/>
                    {/* --- Payment Method Selection --- */}
                    <div className={"flex gap-3 flex-col lg:flex-row"}>


                        {/*
                       <div onClick={() => setMethod('stripe')}
                             className={"flex items-center gap-3 border p-2 px-3 cursor-pointer"}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img
                                className={"h-5 mx-4"}
                                src={assets.stripe_logo}
                                alt={"stripe-logo"}
                            />
                        </div>

                        <div onClick={() => setMethod('razorpay')}
                             className={"flex items-center gap-3 border p-2 px-3 cursor-pointer"}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img
                                className={"h-5 mx-4"}
                                src={assets.razorpay_logo}
                                alt={"razorpay-logo"}
                            />
                        </div>
*/}
                        <div onClick={() => setMethod('HAVALE/EFT')}
                             className={"flex items-center gap-3 border p-2 px-3 cursor-pointer"}>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'HAVALE/EFT' ? 'bg-green-400' : ''}`}></p>
                            <p className={"text-gray-800 text-sm font-medium mx-4"}>HAVALE / EFT</p>
                        </div>
                    </div>
                    {method === "HAVALE/EFT"
                        ? (
                            <div>
                                <div className={"flex items-center justify-center border mt-4 p-2 px-3"}>
                                    <p className={"text-gray-800 text-sm font-medium mx-4"}>IBAN </p>
                                </div>
                                <div className={"flex items-center border p-2 px-3"}>
                                    <p className={"text-gray-800 text-sm font-medium mx-4"}>MEHMET ÇOBAN </p>
                                    <p className={"text-gray-800 text-sm font-medium mx-4"}>TR47 0001 0005 0439 5779
                                        1550
                                        06</p>
                                </div>
                            </div>
                        ) : null}


                    <div className={"w-full text-end mt-8"}>
                        <button
                            type="submit"
                            className={"bg-black text-white px-16 py-3 text-sm"}
                        >SİPARİŞİ TAMAMLA
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;