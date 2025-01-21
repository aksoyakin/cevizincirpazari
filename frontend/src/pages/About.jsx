import Title from "../components/Title.jsx";
import {assets} from "../assets/assets.js";

const About = () => {
    return (
        <div>
            <div className={"text-4xl text-center pt-8 border-t"}>
                <Title primaryText={"HOS"} secondaryText={"GELDİNİZ"} />
            </div>
            <div className={"my-10 flex flex-col md:flex-row gap-16"}>
                <img className={"w-full md:max-w-[450px]"} src={assets.about_img} alt=""/>
                <div className={"flex flex-col justify-center gap-6 md:w-2/4 text-gray-600"}>
                    <p>20 yıllık tecrübe ve kaliteye olan hassasiyetimizle ceviz ve incir çeşitlerimizi doğrudan sizlerle buluşturuyoruz! Misyonumuz sağlıklı yaşamı desteklerken memnuniyet ve kalite odaklı hizmet anlayışıdır.</p>
                    <p>Babadan kızına 20 yıllık tecrübeyle ana merkezimiz Denizli`nin 1325 m rakımlı Çameli ilçesinin Arıkaya köyünde olup, Türkiye`nin her bölgesine ürünlerimizi kargo yoluyla ulaştırmaktayız. 20 yılı geçkin bir süreyle de Antalya merkez ve Korkuteli ilçesinde doğrudan toptan ve parkende olarak ürün satışlarımızı yapmaktayız. Doğadan ilham alarak kalite ve sürdürülebilirlik anlayışıyla lezzetli ürünlerimizi siz değerli müşterilerimizin sofralarına ulaştırmayı hedefliyoruz</p>
                </div>
            </div>
            <div className={"text-4xl py-4"}>
                <Title primaryText={"NEDEN"} secondaryText={"BİZ"} />
            </div>
            <div className={"flex flex-col md:flex-row text-sm mb-20"}>
                <div className={"border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"}>
                    <b>Doğallık ve Tazelik</b>
                    <p className={"text-gray-600"}>Her ürün, doğanın en saf ve taze halleriyle sunuluyor. Ceviz ve incirlerimiz, taptaze olarak işlenir ve sofranıza en kısa sürede ulaşır, böylece her lokmada doğallığı hissedersiniz.</p>
                </div>
                <div className={"border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"}>
                    <b>Sağlıklı Yaşam</b>
                    <p className={"text-gray-600"}>Ceviz ve incir gibi doğal atıştırmalıklar, vücudunuzun ihtiyacı olan besinleri sağlarken, sağlıklı yaşamı destekler. Müşterilerimize lezzetli ve besleyici seçenekler sunarak, sağlıklı yaşam alışkanlıklarını teşvik etmeyi amaçlıyoruz.</p>
                </div>
                <div className={"border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"}>
                    <b>Sürdürülebilirlik</b>
                    <p className={"text-gray-600"}>Doğal kaynakları en verimli şekilde kullanarak çevreye duyarlı üretim ve tedarik süreçlerini benimsemek, sürdürülebilirlik ilkelerimizden biridir. Ürünlerimizi elde ederken çevreyi korumak ve gelecek nesillere daha yeşil bir dünya bırakmak önceliklerimizdendir.</p>
                </div>
            </div>
            {/*<NewsLetter/>*/}
        </div>
    );
};
export default About;