import bcrypt from 'bcrypt'
import { name, internet, random } from 'faker'

const factory = (count) => {
	const seed = []
	const password = bcrypt.hashSync('password', 10)
	const genders = ['Male', 'Female']

	for (let i = 1; i <= count; i++) {
		seed.push({
			first_name: name.firstName(),
			last_name: name.lastName(),
			username: internet.userName(),
			gender: random.arrayElement(genders),
			password
		})
	}

	return seed
}

export default factory(10)