'use strict';

const { Spot, User } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotData = [
  // {
  //   username: "JohnSmith",
  //   address: "123 Disney Lane",
  //   city: "San Francisco",
  //   state: "California",
  //   country: "United States of America",
  //   lat: 37.7645358,
  //   lng: -122.4730327,
  //   name: "App Academy",
  //   description: "Place where web developers are created",
  //   price: 123,
  
  // },
  {
    // ownerId:1,
    username: 'Demo-lition',
    address:'mars',
    city:'mars_x',
    state:'CA',
    country:'Mars',
    lat:36,
    lng:-121,
    name:'mars hotel',
    description:'transportion is excluded',
    price:150
  },
  {
    username: 'FakeUser1',
    address:'moon',
    city:'moon_x',
    state:'CA',
    country:'Moon',
    lat:37,
    lng:-122,
    name:'moon hotel',
    description:'transportion is excluded',
    price:150
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
  //  await Spot.bulkCreate(spotData,{validate:true})
    for(let spotsingle of spotData){
      const {address,city,state,country,lat,lng, name,description,price} = spotsingle;
      const founduser = await User.findOne({
        where :{
          username : spotsingle.username
        }
      });
      await Spot.create({
        address,city,state,country,lat,lng, name,description,price,'ownerId':founduser.id
      },options)
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
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
