const fs = require('fs')

module.exports = class Container {

    constructor(fileName) {
        this.fileName = fileName
        this.count = 0
        this.createOrReset('created')
    }
    
    async createOrReset(type) {
        try {
            await fs.promises.writeFile(`./storage/${this.fileName}`, "[]")
            console.log(`container ${type}`)
        } catch (error) {
            console.error(error)
        }
    }

    async save(product) {
        this.count ++
        try {
            let data = await fs.promises.readFile(`./storage/${this.fileName}`, "utf-8")
            data = JSON.parse(data)
            product = {
                ...product,
                id: this.count
            }
            data.push(product)
            data = JSON.stringify(data,null,3)
            await fs.promises.writeFile(`./storage/${this.fileName}`, data);
            return this.count
        } catch (error) {
            console.error("could't save")
        }
    }

    async getById(id) {
        try {
            let data = await fs.promises.readFile(`./storage/${this.fileName}`, "utf-8")
            data = JSON.parse(data)
            let product = data.find(pro => pro.id === id)
            return product ? product : null
        } catch (error) {
            console.error("could't get")
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(`./storage/${this.fileName}`, "utf-8")
            data = JSON.parse(data)
            return data ? data : null
        } catch (error) {
            console.error("could't get")
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile(`./storage/${this.fileName}`, "utf-8")
            data = JSON.parse(data)
            data = data.filter(pro => id !== pro.id)
            data = JSON.stringify(data,null,3)
            await fs.promises.writeFile(`./storage/${this.fileName}`, data);
        } catch (error) {
            console.error("could't delete")
        }
    }

}