'use strict';

const { Booking,User,Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bookingData = [
  // {
  //   name: "App Academy",
  //   username: "JohnSmith",
  //   startDate: "2021-11-19",
  //   endDate: "2021-11-20"
  // },
  // {
 
   
  //   username: 'Demo-lition',
  //   name: "App Academy",
  //   startDate:'2022-01-23',
  //   endDate:'2022-01-24'
  // },
  {
  
    username: 'Demo-lition',
    name:'mars hotel',
    startDate:'2023-01-23',
    endDate:'2023-01-24'
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
    // await Booking.bulkCreate(bookingData,{validate:true})
    for (let book of bookingData){
      const {  username, name,startDate,endDate} = book;
      const founduser = await User.findOne({
        where:{
          username
        }
      });
      console.log(founduser.id);
      const foundspot = await Spot.findOne({
        where:{
           name
        }
      });
      await Booking.create({
        'spotId':foundspot.id,'userId':founduser.id,
        startDate,endDate
      },options)
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      return queryInterface.bulkDelete(options,null,{})
  }
};
