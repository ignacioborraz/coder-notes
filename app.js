import express from "express";

//para crear una aplicacion/servidor de express
const app = express();

//para inicialiazar la app de express necesito configurar:
const port = 8080;
const ready = console.log("server ready on port " + port);

//para inicializar el servidor
app.listen(port, ready);
