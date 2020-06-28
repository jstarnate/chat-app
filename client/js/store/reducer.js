export default (state, action) => {
	if (action.type === 'SET') {
		state[action.name] = action.payload
		return state
	}

	if (action.type === 'ADD') {
		if (action.payload.constructor === Array)
			state[action.name] = [ ...action.payload, ...state[action.name] ]
		else
			state[action.name] = [ action.payload, ...state[action.name] ]
		
		return state
	}

	if (action.type === 'PUSH') {
		if (action.payload.constructor === Array)
			state[action.name] = [ ...state[action.name], ...action.payload ]
		else
			state[action.name] = [ ...state[action.name], action.payload ]
		
		return state
	}

	if (action.type === 'UPDATE') {
		state[action.name] = state[action.name].map(item => {
			if (item._id === action.id) {
				item = action.payload
			}

			return item
		})

		return state
	}

	if (action.type === 'UPDATE_STATUS') {
		const mapped = state.contacts.map(contact => {
			if (contact._id === action.id) {
				contact.online = action.boolean
			}

			return contact
		})

		state.contacts = mapped

		return state
	}

	if (action.type === 'DELETE') {
		const filtered = state[action.name].filter(item => item._id !== action.id)

		state[action.name] = filtered

		return state
	}

	return state
}