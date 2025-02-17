import {assets} from "../assets/assets.js";
import {Link, NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {ShopContext} from "../context/ShopContext.jsx";

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);
    const logout = () => {
        navigate("/login");
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
    }

    return (
        <div className="flex items-center justify-between py-5 mt-3 font-medium">
            <Link to={"/"}>
                <img src={assets.logo} className="w-36" alt="logo"/>
            </Link>

            <ul className="hidden sm:flex gap-5 text-m text-gray-700">
                <NavLink to={"/"} className={"flex flex-col items-center gap-1"}>
                    <p>ANA SAYFA</p>
                    <hr className={"w-2/4 border-none h-[1.5px] bg-gray-700 hidden"}/>
                </NavLink>
                <NavLink to={"/collection"} className={"flex flex-col items-center gap-1"}>
                    <p>ÜRÜNLER</p>
                    <hr className={"w-2/4 border-none h-[1.5px] bg-gray-700 hidden"}/>
                </NavLink>
                <NavLink to={"/about"} className={"flex flex-col items-center gap-1"}>
                    <p>HAKKIMIZDA</p>
                    <hr className={"w-2/4 border-none h-[1.5px] bg-gray-700 hidden"}/>
                </NavLink>
                <NavLink to={"/contact"} className={"flex flex-col items-center gap-1"}>
                    <p>İLETİŞİM</p>
                    <hr className={"w-2/4 border-none h-[1.5px] bg-gray-700 hidden"}/>
                </NavLink>
            </ul>

            <div className={"flex items-center gap-6"}>
                <img
                    src={assets.search_icon}
                    className={"w-5 cursor-pointer"}
                    alt={"search-icon"}
                    onClick={() => setShowSearch(true)}
                />
                <div className={"group relative"}>

                    <img
                        onClick={() => token ? null : navigate("/login")}
                        src={assets.profile_icon}
                        className={"w-5 cursor-pointer"}
                        alt={"profile-icon"}/>

                    {/* Dropdown Menu */}
                    {token &&
                        <div className={"group-hover:block hidden absolute dropdown-menu right-0 pt-4"}>
                            <div className={"flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded"}>
                                {/*<p className={"cursor-pointer hover:text-black"}>My Profile</p>*/}
                                <p onClick={() => navigate("/orders")} className={"cursor-pointer hover:text-black"}>Siparişlerim</p>
                                <p onClick={logout} className={"cursor-pointer hover:text-black"}>Çıkış Yap</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to={"/cart"} className={"relative"}>
                    <img
                        src={assets.cart_icon}
                        className={"w-5 min-w-5"}
                        alt={"cart-icon"}
                    />
                    <p className={'absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'}>
                        {getCartCount()}
                    </p>
                </Link>
                <img
                    onClick={() => setVisible(true)}
                    src={assets.menu_icon}
                    className={"w-5 cursor-pointer sm:hidden"}
                    alt={"menu-icon"}
                />
            </div>

            { /* Sidebar menu for small screens */}
            <div
                className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className={"flex flex-col text-gray-600"}>
                    <div onClick={() => setVisible(false)} className={"flex items-center gap-4 p-3 cursor-pointer"}>
                        <img
                            src={assets.dropdown_icon}
                            className={"h-4 rotate-180"}
                            alt={"dropdown-icon"}
                        />
                        <p>Geri</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className={"py-2 pl-6 border"} to={"/"}>ANA SAYFA</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={"py-2 pl-6 border"}
                             to={"/collection"}>ÜRÜNLER</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={"py-2 pl-6 border"}
                             to={"/about"}>HAKKIMIZDA</NavLink>
                    <NavLink onClick={() => setVisible(false)} className={"py-2 pl-6 border"}
                             to={"/contact"}>İLETİŞİM</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;