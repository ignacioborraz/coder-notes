const Container = require('./Container.js')
let products = new Container('products.txt')

module.exports = products

let test1 = async () => {
    try {
        console.log(products)
        await products.save({
            title: 'Escuadra',                     
            price: 123.45,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        })
        await products.save({
            title: 'Calculadora',
            price: 234.56,       
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
        })
        await products.save({
            title: 'Globo Terráqueo',
            price: 345.67,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        })
    } catch(error) {
        console.log(error)
    }
}
//test1()

let test2 = async () => {
    try {
        let products = await new Container('products2.txt')
        let p1 = await products.save({
            title: 'Escuadra',                     
            price: 123.45,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        })
        //console.log(p1)
        let p2 = await products.save({
            title: 'Calculadora',
            price: 234.56,       
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
        })
        //console.log(p2)
                let p3 = await products.save({
            title: 'Globo Terráqueo',
            price: 345.67,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        })
        console.log(await products.getById(1))
        console.log(await products.getById(5))
    } catch(error) {
        console.log(error)
    }
}
//test2()

let test3 = async () => {
    try {
        let products = await new Container('products3.txt')
        let p1 = await products.save({
            title: 'Escuadra',                     
            price: 123.45,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        })
        //console.log(p1)
        let p2 = await products.save({
            title: 'Calculadora',
            price: 234.56,       
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
        })
        //console.log(p2)
        let p3 = await products.save({
            title: 'Globo Terráqueo',
            price: 345.67,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        })
        //console.log(p3)
        console.log(await products.getAll())        
    } catch(error) {
        console.log(error)
    }
}
//test3()

let test4 = async () => {
    try {
        let products = await new Container('products4.txt')
        let p1 = await products.save({
            title: 'Escuadra',                     
            price: 123.45,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        })
        //console.log(p1)
        let p2 = await products.save({
            title: 'Calculadora',
            price: 234.56,       
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
        })
        //console.log(p2)
        let p3 = await products.save({
            title: 'Globo Terráqueo',
            price: 345.67,           
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        })
        //console.log(p3)
        await products.deleteById(2)
        console.log(await products.getAll())
    } catch(error) {
        console.log(error)
    }
}
//test4()

let test5 = async () => {
    let products = await new Container('products5.txt')
    await products.save({
        title: 'Escuadra',       
        price: 123.45,           
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
    })
    await products.save({
        title: 'Calculadora',
        price: 234.56,       
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
    })
    await products.save({
        title: 'Globo Terráqueo',
        price: 345.67,           
        thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
    })
    await products.createOrReset('clean container')
}
//test5()