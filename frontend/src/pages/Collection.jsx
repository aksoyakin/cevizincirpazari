import {useContext, useEffect, useState} from "react";
import {ShopContext} from "../context/ShopContext.jsx";
import {assets} from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";

const Collection = () => {
    const {products, search, showSearch} = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
 //   const [subCategory, setSubCategory] = useState([]); {/* SubCategory === Type */}
    const [sortType, setSortType] = useState('relevant')

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    }
/*    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    }*/
    const applyFilter = () => {
        let productsCopy = products.slice();
        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category))
        }
/*        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }*/
        setFilterProducts(productsCopy);
    }
    const sortProducts = () => {
        let filterProductsCopy = filterProducts.slice();
        switch (sortType) {
            case 'low-high':
                setFilterProducts(filterProductsCopy.sort((a,b) => (a.basePrice - b.basePrice)));
                break;
            case 'high-low':
                setFilterProducts(filterProductsCopy.sort((a,b) => (b.basePrice - a.basePrice)));
                break;
            default:
                 applyFilter();
                 break;
        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, /*subCategory,*/ search, showSearch, products]);

    useEffect(() => {
        sortProducts();
    }, [sortType])

    return (
        <div className={'flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'}>
            {/* Filter Options */}
            <div className={"min-w-60"}>
                <p onClick={() => setShowFilter(!showFilter)} className={"my-2 text-xl flex items-center cursor-pointer gap-2"}>
                    FİLTRELE
                    <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : "" }`} src={assets.dropdown_icon} alt={"dropdown-icon"} />
                </p>
                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className={'mb-3 text-sm font-medium'}>KATEGORİLER</p>
                    <div className={"flex flex-col gap-2 text-sm font-light text-gray-700"}>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Ceviz"} onChange={toggleCategory}/> Ceviz
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"İncir"} onChange={toggleCategory}/> İncir
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Fındık"}
                                   onChange={toggleCategory}/> Fındık
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Badem"} onChange={toggleCategory}/> Badem
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Fasulye"}
                                   onChange={toggleCategory}/> Fasulye
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Mürdüm Eriği"} onChange={toggleCategory}/> Mürdüm Eriği
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Cennet Hurması"} onChange={toggleCategory}/> Cennet Hurması
                        </p>
                    </div>
                </div>
                {/* Sub Category Filter */}
                {/*                <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className={'mb-3 text-sm font-medium'}>TYPE</p>
                    <div className={"flex flex-col gap-2 text-sm font-light text-gray-700"}>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Topwear"} onChange={toggleSubCategory}/> Topwear
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Bottomwear"} onChange={toggleSubCategory}/> Bottomwear
                        </p>
                        <p className={"flex gap-2"}>
                            <input className={"w-3"} type={"checkbox"} value={"Winterwear"} onChange={toggleSubCategory}/> Winterwear
                        </p>
                    </div>
                </div>*/}
            </div>

            {/* Products */}
            <div className={"flex-1"}>
                <div className={"flex justify-between text-base sm:text-2xl mb-4"}>
                    <Title primaryText={"TÜM"} secondaryText={"ÜRÜNLER"}></Title>
                    {/* Product Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className={"border-2 border-gray-300 text-sm px-2"}>
                        <option value={"relevant"}>Tüm Ürünler</option>
                        <option value={"low-high"}>En Düşük Fiyat</option>
                        <option value={"high-low"}>En Yüksek Fiyat</option>
                    </select>
                </div>

                {/* Map Products */}
                <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6"}>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                name={item.name}
                                id={item._id}
                                price={item.basePrice}
                                image={item.image}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Collection;