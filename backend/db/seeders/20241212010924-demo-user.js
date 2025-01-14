'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      // {

      //   firstName: "John",
      //   lastName: "Smith",
      //   email: "john.smith@gmail.com",
      //   username: "JohnSmith",
      //   hashedPassword: bcrypt.hashSync('secret password')
      // },
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        firstName:'Demtion',
        lastName:'DL',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName:'Faser1',
        lastName:'DL',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName:'Fer2',
        lastName:'DL',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    // return queryInterface.bulkDelete(options, {
    //   userName: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    // }, {});
    return queryInterface.bulkDelete(options,null,{});
  }
};

