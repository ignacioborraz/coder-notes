class User {
	constructor(name, lastName, books, pets) {
		this.name = name
		this.lastName = lastName
		this.books = books
		this.pets = pets
	}

	getFullName() {
		return `${this.name} ${this.lastName}`
	}

	addPet(petName) {
		this.pets.push(petName);
	}

	countPets() {
		return this.pets.length
	}

	addBook(name, author) {
		this.books.push({ name: name, author: author })
	}

	getBookNames() {
		return this.books.map((book) => book.name)
	}
}

let user = new User("Ignacio", "Borraz", [{name: "Harry Potter", author: "Rowling"},{name: "El Principito", author: "Saint-Exupéry"}], ["Tres"])
console.log(user.getFullName())
user.addPet('Clarita')
user.addBook("El señor de los anillos","Tolkien")
console.log(user.countPets())
console.log(user.getBookNames())