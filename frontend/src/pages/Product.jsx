import { useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";
import {useNavigate} from "react-router-dom";

const Product = () => {
    const {productId} = useParams();
    const {products, currency, addToCart} = useContext(ShopContext);
    const [productData, setProductData] = useState(false);
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const navigate = useNavigate();
    const [selectedPrice, setSelectedPrice] = useState(0);
    const isOutOfStock = productData && typeof productData.stock === "number" ? productData.stock <= 0 : false;

    const fetchProductData = async () => {
        products.map((item) => {
            if (item._id === productId) {
                setProductData(item);
                setImage(item.image[0]);
                setSelectedPrice(item.basePrice);
                return null;
            }
        })
    }

    const handleSizeChange = (event) => {
        const selectedSize = event.target.value;
        setSize(selectedSize);
        if (!selectedSize) {
            setSelectedPrice(productData.basePrice);
            return;
        }
        const sizePrice = productData.sizePrices?.find(
            (sp) => Number(sp.size) === Number(selectedSize)
        );
        if (sizePrice) {
            setSelectedPrice(sizePrice.price);
        } else {
            setSelectedPrice(productData.basePrice);
        }
    }


    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    return productData ? (
        <div className={"border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100"}>
            {/*  PRODUCT DATA  */}
            <div className={"flex gap-12 sm:gap-12 flex-col sm:flex-row"}>
                {/* --- Product Images --- */}
                <div className={"flex-1 flex flex-col-reverse gap-3 sm:flex-row"}>
                    <div className={"flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full"}>
                        {
                            productData.image.map((item,index)=> (
                                <img
                                    src={item}
                                    key={index}
                                    alt={"small-image"}
                                    className={"w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"}
                                    onClick={() => setImage(item)}
                                />
                            ))
                        }
                    </div>
                    <div className={"w-full sm:w-[80%]"}>
                        <img
                            src={image}
                            alt={"big-image"}
                            className={"w-full h-auto"}
                        />
                    </div>
                </div>
                {/* --- Product Info --- */}
                <div className={"flex-1"}>
                    <h1 className={"font-medium text-2xl mt-2 text-orange-500"}> {productData.name} </h1>
                    {/*                    <div className={"flex items-center gap-1 mt-2"}>
                        <img src={assets.star_icon} alt={""} className={"w-3 5"}/>
                        <img src={assets.star_icon} alt={""} className={"w-3 5"}/>
                        <img src={assets.star_icon} alt={""} className={"w-3 5"}/>
                        <img src={assets.star_icon} alt={""} className={"w-3 5"}/>
                        <img src={assets.star_dull_icon} alt={""} className={"w-3 5"}/>s
                        <p className={"pl-2"}> (122) </p>
                    </div>*/}
                    <p className={"mt-5 text-2xl font-medium"}> {currency} {selectedPrice.toFixed(2)} </p>
                    <p className={"mt-5 text-gray-500 md:w-4/5"}> {productData.description} </p>
                    <div className={"flex flex-col gap-4 my-8 italic"}>
                        <p>(300 KG ve üstü toplu alımlar için iletişime geçebilirsiniz)</p>
                        <div>
                            <select
                                value={size}
                                onChange={handleSizeChange}
                                className={"border py-2 px-4 bg-gray-100"}
                            >
                                <option value={""} disabled>Kg Seçiniz</option>
                                {productData.sizes.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item} KG
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {isOutOfStock && (
                        <p className={"text-red-500 font-semibold mb-2"}>Stok tükendi</p>
                    )}
                    <button
                        onClick={() => {
                            if (isOutOfStock) return;
                            addToCart(productData._id, size);
                            if(size.length > 0){
                                navigate('/cart');
                            }
                        }}
                        disabled={isOutOfStock}
                        className={`${isOutOfStock ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 active:bg-gray-700"} text-white px-10 py-4 text-sm`}
                    >
                        {isOutOfStock ? "STOK TÜKENDİ" : "SEPETE EKLE"}
                    </button>
                    <hr className={"mt-8 sm:w-4/5"}/>
                    <div className={"text-sm text-gray-500 mt-5 flex flex-col gap-1"}>
                        <p>Görseller orijinal ürünün görselleridir.</p>
                        <p>100% Yerli üretim.</p>
                    </div>
                </div>
            </div>

            {/* DESCRIPTION AND REVIEW */}
            {/*            <div className={"mt-20"}>
                <div className={"flex"}>
                    <b className={"border px-5 py-3 text-sm"}>Description</b>
                    <p className={"border px-5 py-3 text-sm"}>Reviews (122) </p>
                </div>
                <div className={"flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500"}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores cum modi tempore voluptas! Aliquid blanditiis deserunt dicta dolorum nisi porro quae, quidem tempora?</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores dolor iste minus nulla, omnis placeat praesentium quas repudiandae sed sequi similique tempore, totam voluptates.</p>
                </div>
            </div>*/}
            {/* DISPLAY RELATED PRODUCTS */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory}></RelatedProducts>
        </div>
    ) : <div className={"opacity-0"}></div>
};

export default Product;
