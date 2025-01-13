import {assets} from "../assets/assets.js";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className={"flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm"}>
                <div>
                    <img src={assets.logo} className={"mb-5 w-32"} alt={"logo"}/>
                    <p className={"w-full md:w-2/3"}>En taze ceviz ve kuruyemişler, sofralarınızı şenlendirecek.</p>
                </div>
                <div>
                    <p className={"text-xl font-medium mb-5"}>KURUMSAL</p>
                    <ul className={"flex flex-col gap-1 text-gray-600"}>
                        <Link to={"/"}>Ana Sayfa</Link>
                        <Link to={"/about"}>Hakkımızda</Link>
                        <Link to={"/contact"}>İletişim</Link>
                    </ul>
                </div>
                <div>
                    <p className={"text-xl font-medium mb-5"}>İLETİŞİM</p>
                    <ul className={"flex flex-col gap-1 text-gray-600"}>
                        <li>+90 541 504 86 62</li>
                        <li>info@cevizincirpazari.com</li>
                        <p>Çameli/Denizli</p>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className={"text-sm text-center"}>2025 @ Tüm Hakları Saklıdır.</p>
                <p className={"text-sm italic text-gray-500 text-center"}>Design & Developed by <a href={"https://www.linkedin.com/in/aksoyakin/"}>Akin Aksoy</a> & <a href={"https://www.linkedin.com/in/birgulkurtcu/"}>Birgül Kurtçu</a> </p>
            </div>
        </div>
    );
};

export default Footer;