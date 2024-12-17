const express = require('express');

const router = express.Router();

const {Spot,  User,Booking} = require('../../db/models');

const { requireAuth,restoreUser, setTokenCookie } = require('../../utils/auth');

router.get('/current', requireAuth,async (req,res)=>{
    const {user} = req;
    // console.log(typeof user.id)
  const foundbookins = await Booking.findAll({
     
        include:{
            model:User,
            where:{
                id:user.id
            }
        }
  });
  res.status(200);
  res.json({
    user,
    // foundbookins
    "hello":"world"
  })
})

router.put('/:bookingId', requireAuth,async (req, res)=>{
  const bookid = req.params.bookingId;
  const {startDate,endDate} = req.body;
  const foundbook = await Booking.findByPk(Number(bookid));
  

  if(!foundbook){
    res.status(404);
    return res.json(
      {
        "message": "Spot couldn't be found"
      }
    )
  }

 

const enddate = new Date(endDate);

 console.log(enddate,foundbook.endDate);

  if(foundbook.endDate>enddate ) {
    res.status(403);
    return res.json({
      "message": "Past bookings can't be modified"
    });
  }

  const {user} = req;
  if(user.id !== foundbook.userId){
    return res.json({
      "message":"it's not your booking"
    })
  }
  try{
    if(startDate) foundbook.startDate=startDate;
    if(endDate) foundbook.endDate=endDate;
    res.status(200);
    res.json(foundbook);
  }catch(error){
    res.status(400);
    return res.json(
      {
        "message": "Bad Request", 
        "errors": {
          "startDate": "startDate cannot be in the past",
          "endDate": "endDate cannot be on or before startDate"
        }
      }
    )
  }
})

router.delete('/:bookingId',requireAuth, async (req, res)=>{
  const {user} = req;
  const bookingid = req.params.bookingId;
  const foundbook = await Booking.findByPk(Number(bookingid));
  if(!foundbook) {
    res.status(404);
    return res.json(
      {
        "message": "Booking couldn't be found"
      }
    )
  };
  
  const foundSpot = await Spot.findOne({
    where:{
      id:foundbook.spotId
    }
  })

  if(user.id !== foundbook.userId && foundSpot.ownerId !== user.id){
       return res.json({
        'message':"it's not your book"
       })
  }

  const currentDate = new Date();
  if (currentDate> foundbook.startDate) {
      res.status(403);
      return res.json(
        {
          "message": "Bookings that have been started can't be deleted"
        }
      )
  }

  await foundbook.destroy();
  res.status(200);
  res.json({
    "message": "Successfully deleted"
  })
})
module.exports = router;