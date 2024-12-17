const express = require('express');
const router = express.Router();
const { requireAuth,restoreUser, setTokenCookie } = require('../../utils/auth');
const {Spot, Review,sequelize,ReviewImage,SpotImage, User} = require('../../db/models');

router.delete('/:imageId', async (req,res)=>{

  const {user} = req;
  console.log(user);
    if(!user) {
        res.status(401);
        return res.json({
            "message":"havent log in"
        })
    }

    const imageid = req.params.imageId;
    const foundreviewimage = await ReviewImage.findByPk(Number(imageid));
    if(!foundreviewimage) {
        res.status(404);
        return res.json({
            "message": "Review Image couldn't be found"
          })
    }

    const foundReview = await Review.findOne({
      where:{
        id:foundreviewimage.reviewId
      }
    });

    if(foundReview.userId !== user.id) {
      res.status(403);
      return res.json({
          "message":"it is not yours"
      })
    }

    await foundreviewimage.destroy();
    res.status(200);
    res.setHeader("Content-Type","application/json")
    return res.json({"message": "Successfully deleted"
      });
})

module.exports = router;