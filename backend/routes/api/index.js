// backend/routes/api/index.js
const router = require('express').Router();
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotRouter = require('./spots.js');
const reviewRouter = require('./reviews.js');
const bookingRouter = require('./bookings.js');
const spotimageRouter = require('./spot-images.js');
const reviewImageRouter = require('./review-images.js');
const { restoreUser } = require('../../utils/auth.js');
const {Spot,Review,SpotImage,sequelize} = require('../../db/models');
const { Op } = require("sequelize");
// const { requireAuth,restoreUser, setTokenCookie } = require('../../utils/auth.js');

// backend/routes/api/index.js
// ...

// router.post('/test', function(req, res) {
  
//     res.json({ requestBody: req.body });
//    });

   

// ...
 // backend/routes/api/index.js
// ...

// GET /api/set-token-cookie

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'Demo-lition'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });
 
// backend/routes/api/index.js
// ...

// GET /api/restore-user


// router.use(restoreUser);

// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// ...

// backend/routes/api/index.js
// ...

// router.use(restoreUser);

// ...

// GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// ...
router.use(restoreUser);

router.get('/spots/current', async (req, res)=>{
    
  // console.log(secretKey);
  const { user } = req;
  console.log(user);


  if(user){
    try{
   
    const foundSpot = await Spot.findAll({
      attributes:['id','ownerId','address','city','state','country','lat','lng','name', 'description','price','createdAt','updatedAt',[sequelize.fn('AVG',sequelize.col('stars')),'avgRating']],
  
      where:{
        ownerId:user.id
      },
      include:[{
                model:Review,
            },
            {
               model: SpotImage,
               as:'previewImage',
             
             
            }],
 
    })
    res.setHeader('Content-Type','application/json');
    res.json({
   
       "Spots": foundSpot
      
    });

    }catch(error){
       
      return res.json(error);
    
      // res.json({
      //   "message": "Spot couldn't be found"
      // });
    }
    }
    else{
      res.setHeader('Content-Type','application/json');
      res.status(401);
      return res.json(user)
  }
  
  return res.json(user)
})




router.use('/session', sessionRouter);
router.use('/spot-images',spotimageRouter);
router.use('/review-images',reviewImageRouter);
router.use('/users', usersRouter);
router.use('/reviews',reviewRouter);
router.use('/bookings',bookingRouter);
router.use('/spots',spotRouter);
router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;