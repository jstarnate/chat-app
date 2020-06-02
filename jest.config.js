module.exports = {
	moduleNameMapper: {
		'Components(.*)$': '<rootDir>/client/js/components/$1',
		'Utilities(.*)$': '<rootDir>/client/js/utilities/$1',
		'Hooks(.*)$': '<rootDir>/client/js/hooks/$1',
		'Store(.*)$': '<rootDir>/client/js/store/$1',
		'Actions': '<rootDir>/client/js/store/actions.js'
	}
}