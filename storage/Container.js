const fs = require('fs')

module.exports = class Container {

    constructor(fileName) {
        this.fileName = `./storage/${fileName}`
        this.count = 0
    }
    
    async createOrReset(type) {
        try {
            await fs.promises.writeFile(this.fileName, "[]")
            console.log(type)
        } catch (error) {
            console.error(error)
        }
    }

    async save(product) {
        let array = []
        try {
            array = await fs.promises.readFile(this.fileName, "utf-8")
            array = JSON.parse(array)
            this.count = [...array].pop().id
        } catch (error) {
            try {
                await this.createOrReset('container created')
            } catch (err) {
                console.error(error)
            }
        }    
        array.push({
            ...product,
            id: this.count+1
        })    
        array = JSON.stringify(array, null, 3)    
        await fs.promises.writeFile(this.fileName, array)    
        return this.count+1
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.fileName, "utf-8")
            data = JSON.parse(data)
            if (data.length>0) {
                return data
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async getOne() {
        try {
            let data = await fs.promises.readFile(this.fileName, "utf-8")
            data = JSON.parse(data)
            if (data.length>0) {
                let random = parseInt(Math.random()*(data.length-1))
                return data[random]
            } else {
                return null
            }            
        } catch (error) {
            console.error(error)
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(this.fileName, "utf-8")
            data = JSON.parse(data)
            let product = data.find(pro => pro.id === id)
            if (product) {
                return product
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async putById(id,prop) {
        try {
            let data = await fs.promises.readFile(this.fileName, "utf-8")
            data = JSON.parse(data)
            let product = data.find(pro => pro.id == id)
            if (product) {
                product = {
                    ...product,
                    ...prop
                }
                return product
            } else {
                return null
            }
        } catch (error) {
            console.error(error)
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(this.fileName, "utf-8")
            data = JSON.parse(data)
            let product = data.find(pro => pro.id == id)
            if (product) {
                data = data.filter(pro => pro.id != id)
                data = JSON.stringify(data,null,3)
                await fs.promises.writeFile(this.fileName, data)
                return data
            } else {
                return null
            }            
        } catch (error) {
            console.error(error)
        }
    }

}