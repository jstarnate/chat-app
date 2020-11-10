import seeder from 'mongoose-seed';
import path from 'path';
import users from './users.seeder';

const seeds = [
    {
        model: 'User',
        documents: users,
    },
];

const models = ['User', 'Conversation', 'Message'];

seeder.connect(process.env.MONGO_URI, { useUnifiedTopology: true }, () => {
    seeder.loadModels(
        models.map(model => path.resolve(__dirname, `../models/${model}.js`))
    );

    seeder.clearModels(models, () => {
        seeder.populateModels(seeds, () => {
            seeder.disconnect();
        });
    });
});
