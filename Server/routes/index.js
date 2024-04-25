import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import session from "express-session";
import dotenv from "dotenv";
import userRouter from "./routes/index.js"; // Assurez-vous que le chemin est correct
import multer from "multer";

dotenv.config();

const app = express();

// Configuration de CORS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000'
}));

// Configuration de la session
const sessionStore = new SequelizeStore({
  db: db,
});

app.use(session({
  secret: process.env.SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    secure: 'auto'
  }
}));

// Synchronisation de la base de données de sessions
sessionStore.sync();

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());

// Utilisation du routeur
app.use(userRouter);

// Configuration de Multer pour gérer l'upload de fichiers
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null, "./public/Images")
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`)
  }
});

const upload = multer({storage});

// Endpoint pour gérer l'upload de fichiers
app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
});

// Démarrage du serveur
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
