import {useContext} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ProductItem = ({id, image, name, price}) => {
    const {currency} = useContext(ShopContext);
    return (
        <Link to={`/product/${id}`} className={"text-gray-700 cursor-pointer"}>
            <div className={"overflow-hidden"}>
                <img
                    src={image[0]}
                    alt={"product-image"}
                    className="hover:scale-110 transition ease-in-out"
                />
            </div>
            <p className={"pt-3 pb-1 text-sm"}> {name} </p>
            <p className={"text-sm font-medium"}> {price} {currency} </p>
        </Link>
    );
};

ProductItem.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.node,
}

export default ProductItem;