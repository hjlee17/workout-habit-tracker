const { Post } = require('../models');
const seedUsers = require('./userData');
var colors = require('colors');
colors.enable();

const seedPosts = async () => {
    // run seedUsers for access to key-value pairs from userData.js
    const userMap = await seedUsers(); 
    console.log('\n----- Users seeded, moving onto Posts... -----\n'.yellow);

    // array of post data to seed
    const postData = [
        {
            title: "Hello, world!",
            date_created: "2023-11-10",
            content: "I was born on November 10, 2023.",
            user_id: userMap.get("user1@test.com").id, // user_id referencing Ian Lin
        },
        {
            title: "Intro: Persona",
            content: "from the album Map of the Soul: Persona",
            date_created: "2019-04-12", 
            user_id: userMap.get("rm@bts.com").id, // user_id referencing Namjoon Kim
        },
        {
            title: "Wildflower",
            content: "from the album Indigo",
            date_created: "2021-03-26", 
            user_id: userMap.get("rm@bts.com").id, // user_id referencing Namjoon Kim
        },
        {
            title: "Moon",
            content: "from the album Map of the Soul: 7",
            date_created: "2020-02-21", 
            user_id: userMap.get("jin@bts.com").id, // user_id referencing Seokjin Kim
        },
        {
            title: "The Astronaut",
            content: "released as a single",
            date_created: "2022-10-28", 
            user_id: userMap.get("jin@bts.com").id, // user_id referencing Seokjin Kim
        },
        {
            title: "Interlude: Shadow",
            content: "from the album Map of the Soul: 7",
            date_created: "2020-02-21", 
            user_id: userMap.get("jin@bts.com").id, // user_id referencing Yoongi Min
        },
        {
            title: "Agust D",
            content: "from the mixtape Agust D",
            date_created: "2016-08-15", 
            user_id: userMap.get("suga@bts.com").id, // user_id referencing Yoongi Min
        },
        {
            title: "Daechwita",
            content: "from the mixtape D-2",
            date_created: "2020-05-22", 
            user_id: userMap.get("suga@bts.com").id, // user_id referencing Yoongi Min
        },
        {
            title: "People Pt. 2",
            content: "from the album D-DAY, released 2023-04-21",
            date_created: "2023-04-07", 
            user_id: userMap.get("suga@bts.com").id, // user_id referencing Yoongi Min
        },
        {
            title: "Outro: Ego",
            content: "from the album Map of the Soul: 7",
            date_created: "2020-02-21",
            user_id: userMap.get("jhope@bts.com").id, // user_id referencing Hoseok Jung
        },
        {
            title: "More",
            content: "from the album Jack in the Box, released 2022-07-15",
            date_created: "2022-07-01", 
            user_id: userMap.get("jhope@bts.com").id, // user_id referencing Hoseok Jung
        },
        {
            title: "Serendipity",
            content: "from the album LOVE YOURSELF 結 'Answer'",
            date_created: "2018-08-24", 
            user_id: userMap.get("jimin@bts.com").id, // user_id referencing Jimin Park
        },
        {
            title: "Set Me Free Pt. 2",
            content: "from the album FACE, released 2023-03-24",
            date_created: "2023-03-17", 
            user_id: userMap.get("jimin@bts.com").id, // user_id referencing Jimin Park
        },
        {
            title: "Inner Child",
            content: "from the album Map of the Soul: 7",
            date_created: "2020-02-21", 
            user_id: userMap.get("v@bts.com").id, // user_id referencing Taehyung Kim
        },
        {
            title: "Love Me Again",
            content: "from the album Layover, released 2023-09-08",
            date_created: "2023-08-11", 
            user_id: userMap.get("v@bts.com").id, // user_id referencing Taehyung Kim
        },
        {
            title: "Euphoria",
            content: "from the album LOVE YOURSELF 結 'Answer'",
            date_created: "2018-08-24", 
            user_id: userMap.get("jungkook@bts.com").id, // user_id referencing Jungkook Jeon
        },
        {
            title: "Seven",
            content: "from the album GOLDEN, released 2023-11-03",
            date_created: "2023-07-14", 
            user_id: userMap.get("jungkook@bts.com").id, // user_id referencing Jungkook Jeon
        },
    ];

    // create posts in db
    await Post.bulkCreate(postData);

    // return userMap for use again in commentData.js
    return userMap;
};


module.exports = seedPosts;