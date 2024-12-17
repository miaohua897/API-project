'use strict';

const { ReviewImage, Review } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const riData = [
  // {
    // reviewId:1,
    // name:'mars hotel',
  //   review: 'like it',
  //   url:'www.example.com',
  // },
  {
    // reviewId:2,
    // name:'mars hotel',
    review: 'not like it',
    url:'www.example2.com',
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
  //  await ReviewImage.bulkCreate(riData,{
  //   validate:true
  //  })
    for (let ri of riData){
      const {review, url} = ri;
      const foundreview = await Review.findOne({
        where:{
          review
        }
      });

      await ReviewImage.create({
        'reviewId':foundreview.id,url
      },options)
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
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
