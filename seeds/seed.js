const sequelize = require('../config/connection');
const { User, Post, Category } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const categoryData = require('./categoryData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(postData);
    await Category.bulkCreate(categoryData);

    process.exit(0);
};

seedDatabase();
