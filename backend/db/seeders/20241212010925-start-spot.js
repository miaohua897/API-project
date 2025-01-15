'use strict';

const { Spot, User } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotData = [

  {
    username: 'Demo-lition',
    address:'mars',
    city:'mars_x',
    state:'CA',
    country:'Mars',
    lat:36,
    lng:-121,
    name:'mars hotel',
    description:'transportion is excluded',
    price:154
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
    price:160
  },
  
  {
    username: 'Demo-lition',
    address:'mercury',
    city:'mercury_x',
    state:'CA',
    country:'Mercury',
    lat:37,
    lng:-122,
    name:'mercury hotel',
    description:'transportion is excluded',
    price:150
  },
  
  {
    username: 'FakeUser1',
    address:'venus',
    city:'venus_x',
    state:'CA',
    country:'Venus',
    lat:37,
    lng:-122,
    name:'venus hotel',
    description:'transportion is excluded',
    price:199
  }
  ,
  {
    username: 'FakeUser1',
    address:'jupiter',
    city:'jupiter_x',
    state:'CA',
    country:'Jupiter',
    lat:37,
    lng:-122,
    name:'jupiter hotel',
    description:'transportion is excluded',
    price:150
  },
  {
    username: 'Demo-lition',
    address:'saturn',
    city:'saturn_x',
    state:'CA',
    country:'Saturn',
    lat:37,
    lng:-122,
    name:'saturn hotel',
    description:'transportion is excluded',
    price:100
  }
  ,
  {
    username: 'FakeUser1',
    address:'uranus',
    city:'uranus_x',
    state:'CA',
    country:'Uranus',
    lat:37,
    lng:-122,
    name:'uranus hotel',
    description:'transportion is excluded',
    price:150
  }
  ,
  {
    username: 'Demo-lition',
    address:'neptune',
    city:'neptune_x',
    state:'CA',
    country:'Neptune',
    lat:37,
    lng:-122,
    name:'neptune hotel',
    description:'transportion is excluded',
    price:120
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
