import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets.js";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Edit = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const imageStates = [image1, image2, image3, image4];
    const imageSetters = [setImage1, setImage2, setImage3, setImage4];

    const [existingImages, setExistingImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([assets.upload_area, assets.upload_area, assets.upload_area, assets.upload_area]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [stock, setStock] = useState("");
    const [loading, setLoading] = useState(true);

    const availableSizes = [0.25, 0.5, 1, 5, 10, 15, 20, 25, 30];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.post(backendUrl + "/api/product/single", { productId: id });
                if (response.data.success) {
                    const product = response.data.product;
                    setName(product.name);
                    setDescription(product.description);
                    setPrice(product.basePrice);
                    setCategory(product.category);
                    setSubCategory(product.subCategory || "");
                    setBestseller(Boolean(product.bestseller));
                    setSizes((product.sizes || []).map((item) => Number(item)));
                    setExistingImages(product.image || []);
                    setStock(product.stock ?? "");
                    setPreviewUrls([
                        product.image?.[0] || assets.upload_area,
                        product.image?.[1] || assets.upload_area,
                        product.image?.[2] || assets.upload_area,
                        product.image?.[3] || assets.upload_area,
                    ]);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    useEffect(() => {
        const objectUrls = imageStates.map((file) => (file ? URL.createObjectURL(file) : null));
        setPreviewUrls(objectUrls.map((url, index) => url || existingImages[index] || assets.upload_area));

        return () => {
            objectUrls.forEach((url) => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [image1, image2, image3, image4, existingImages]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("basePrice", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("stock", stock || 0);
            sizes.forEach((size) => formData.append("sizes", size));

            imageStates.forEach((file, index) => {
                if (file) {
                    formData.append(`image${index + 1}`, file);
                }
            });

            const response = await axios.post(backendUrl + "/api/product/update", formData, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                setImage1(null);
                setImage2(null);
                setImage3(null);
                setImage4(null);
                navigate("/list");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    if (loading) {
        return <p>Ürün bilgileri yükleniyor...</p>;
    }

    return (
        <form onSubmit={onSubmitHandler} className={"flex flex-col w-full items-start gap-3"}>
            <div>
                <p className={"mb-2"}>Upload Image</p>
                <div className={"flex gap-2"}>
                    {[0, 1, 2, 3].map((index) => (
                        <label htmlFor={`image${index + 1}`} key={index}>
                            <img
                                className={"w-20 h-20 object-cover"}
                                src={previewUrls[index]}
                                alt=""
                            />
                            <input
                                onChange={(e) => imageSetters[index](e.target.files[0])}
                                type={"file"}
                                id={`image${index + 1}`}
                                hidden
                            />
                        </label>
                    ))}
                </div>
            </div>
            <div className={"w-full"}>
                <p className={"mb-2"}>Product name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={"w-full max-w-[500px] px-3 py-2"}
                    type={"text"}
                    placeholder={"Type here"}
                    required
                />
            </div>
            <div className={"w-full"}>
                <p className={"mb-2"}>Product description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className={"w-full max-w-[500px] px-3 py-2"}
                    type={"text"}
                    placeholder={"Write content here"}
                    required
                />
            </div>
            <div className={"flex flex-col sm:flex-row gap-2 w-full sm:gap-8"}>
                <div>
                    <p className={"mb-2"}>Product category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className={"w-full px-3 py-2"}
                        value={category}
                    >
                        <option value=""></option>
                        <option value="Ceviz">Ceviz</option>
                        <option value="İncir">İncir</option>
                        <option value="Fındık">Fındık</option>
                        <option value="Badem">Badem</option>
                        <option value="Fasulye">Fasulye</option>
                        <option value="Mürdüm Eriği">Mürdüm Eriği</option>
                        <option value="Cennet Hurması">Cennet Hurması</option>
                    </select>
                </div>

                <div>
                    <p className={"mb-2"}>Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className={"w-full px-3 py-2 sm:w-[120px]"}
                        type={"number"}
                        placeholder={"35"}
                        required
                    />
                </div>
                <div>
                    <p className={"mb-2"}>Stock</p>
                    <input
                        onChange={(e) => setStock(e.target.value)}
                        value={stock}
                        className={"w-full px-3 py-2 sm:w-[120px]"}
                        type={"number"}
                        min={0}
                        placeholder={"10"}
                        required
                    />
                </div>
            </div>
            <div>
                <p className={"mb-2"}>Product Sizes</p>
                <div className={"flex gap-3 flex-wrap"}>
                    {availableSizes.map((sizeValue) => (
                        <div
                            key={sizeValue}
                            onClick={() =>
                                setSizes((prev) =>
                                    prev.includes(sizeValue)
                                        ? prev.filter((item) => item !== sizeValue)
                                        : [...prev, sizeValue]
                                )
                            }
                        >
                            <p
                                className={`${
                                    sizes.includes(sizeValue) ? "bg-pink-100" : "bg-slate-200"
                                } px-3 py-1 cursor-pointer`}
                            >
                                {sizeValue}
                            </p>
                        </div>
                    ))}
                </div>
                <div className={"flex gap-2 mt-2"}>
                    <input
                        onChange={() => setBestseller((prev) => !prev)}
                        checked={bestseller}
                        type={"checkbox"}
                        id={"bestseller"}
                    />
                    <label className={"cursor-pointer"} htmlFor={"bestseller"}>
                        Add to bestseller
                    </label>
                </div>
                <button type={"submit"} className={"w-28 py-3 mt-4 bg-black text-white"}>
                    UPDATE
                </button>
            </div>
        </form>
    );
};

export default Edit;
