import express from 'express';
import dotenv from 'dotenv';

import {connectDB} from "./configs/DBConnect.js";
import {routes} from "./routes/index.js";
import {errorHandler, notFound} from "./middlewares/error.middleware.js";
import {responseFormatter} from "./middlewares/response.middleware.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(responseFormatter);
const PORT = process.env.PORT || 8080;

try {
    connectDB();
} catch (error) {
    app.use((req, res, next) => {
        res.status(500).send({message: 'Failed to connect to MongoDB'});
    });
}

routes(app);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});