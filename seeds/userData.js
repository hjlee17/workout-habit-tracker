const { User } = require('../models');

const seedUsers = async () => {
    // array of user data to seed
    const userData = [
        {
            first_name: "Ian",
            last_name: "Lin",
            github: "zachsbrother",
            email: "user1@test.com", 
            password: "qwerty"
        },
        {
            first_name: "Namjoon",
            last_name: "Kim",
            github: "koya1994",
            email: "rm@bts.com", 
            password: "pass111"
        },
        {
            first_name: 'Seokjin',
            last_name: 'Kim',
            github: 'rj1992',
            email: 'jin@bts.com', 
            password: 'pass222'
        },
        {
            first_name: 'Yoongi',
            last_name: 'Min',
            github: 'shooky1993',
            email: 'suga@bts.com', 
            password: 'pass333'
        },
        {
            first_name: 'Hoseok',
            last_name: 'Jung',
            github: 'mang1994',
            email: 'jhope@bts.com', 
            password: 'pass444'
        },
        {
            first_name: 'Jimin',
            last_name: 'Park',
            github: 'chimmy1995',
            email: 'jimin@bts.com', 
            password: 'pass555'
        },
        {
            first_name: 'Taehyung',
            last_name: 'Kim',
            github: 'tata1995',
            email: 'v@bts.com', 
            password: 'pass666'
            },
        {
            first_name: 'Jungkook',
            last_name: 'Jeon',
            github: 'kooky1995',
            email: 'jungkook@bts.com', 
            password: 'pass777'
        }
    ];

    // create users in db 
    const seededUsers = await User.bulkCreate(userData, { individualHooks: true });

    // map for user reference with key value pair as email: is
    const userMap = new Map();
    seededUsers.forEach((user) => {
        userMap.set(user.email, user);
    });

    // return the created users to use in postData.js 
    return userMap;
};

module.exports = seedUsers;