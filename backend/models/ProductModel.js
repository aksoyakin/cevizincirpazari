import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    basePrice: {type: Number, required: true},
    image: {type: Array, required: true},
    category: {type: String, required: true},
    subCategory: {type: String},
    sizes: {type: Array, required: true},
    bestseller: {type: Boolean},
    date: {type: Number, required: true},
    sizePrices: [{ size: Number, price: Number }]
})

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;