// this file will access test objects saved in files inside this same folder to be sent to the database and populate it and mimic the actual behaviour of the application

const sequelize = require('../config/connection');
const { User, Comment, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require(`./commentData`);


// {force: true} deletes any previous data in the database. For development means only, please.


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });



  for (const post of postData) {
    const posts = await Post.bulkCreate({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });

    for (const comment of commentData) {
        await Comment.bulkCreate({
            ...comment, 
            user_id: users[Math.floor(Math.random() * users.length)].id,
            post_id: posts[Math.floor(Math.random() * posts.length)].id,
        })
      }
  }

  process.exit(0);
};

seedDatabase();
