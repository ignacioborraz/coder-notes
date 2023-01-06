const { faker } = require("@faker-js/faker")
const { name, datatype, image } = faker

faker.locale = "es"

const generateUser = () => {
	return {
		last_name: name.lastName(),
		age: datatype.number({ min: 18, max: 100 }),
		nick: `${name.middleName()}-${datatype.number({ min: 0, max: 1000 })}`,
		photo: image.avatar(300, 300, true)
	}
}

module.exports = generateUser