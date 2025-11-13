import express from "express";
import { ClienteController } from "./controller/Cliente";
import { CookieController } from "./controller/Cookie";
import { PedidoController } from "./controller/Pedido";

export const app = express();

// Configuração de CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Permite todas as origens
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Responde requisições OPTIONS (preflight)
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }

    next();
});

app.use(express.json());

ClienteController();
CookieController();
PedidoController();

app.listen(3005, () => {
    console.log("Server is running on port 3005");
});