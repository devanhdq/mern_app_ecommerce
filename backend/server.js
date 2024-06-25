import express from 'express';
import dotenv from 'dotenv';
import {responseFormatter} from "./src/middlewares/response.middleware.js";
import {connectDB} from "./src/configs/DBConnect.js";
import {routes} from "./src/routes/index.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(responseFormatter);
const PORT = process.env.PORT || 8080;

connectDB().catch(error => console.log(error));
routes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});