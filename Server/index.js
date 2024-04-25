import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import MachineRoute from "./routes/MachineRoute.js";
import path from "path"; // Import path module
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

(async () => (
    await db.sync()
))();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(__dirname +'/uploads'));

// Serve static files from the 'public' directory

app.use(UserRoute);
app.use(AuthRoute);
app.use(MachineRoute);

store.sync();

app.listen(5000, () => {
    console.log('Server up and running...');
});
