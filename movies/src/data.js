import User from "./models/User.js"
import Movie from "./models/Movie.js"
import Pizza from "./models/Pizza.js"
import "dotenv/config.js"
import "../src/server.js"
import { faker } from "@faker-js/faker"

const createData = async (users,movies) => {
    try {
        for (let i = 1; i <= movies; i++) {
            const randomTitle = faker.music.songName()
            const randomCapacity = Math.ceil(Math.random() * 100000)
            const randomPrice = Math.ceil(Math.random() * 100)
            await Movie.create({ title: randomTitle, capacity: randomCapacity, price: randomPrice })
        }
        for (let j = 1; j <= users; j++) {
            const randomName = faker.person.firstName()
            const randomAge =  Math.ceil(Math.random() * 100)
            await User.create({ name: randomName, age: randomAge })
        }
        console.log("data created!");
    } catch (error) {
        console.log(error);
    }
};
//createData(100,5000);

const pizzas = [
    { name: 'Cheese', size: 'small', price: 10, quantity: 12, date: new Date(2023,6,1) },
    { name: 'Cheese', size: 'large', price: 20, quantity: 13, date: new Date(2023,6,1) },
    { name: 'Pepperoni', size: 'small', price: 10, quantity: 8, date: new Date(2023,6,1) },
    { name: 'Pepperoni', price: 15, quantity: 7, date: new Date(2023,6,1) },
    { name: 'Vegan', size: 'small', price: 10, quantity: 9, date: new Date(2023,6,1) },
    { name: 'Vegan', price: 15, quantity: 6, date: new Date(2023,6,1) },
    { name: 'Cheese', size: 'small', price: 10, quantity: 12, date: new Date(2023,6,2) },
    { name: 'Cheese', price: 15, quantity: 8, date: new Date(2023,6,2) },
    { name: 'Pepperoni', price: 15, quantity: 7, date: new Date(2023,6,2) },
    { name: 'Vegan', size: 'small', price: 10, quantity: 16, date: new Date(2023,6,2) },
    { name: 'Vegan', price: 15, quantity: 2, date: new Date(2023,6,2) },
    { name: 'Vegan', size: 'large', price: 20, quantity: 14, date: new Date(2023,6,2) },
    { name: 'Cheese', price: 15, quantity: 12, date: new Date(2023,6,3) },
    { name: 'Pepperoni', size: 'small', price: 10, quantity: 16, date: new Date(2023,6,3) },
    { name: 'Pepperoni', price: 15, quantity: 15, date: new Date(2023,6,3) },
    { name: 'Pepperoni', size: 'large', price: 20, quantity: 10, date: new Date(2023,6,3) },
    { name: 'Vegan', size: 'small', price: 10, quantity: 9, date: new Date(2023,6,3) },
    { name: 'Vegan', price: 15, quantity: 11, date: new Date(2023,6,3) },
    { name: 'Cheese', size: 'small', price: 10, quantity: 12, date: new Date(2023,6,4) },
    { name: 'Cheese', size: 'large', price: 20, quantity: 13, date: new Date(2023,6,4) },
    { name: 'Pepperoni', size: 'small', price: 10, quantity: 8, date: new Date(2023,6,4) },
    { name: 'Pepperoni', price: 15, quantity: 7, date: new Date(2023,6,4) },
    { name: 'Vegan', size: 'small', price: 10, quantity: 9, date: new Date(2023,6,4) },
    { name: 'Vegan', price: 15, quantity: 6, date: new Date(2023,6,4) }
]
Pizza.insertMany(pizzas).then(()=>console.log('ok')).catch(err=>console.log(err))