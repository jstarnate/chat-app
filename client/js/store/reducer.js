export default (state, action) => {
	if (action.type === 'SET') {
		state[action.name] = action.payload
		return state
	}

	if (action.type === 'ADD') {
		state[action.name] = [ action.payload, ...state[action.name] ]
		return state
	}

	if (action.type === 'PUSH') {
		state[action.name] = [ ...state[action.name], action.payload ]
		return state
	}

	if (action.type === 'DELETE') {
		const filtered = state[action.name].filter(item => item._id !== action.id)

		state[action.name] = filtered

		return state
	}

	return state
}