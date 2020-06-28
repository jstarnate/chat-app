const usernames = [
	{ first_name: 'Luffy', last_name: 'Monkey', username: 'strawhat', gender: 'Male' },
	{ first_name: 'Franky', last_name: 'Cyborg', username: 'franky', gender: 'Male' },
	{ first_name: 'Chopper', last_name: 'Moose', username: 'chopper', gender: 'Male' },
	{ first_name: 'Jinbei', last_name: 'Fishman', username: 'jinbei', gender: 'Male' },
	{ first_name: 'Akainu', last_name: 'Sakazuki', username: 'akainu', gender: 'Male' },
	{ first_name: 'Kizaru', last_name: 'Borsalino', username: 'kizaru', gender: 'Male' },
	{ first_name: 'Kuzan', last_name: 'Aokiji', username: 'aokiji', gender: 'Male' },
	{ first_name: 'Sengoku', last_name: 'Buddha', username: 'sengoku', gender: 'Male' },
	{ first_name: 'Smoker', last_name: 'Cigars', username: 'smoker', gender: 'Male' },
	{ first_name: 'Mihawk', last_name: 'Hawkeye', username: 'mihawk', gender: 'Male' },
	{ first_name: 'Doflamingo', last_name: 'Donquixote', username: 'doflamingo', gender: 'Male' },
	{ first_name: 'Crocodile', last_name: 'Sandman', username: 'crocodile', gender: 'Male' },
	{ first_name: 'Ivankov', last_name: 'Emporio', username: 'ivankov', gender: 'Male' },
	{ first_name: 'Dragon', last_name: 'Monkey', username: 'dragon', gender: 'Male' },
	{ first_name: 'Magellan', last_name: 'Warden', username: 'magellan', gender: 'Male' }
]

const factory = (list) => {
	const seed = list.map(item => ({
		first_name: item.first_name,
		last_name: item.last_name,
		username: item.username,
		gender: item.gender,
		password: '$2b$10$ace85dAegGDRB8TVanj7WesuOKBCL/.3MzqM9IX9DH4gHhsGtTJOm'
	}))

	return seed
}

export default factory(usernames)