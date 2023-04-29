import { Router } from "express"
import uploader from '../../../middlewares/multer.js'

const router = Router()

router.post('/signup',uploader.single('file'), async(req,res,next)=> {
    try {
        if (!req.file) {
            return res.send('no se pudo cargar la imagen')
        } 
        let user //lógica para crear un usuario
        user.profile = req.file.path
        return res.send('se pudo crear')
    } catch(error) {
        next(error)
    }
})

export default router