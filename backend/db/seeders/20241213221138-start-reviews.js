'use strict';
const { Review, User, Spot } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewData = [
  // {
  
  //   username: "JohnSmith",
  //   name: "App Academy",

  //   review: 'like it',
  //   stars: 3
  // },
  {
    // userId:2,
    username: 'Demo-lition',
    name: 'moon hotel',
    // spotId:1,
    review: 'not like it',
    stars: 5.0
  },
  {
    // userId:2,
    username: 'FakeUser1',
    name: 'mercury hotel',
    // spotId:1,
    review: 'like it',
    stars: 4.0
  }
  ,
  {
    // userId:2,
    username: 'Demo-lition',
    name: 'venus hotel',
    // spotId:1,
    review: 'like it,yeah',
    stars: 5.0
  }
  ,
  {
    // userId:2,
    username: 'FakeUser1',
    name: 'saturn hotel',
    // spotId:1,
    review: 'like it,like it',
    stars: 5.0
  }
  ,
  {
    // userId:2,
    username: 'FakeUser2',
    name: 'saturn hotel',
    // spotId:1,
    review: 'like it,like it',
    stars: 4.0
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //  await Review.bulkCreate(reviewData,{
  //   validate:true
  //  })
      for (let rev of reviewData) {
        const { username,name,review,stars} = rev;
        const founduser = await User.findOne({
          where:{
            username
          }
        });
        const foundspot = await Spot.findOne({
          where:{
            name
          }
        });
        await Review.create({
          review,stars,'userId':founduser.id,'spotId':foundspot.id
        })
      }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options,null,{});
  }
};
