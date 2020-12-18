import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import User from '../models/User';
import Conversation from '../models/Conversation';

dotenv.config();

class UserController {
    constructor() {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    async getAuthUser(request, response) {
        try {
            const user = await User.findById(
                request.user,
                'first_name last_name username gender image_path'
            );
            response.status(200).json({ user });
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    async getContactInfo(request, response) {
        try {
            const user = await User.findById(
                request.query.id,
                'first_name last_name gender image_path'
            );
            response.status(200).json({
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    gender: user.gender,
                    image_path: user.image_path
                        ? user.image_path.replace(
                              /\/image\/upload\//,
                              '/image/upload/w_33,h_33/'
                          )
                        : null,
                },
            });
        } catch (error) {
            response.status(500).send(error.message);
        }
    }

    getAll(request, response) {
        User.findById(request.user, async (err, user) => {
            try {
                const users = await User.find(
                    { _id: { $nin: [request.user, ...user.contacts] } },
                    'first_name last_name username gender image_path'
                );
                response.status(200).json({ users });
            } catch (error) {
                response.status(500).send(error.message);
            }
        });
    }

    getContacts(request, response) {
        User.findById(request.user)
            .populate({
                path: 'conversations',
                populate: {
                    path: 'users',
                    select: [
                        'first_name',
                        'last_name',
                        'gender',
                        'image_path',
                        'online',
                    ],
                    match: { _id: { $nin: [request.user._id] } },
                },
                match: { createdAt: { $lt: new Date(request.body.date) } },
                options: {
                    sort: { createdAt: -1 },
                    limit: 10,
                },
            })
            .exec((err, { conversations }) => {
                const contacts = conversations.map(c => ({
                    _id: c._id,
                    user: c.users[0],
                }));
                const date = conversations.length
                    ? conversations[conversations.length - 1].createdAt
                    : null;

                return response.json({ contacts, date });
            });
    }

    async update(request, response) {
        try {
            await User.updateOne(
                { _id: request.user },
                { $set: request.body },
                { runValidators: true }
            );
            return response.json({ message: 'Success!' });
        } catch (error) {
            return response.status(422).json(error.errors);
        }
    }

    addToContacts(request, response) {
        User.findById(request.user._id, async (err, user) => {
            if (user.contacts.indexOf(request.body.id) !== -1) {
                return response
                    .status(400)
                    .send('User already exists in your contacts.');
            }

            const convo = new Conversation({
                adder: request.user._id,
                added: request.body.id,
                users: [request.user._id, request.body.id],
                messages: [],
            });

            try {
                await Promise.all([
                    User.updateOne(
                        { _id: request.user._id },
                        {
                            $push: {
                                contacts: request.body.id,
                                conversations: convo._id,
                            },
                        }
                    ),
                    User.updateOne(
                        { _id: request.body.id },
                        {
                            $push: {
                                contacts: request.user._id,
                                conversations: convo._id,
                            },
                        }
                    ),
                ]);

                convo.save(() => {
                    User.findById(
                        request.body.id,
                        'first_name last_name gender image_path online',
                        (err, user) => {
                            response.json({
                                contact: {
                                    _id: convo._id,
                                    user,
                                    createdAt: convo.createdAt,
                                },
                            });
                        }
                    );
                });
            } catch (error) {
                response.status(500).send(error);
            }
        });
    }

    uploadImage(request, response) {
        cloudinary.uploader.upload(
            request.file.path,
            { folder: 'chat' },
            (error, result) => {
                if (error) {
                    return response.status(500).send(error);
                }

                const id = result.public_id.replace(/\//, '%2F');

                return response.json({ id, path: result.secure_url });
            }
        );
    }

    deleteImage(request, response) {
        cloudinary.uploader.destroy(request.query.id, () => {
            return response.json({ message: 'Success!' });
        });
    }
}

const userController = new UserController();

export default userController;
