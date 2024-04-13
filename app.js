import express from "express";
import notesManager from "./data/fs/notes.fs.js"
//import { read, create, update, destroy } from "./data/fs/notes.fs.js"

//para crear una aplicacion/servidor de express
const app = express();

//para inicialiazar la app de express necesito configurar:
const port = 8080;
const ready = console.log("server ready on port " + port);

//para inicializar el servidor
app.listen(port, ready);

//para configurar el servidor con determinadas funcionalidades
app.use(express.urlencoded({extended:true}))     //para leer queries y params

//para configurar solicitudes/peticiones
app.get("/", (req,res)=>{
    try {
        const message = "Welcome to coder-notes"
        return res.json({ status: 200, response: message })
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message })
    }
})

app.get("/notes", read)
app.get("/notes/:nid", readOne)


async function read(req,res) {
    try {
        const { category } = req.query
        const all = await notesManager.read(category)
        //const all = await read()
        if (all.length>0) {
            return res.json({ status: 200, response: all, category })
        } else {
            return res.json({ status: 404, response: "Not found"})
        }
    } catch (error) {
        console.log(error);
        return res.json({ status: 500, response: error.message })
    }
}
async function readOne(req,res) {
    try {
        const { nid } = req.params
        const one = await notesManager.readOne(nid)
        //const one = await readOne(nid)
        if (one) {
            return res.json({ status: 200, response: one })
        } else {
            const error = new Error("Not found!")
            error.status = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.json({ status:error.status || 500, response: error.message || "ERROR" })
    }
}