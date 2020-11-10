const usernames = [
    {
        first_name: 'Bruce',
        last_name: 'Wayne',
        username: 'batman',
        gender: 'Male',
    },
    {
        first_name: 'Tony',
        last_name: 'Stark',
        username: 'ironman',
        gender: 'Male',
    },
    {
        first_name: 'Diana',
        last_name: 'Prince',
        username: 'wonder.woman',
        gender: 'Female',
    },
    {
        first_name: 'Slade',
        last_name: 'Wilson',
        username: 'deathstroke',
        gender: 'Male',
    },
    {
        first_name: 'Clark',
        last_name: 'Kent',
        username: 'superman',
        gender: 'Male',
    },
    {
        first_name: 'Natasha',
        last_name: 'Romanoff',
        username: 'black.widow',
        gender: 'Female',
    },
    {
        first_name: 'Hal',
        last_name: 'Jordan',
        username: 'green.lantern',
        gender: 'Male',
    },
    {
        first_name: 'Selena',
        last_name: 'Kyle',
        username: 'catwoman',
        gender: 'Female',
    },
    {
        first_name: 'Bucky',
        last_name: 'Barnes',
        username: 'winter.soldier',
        gender: 'Male',
    },
    {
        first_name: 'Frank',
        last_name: 'Castle',
        username: 'punisher',
        gender: 'Male',
    },
    {
        first_name: 'Lex',
        last_name: 'Luthor',
        username: 'anti.et',
        gender: 'Male',
    },
    {
        first_name: 'Barry',
        last_name: 'Allen',
        username: 'flashmob',
        gender: 'Male',
    },
    {
        first_name: 'Steven',
        last_name: 'Rogers',
        username: 'cpt.us',
        gender: 'Male',
    },
    {
        first_name: 'Kara',
        last_name: 'Zor-el',
        username: 'supergirl',
        gender: 'Female',
    },
    {
        first_name: 'Stephen',
        last_name: 'Strange',
        username: 'dr.magic',
        gender: 'Male',
    },
];

const factory = list => {
    const seed = list.map(item => ({
        first_name: item.first_name,
        last_name: item.last_name,
        username: item.username,
        gender: item.gender,
        password:
            '$2b$10$ace85dAegGDRB8TVanj7WesuOKBCL/.3MzqM9IX9DH4gHhsGtTJOm',
    }));

    return seed;
};

export default factory(usernames);
