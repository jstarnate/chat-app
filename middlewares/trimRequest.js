export default (request, response, next) => {
	const keys = Object.keys(request.body)
	const body = {}

	keys.forEach(key => {
		if (typeof request.body[key] === 'string') {
			body[key] = request.body[key].trim()
		}
		else {
			body[key] = request.body[key]
		}
	})

	request.body = body

	next()
}