import multer from 'multer'
import { __dirname } from '../utils.js'

//antes de instanciar el módulo de multer
//debemos configurar donde se guardarán los archivos
//a través del método diskStorage
const storage = multer.diskStorage({
    //destination para indicar donde se guardará
    destination: (req,file,cb) => cb(null,__dirname+'/public/img'),
    //filename para inidicar el nombre con que se guardará
    filename: (req,file,cb) => cb(null,file.originalname)
})

//instanciamos
const uploader = multer({storage})

export default uploader