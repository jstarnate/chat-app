import { Schema, model } from 'mongoose';
import { compareSync } from 'bcrypt';

const userSchema = new Schema({
	first_name: {
		required: [true, 'First name is required.'],
		type: String,
		minlength: [2, 'Must be at least 2 characters long.']
	},
	last_name: {
		required: [true, 'Last name is required.'],
		type: String,
		minlength: [2, 'Must be at least 2 characters long.']
	},
	username: {
		required: [true, 'Username is required.'],
		unique: true,
		type: String,
		minlength: [6, 'Must be at least 6 characters long.'],
		maxlength: [20, 'Must not exceed to more than 20 characters.']
	},
	gender: {
		required: [true, 'What is your gender?'],
		type: String
	},
	image_path: {
		type: String,
		default: null
	},
	password: {
		required: [true, 'Password is required.'],
		type: String,
		minlength: [8, 'Must be at least 8 characters long.']
	},
	messages: [
		{ type: Schema.Types.ObjectId, ref: 'Message' }
	],
	contacts: [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	],
	sentRequests: [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	],
	receivedRequests: [
		{ type: Schema.Types.ObjectId, ref: 'User' }
	]
}, {
	timestamps: true
});

userSchema.methods.validPassword = function(password) {
	return compareSync(password, this.password);
}

export default model('User', userSchema);