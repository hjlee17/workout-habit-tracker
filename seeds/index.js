const sequelize = require('../config/connection');
const seedComments = require('./commentData');
var colors = require('colors');
colors.enable();

// seedComments calls seedPosts which calls seedUsers

const seedDatabase = async () => {
    // force true - tells Sequelize to drop all existing tables in the database 
    await sequelize.sync({ force: true });
  
    await seedComments();
    console.log('\n----- Comments Seeded... -----\n'.yellow);

    console.log('\n----- Users, Posts, Comments have all been seeded. -----\n'.bold.green);

    process.exit(0);
  };
  
seedDatabase();
