import express from 'express';
import cors from 'cors';
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/UserRoute.js";
import productRouter from "./routes/ProductRoute.js";
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/OrderRoute.js";
import path, {dirname} from "path";
import ejsLayouts from 'express-ejs-layouts';
import { fileURLToPath } from 'url';
import paytrRouter from "./routes/PayTrRoute.js";

// APP CONFIG
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// PAYTR
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const viewsPath = path.join(__dirname, '/app_server/views');
console.log("viewsPath", viewsPath);

app.set('views', path.join(__dirname, '/app_server/views'));
app.use(express.urlencoded({ extended: true }));
app.set('views', viewsPath);
app.set('view engine', 'ejs');
app.use(ejsLayouts);


// MIDDLEWARES
app.use(express.json());
app.use(cors());

// API ENDPOINTS
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/paytr', paytrRouter);
app.get('/paytr/payment', (req, res) => {
    const token = req.query.token;
    res.render('layout', { iframetoken: token });
});
app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log("Server running on PORT: " + port);
})