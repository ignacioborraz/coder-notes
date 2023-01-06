const { faker } = require("@faker-js/faker")
const { commerce, datatype, image } = faker

faker.locale = "es"

const generateProducts = (productQty) => {
	let products = [];
	for (let item = 0; item < productQty; item++) {
		const product = {
			id: item + 1,
			title: commerce.product(),
			description: commerce.productDescription(),
			price: datatype.number({ min: 1, max: 100 }),
			code: datatype.uuid(),
			stock: datatype.number({ min: 100, max: 10000 }),
			category: commerce.department(),
			thumbnail: image.image(300, 300, true),
			status: datatype.boolean(),
		};
		products.push(product);
	}
	return products;
};

module.exports = generateProducts