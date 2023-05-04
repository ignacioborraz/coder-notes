//const fs = require('fs')
import fs from 'fs'

class User {
    constructor(path) {
        this.users = []     //para guardar en la memoria todos los usuarios
        this.path = path    //para guardar en la memoria la ruta del archivo
        this.init(path)     //para iniciar la instancia y crear el archivo en caso de no existir o cargar la memoria en caso de existir usuarios
    }
    init(path) {
        //verifico si existe el archivo
        let file = fs.existsSync(path)
        //console.log(file)
        if (!file) {
            //si no existe lo creo
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 'file created at path: '+this.path
        } else {
            //si existe cargo los usuarios en la memoria del programa
            this.users = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }
    async add_user({ name,last_name,age,url_photo }) {
        try {
            //defino el objeto que necesito agregar al array
            let data = { name,last_name,age,url_photo }
            //si la memoria tiene usuarios
            if (this.users.length>0) {
                //busco el id del último elemento y le sumo 1
                let next_id = this.users[this.users.length-1].id+1
                //agrego la propiedad al objeto
                data.id = next_id
            } else {
                //en caso que no tenga: asigno el primer id
                data.id = 1
            }
            //agrego el objeto (usuario) a la memoria del programa
            this.users.push(data)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.users,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('id´s created user: '+data.id)
            return { uid: data.id }
        } catch(error) {
            console.log(error)
            return null
        }
    }
    read_users() {
        //console.log(this.users)
        return this.users
    }
    read_user(id) {
        let one = this.users.find(each=>each.id===id)
        //console.log(one)
        return one
    }
    async update_user(id,data) {
        //data es el objeto con las propiedades que necesito modificar del usuario
        try {
            //busco el usuario
            let one = this.read_user(id)
            //itero para modificar la propiedad correspondiente
            for (let prop in data) {
                //console.log(prop)
                one[prop] = data[prop]
            }
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.users,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('updated user: '+id)
            return 'updated user: '+id
        } catch(error) {
            console.log(error)
            return 'error: updating user'
        }
    }
    async destroy_user(id) {
        try {
            //saco el usuario
            this.users = this.users.filter(each=>each.id!==id)
            //console.log(this.users)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.users,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('delete user: '+id)
            return 'delete user: '+id
        } catch(error) {
            console.log(error)
            return 'error: deleting user'
        }
    }
}

let manager = new User('./src/data/users.json')

export default manager