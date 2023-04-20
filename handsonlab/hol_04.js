const fs = require('fs')

class UserManager {
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
    add_user({ name,last_name,age,carts }) {
        //defino el objeto que necesito agregar al array
        let data = { name,last_name,age,carts }
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
        fs.promises.writeFile(this.path,data_json)
            .then(res=>console.log('id´s user: '+data.id))
            .catch(err=>console.log(err))
        return 'id´s user: '+data.id
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
    update_user(id,data) {
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
        fs.promises.writeFile(this.path,data_json)
            .then(res=>console.log('updated user: '+id))
            .catch(err=>console.log(err))
        return 'updated user: '+id
    }
    destroy_user(id) {
        //saco el usuario
        this.users = this.users.filter(each=>each.id!==id)
        //console.log(this.users)
        //convierto a texto plano el array
        let data_json = JSON.stringify(this.users,null,2)
        console.log(data_json)
        //sobre-escribo el archivo
        fs.promises.writeFile(this.path,data_json)
            .then(res=> console.log('delete user: '+id))
            .catch(err=>console.log(err))
        return 'delete user: '+id
    }
}

async function manager() {
    let manager = await new UserManager('./data/users.json')
    await manager.add_user({ name:'igna',last_name:'borraz',age:32,carts:[] })
    await manager.add_user({ name:'nico',last_name:'lopez',age:37,carts:[] })
    await manager.add_user({ name:'igna',last_name:'chapero',age:100,carts:[] })
    await manager.add_user({ name:'mario',last_name:'castro',age:35,carts:[] })
    await manager.add_user({ name:'luis',last_name:'aguilar',age:35,carts:[] })
    await manager.update_user(1,{ name:'ignacio' })
    await manager.update_user(2,{ name:'nicolas' })
    await manager.update_user(3,{ name:'florencia',age:30 })
    await manager.destroy_user(1)
    await manager.destroy_user(4)
}
manager()