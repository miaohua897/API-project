const express = require('express');
const router = express.Router();
const { requireAuth,restoreUser, setTokenCookie } = require('../../utils/auth');
const {Spot, Review,sequelize,ReviewImage,SpotImage, User} = require('../../db/models');
router.use(restoreUser);

router.get('/current',requireAuth, async (req,res)=>{

    const user = req.user;
    console.log(user);
    const foundReviews = await Review.findAll({
        where:{
            userId:user.id
        },
        include:[
            {
                model:Spot,
                include:[{
                    model:SpotImage,
                    as:'previewImage'
                }]
            },
            {
                model:ReviewImage
            },
            {
                model:User
            }
        ]
    });

    res.json({"Reviews":foundReviews} );

});

router.post('/:reviewId/images', async (req, res)=>{
    const reviewid = req.params.reviewId;
    const {user} = req;
    if(!user) {
        res.status(401);
        return res.json({
            "message":"havent log in"
        })
    }

    reviewid.split('').forEach(el=>{
        if(!'0123456789'.includes(el)){
            res.status(404);
            return res.json(
                {
                    "message": "Review couldn't be found"
                  }
            )
        }
    })
  
    // if(Number(reviewid)>10){
    //     res.status(403);
    //     return res.json(
    //         {
    //             "message": "Maximum number of images for this resource was reached"
    //           }
    //     )
    // }

    const foundReview = await Review.findByPk(Number(reviewid));

    console.log("foundReview",foundReview);
   

    if(!foundReview){
        res.status(404);
        return res.json(
            {
                "message": "Review couldn't be found"
              }
        )
    }
    if(foundReview&&foundReview.userId !== user.id) {
        res.status(403);
        return res.json({
            "message":"it is not your review"
        })
    }
  
    const {url} = req.body;

    const newReview = await ReviewImage.create({
        'reviewId':Number(reviewid),url
    });
    res.status(201);
   
    res.json(newReview);
})

router.put('/:reviewId', async (req,res)=>{
    const {user} = req;
    if(!user) {
        res.status(401);
        return res.json({
            "message":"havent log in"
        })
    }
    const reviewid= req.params.reviewId;

    const {review, stars} = req.body;
    
  
        const foundReview = await Review.findByPk(Number(reviewid));

        if(!foundReview) {
            res.status(404);
            return res.json({
                "message": "Review couldn't be found"
              });
        }
        if(foundReview.userId !== user.id){
            res.status(403);
        return res.json({
            "message":"it is not yours"
        })
        }

        if(review==="" || Number(stars)<1||Number(stars)>5){
            res.status(400);
                return res.json(
                    {
                        "message": "Bad Request", 
                        "errors": {
                          "review": "Review text is required",
                          "stars": "Stars must be an integer from 1 to 5",
                        }
                      }
                )
        
            }

        if(review) foundReview.review = review;
        if(stars) foundReview.stars = stars;

        
        
        res.status(200);
        return res.json(
            foundReview
        )

    
    
   
});

router.delete('/:reviewId', async (req,res)=>{
    const {user} = req;
    if(!user) {
        res.status(401);
        return res.json({
            "message":"havent log in"
        })
    }
    const reviewid = req.params.reviewId;
    const foundreview = await Review.findByPk(Number(reviewid));
    if(!foundreview) {
        res.status(404);
        return res.json({
            "message":
            "Review couldn't be found"
        })
    }

    if(foundreview.userId !== user.id){
        res.status(403);
        return res.json({
            "message":"it is not yours"
        })
    }

    if(foundreview) {

        await foundreview.destroy();
        res.status(200);
        return res.json({
            "message": "Successfully deleted"
          });
    }
        res.status(404);
        return res.json({
            "message": "Review couldn't be found"
          });
    
   

})

module.exports = router;

