const { Comment } = require('../models');
const seedPosts = require('./postData');
var colors = require('colors');
colors.enable();

const seedComments = async () => {
    // run seedPosts for access to key-value pairs (originally created in userData.js)
    const userMap = await seedPosts();
    console.log('\n----- Posts seeded, moving onto Comments... -----\n'.yellow);

    // array of comment data to seed
    const commentData = [
        {
            date_created: "2023-11-11", 
            content: "Hi, Ian!",
            user_id: userMap.get("rm@bts.com").id, // user_id referencing Namjoon Kim
            post_id: 1,
        },
        {
            date_created: "2023-11-11",
            content: "Welcome, Ian!",
            user_id: userMap.get("jin@bts.com").id, // user_id referencing Seokjin Kim
            post_id: 1,
        },
        {
            date_created: "2023-11-11", 
            content: "Glad to have you here!",
            user_id: userMap.get("suga@bts.com").id, // user_id referencing Yoongi Min
            post_id: 1,
        },
        {
            date_created: "2023-11-11", 
            content: "Excited that you're here!",
            user_id: userMap.get("jhope@bts.com").id, // user_id referencing Hoseok Jung
            post_id: 1,
        },
        {
            date_created: "2023-11-11", 
            content: "Ian! Hello!",
            user_id: userMap.get("jimin@bts.com").id, // user_id referencing Jimin Park
            post_id: 1,
        },
        {
            date_created: "2023-11-11", 
            content: "Welcome!",
            user_id: userMap.get("v@bts.com").id, // user_id referencing Taehyung Kim
            post_id: 1,
        },
        {
            date_created: "2023-11-11", 
            content: "Hi, Ian! I like your name :)",
            user_id: userMap.get("jungkook@bts.com").id, // user_id referencing Jungkook Jeon
            post_id: 1,
        },
    ];

    // create comments in db
    await Comment.bulkCreate(commentData);

};


module.exports = seedComments;