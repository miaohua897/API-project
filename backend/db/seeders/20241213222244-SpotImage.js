'use strict';

const { SpotImage,Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotIm = [
 
  {
    name: 'moon hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/eight_mezc8g?_a=BAMCkGfi0',
    preview:true
  },
  {
    name: 'mars hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/seven_wae2mi?_a=BAMCkGfi0',
    preview:true
  }
  ,
  {
    name: 'mercury hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/six_mhpcho?_a=BAMCkGfi0',
    preview:true
  }
  ,
  {
    name: 'venus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/five_g3knqe?_a=BAMCkGfi0',
    preview:true
  }
  ,
  {
    name: 'saturn hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/four_tfdial?_a=BAMCkGfi0',
    preview:true
  }
  ,
  {
    name: 'uranus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/three_acew4z?_a=BAMCkGfi0',
    preview:true
  },
  {
    name: 'neptune hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/two_j0snl2?_a=BAMCkGfi0',
    preview:true
  },
  {
    name: 'jupiter hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/one_vb8lyh?_a=BAMCkGfi0',
    preview:true
  },
  {
    name: 'moon hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/eight_mezc8g?_a=BAMCkGfi0',
    preview:false
  },
  {
    name: 'moon hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/eight_mezc8g?_a=BAMCkGfi0',
    preview:false
  },
  {
    name: 'moon hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/eight_mezc8g?_a=BAMCkGfi0',
    preview:false
  },
  {
    name: 'moon hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/eight_mezc8g?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'mars hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/seven_wae2mi?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'mars hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/seven_wae2mi?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'mars hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/seven_wae2mi?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'mars hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/seven_wae2mi?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'mercury hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/six_mhpcho?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'mercury hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/six_mhpcho?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'mercury hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/six_mhpcho?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'mercury hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/six_mhpcho?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'venus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/five_g3knqe?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'venus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/five_g3knqe?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'venus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/five_g3knqe?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'venus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/five_g3knqe?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'saturn hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/four_tfdial?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'saturn hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/four_tfdial?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'saturn hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/four_tfdial?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'saturn hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/four_tfdial?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'uranus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/three_acew4z?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'uranus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/three_acew4z?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'uranus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/three_acew4z?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'uranus hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/three_acew4z?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'neptune hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/two_j0snl2?_a=BAMCkGfi0',
    preview:false
  },
  {
    name: 'jupiter hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/one_vb8lyh?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'neptune hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/two_j0snl2?_a=BAMCkGfi0',
    preview:false
  },
  {
    name: 'jupiter hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/one_vb8lyh?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'neptune hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/two_j0snl2?_a=BAMCkGfi0',
    preview:false
  },
  {
    name: 'jupiter hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/one_vb8lyh?_a=BAMCkGfi0',
    preview:false
  }
  ,
  {
    name: 'neptune hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/two_j0snl2?_a=BAMCkGfi0',
    preview:false
  },
  {
    name: 'jupiter hotel',
    url:'https://res.cloudinary.com/dsgfqkf7n/image/upload/one_vb8lyh?_a=BAMCkGfi0',
    preview:false
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
    //  await SpotImage.bulkCreate(spotIm,{
    //   validate:true
    //  });
    for(let spot of spotIm){
      const {name,url,preview} = spot;
      const foundspot = await Spot.findOne({
        where:{
          name
        }
      });
      await SpotImage.create({
        "spotId":foundspot.id,url,preview
      },options)
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
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
