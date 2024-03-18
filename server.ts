import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import postsRouter from "./routes/posts";
import citiesRouter from "./routes/cities";
import segmentsRouter from "./routes/segments";
import contactFormRouter from "./routes/contactForm";
import associatesRouter from "./routes/associates";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import eventRouter from "./routes/events";
import { Sequelize } from "sequelize";

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:5176", "https://ibtec.org.br"],
  })
);

// Configure o Sequelize para se conectar ao banco de dados
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "server01.ibtec.org.br",
  username: "ctcca_dev",
  password: "Eagles110591",
  database: "ctcca_ibtec",
  pool: {
    max: 5, // Número máximo de conexões no pool
    min: 0, // Número mínimo de conexões no pool
    acquire: 250000, // Tempo máximo em milissegundos para adquirir uma conexão
    idle: 10000, // Tempo máximo em milissegundos que uma conexão pode ficar inativa
  },
});
// Verifique a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão bem-sucedida ao banco de dados");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao banco de dados:", err);
  });

// Roteamento para as rotas de posts
app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING");
});
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", [
    "http://localhost:3000/",
    "https://ibtec.org.br",
  ]);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Origem", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRouter);
app.use("/api/cities", citiesRouter);
app.use("/api/segments", segmentsRouter);
app.use("/api/contact", contactFormRouter);
app.use("/api/associates", associatesRouter);
app.use("/api/user", userRouter);
app.use("/api/event", eventRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
