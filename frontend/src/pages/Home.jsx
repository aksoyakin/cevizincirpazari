import Hero from "../components/Hero.jsx";
import LatestCollection from "../components/LatestCollection.jsx";
import BestSeller from "../components/BestSeller.jsx";
import OurPolicy from "../components/OurPolicy.jsx";
import Banner from "../components/Banner.jsx";

const Home = () => {
    return (
        <div>
            <Hero />
            <LatestCollection />
            <Banner />
            <BestSeller />

            <OurPolicy />
            <hr/>
            {/*<NewsLetter />*/}
        </div>
    );
};

export default Home;