const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user model associations
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', // when user is deleted, their posts are deleted
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE', // when user is deleted, their comments are deleted
});


// post model associations
Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE', // when post is deleted, corresponding comments are deleted
});


// comment model associations
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };
