import fs from 'fs'

class Product {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }
    init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 201
        } else {
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('products recovered')
            return 200
        }
    }
    async add_product({ name,stock,price }) {
        try {
            let data = { name,stock,price }
            if (this.products.length>0) {
                let next_id = this.products[this.products.length-1].id+1
                data.id = next_id
            } else {
                data.id = 1
            }
            this.products.push(data)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return 201
        } catch(error) {
            console.log(error)
            return null
        }
    }
    read_products() {
        return this.products
    }
    read_product(id) {
        return this.products.find(each=>each.id===id)
    }
    async update_product(id,data) {
        try {
            let one = await this.read_product(id)
            for (let prop in data) {
                one[prop] = data[prop]
            }
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return 200
        } catch(error) {
            console.log(error)
            return null
        }
    }
    async destroy_product(id) {
        try {
            this.products = this.products.filter(each=>each.id!==id)
            let data_json = JSON.stringify(this.products,null,2)
            await fs.promises.writeFile(this.path,data_json)
            return 200
        } catch(error) {
            console.log(error)
            return null
        }
    }
}

let manager = new Product('./workshops/extra_01/src/data/products.json')

export default manager

/* let data = async() => {
    await manager.add_product({name:'name1',stock:2,price:10})
    await manager.add_product({name:'name2',stock:7,price:5})
    await manager.add_product({name:'name3',stock:8,price:9})
    await manager.add_product({name:'name3',stock:8,price:9})
    await manager.update_product(1,{stock:8})
    await manager.destroy_product(4)
}
data() */