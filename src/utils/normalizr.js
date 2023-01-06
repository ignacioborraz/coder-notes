const util = require("util")
const { normalize, schema, denormalize } = require("normalizr")

const print = (objeto) => util.inspect(objeto, false, 9, true)

const userSchema = new schema.Entity("user", {}, { idAttribute: 'nick' })
const messageSchema = new schema.Entity("message", { "user": userSchema }, { idAttribute: '_id' })
const messagesSchema = new schema.Entity("messages", { "messages": [messageSchema] })

const normalizeMessages = (messages) => {
	const data = { id: "last_ten_messages", messages }
	const normalizedData = normalize(data, messagesSchema)
	return normalizedData
}

module.exports = normalizeMessages