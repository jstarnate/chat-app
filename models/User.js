import { Schema, model } from 'mongoose';
import { compareSync } from 'bcrypt';

const userSchema = new Schema(
    {
        first_name: {
            required: [true, 'First name is required.'],
            type: String,
            trim: true,
            minlength: [2, 'Must be at least 2 characters long.'],
            set(value) {
                return value.replace(/\b[a-z]/g, match => match.toUpperCase());
            },
        },
        last_name: {
            required: [true, 'Last name is required.'],
            type: String,
            trim: true,
            minlength: [2, 'Must be at least 2 characters long.'],
            set(value) {
                return value.replace(/\b[a-z]/g, match => match.toUpperCase());
            },
        },
        username: {
            required: [true, 'Username is required.'],
            unique: true,
            type: String,
            trim: true,
            minlength: [6, 'Must be at least 6 characters long.'],
            maxlength: [20, 'Must not exceed to more than 20 characters.'],
        },
        gender: {
            required: [true, 'What is your gender?'],
            type: String,
            enum: ['Male', 'Female'],
        },
        image_path: {
            type: String,
            default: null,
        },
        password: {
            required: [true, 'Password is required.'],
            type: String,
            trim: true,
            minlength: [8, 'Must be at least 8 characters long.'],
        },
        online: {
            type: Boolean,
            default: false,
        },
        messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
        conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
        contacts: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    }
);

userSchema.methods.validPassword = function (password) {
    return compareSync(password, this.password);
};

export default model('User', userSchema);
