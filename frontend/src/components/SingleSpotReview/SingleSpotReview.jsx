import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSingleSpotReview} from '../../store/spot';
import CreateAReviewButton from '../CreateAReview/CreateAReviewButton';
import UpdateAReviewButton from '../UpdateAReview/UpdateAReviewButton';
import DeleteAReviewButton from '../DeleteAReview/DeleteAReviewButton';
import './SingleSpotReview.css';
function SingleSpotReview({spotId}){
    const sessionUser = useSelector(state => state.session.user);
    console.log('sessionUserFromSpotdetaiil',sessionUser)
    const dispatch=useDispatch();
 useEffect(()=>{
    dispatch(getSingleSpotReview(spotId))
 },[])

 const thespot =useSelector(state=>state.spot);
 console.log('Object.keys(thespot.reviews',Object.keys(thespot.reviews))
 if(Object.keys(thespot.reviews).length===0) return (
    <>
    <p>Be the first to post a review!</p>
    <CreateAReviewButton spotId={spotId}/>
    </>

);

 console.log('thespot',thespot)
 const thereview =thespot.reviews.Reviews;
 let userReview=[];
 let ownerOrNot =false;
 if(sessionUser){
    if(thereview.length >0){
        userReview = thereview.filter(el=>el.userId===sessionUser.id)
        }else{
         userReview=[];
        }
    if(sessionUser.id !==thespot.ownerId) ownerOrNot=true;
 }

//  const thereview = useSelector(state=>state.spot.reviews.Reviews);
// let userReview;
// if(thereview &&sessionUser) {
//     userReview = thereview.filter(el=>el.User.id===sessionUser.id)
  
// } else{
//     userReview=[];
// }
console.log('thereview',thereview,'userReview',userReview ,'sessionUser',sessionUser,'ownerOrNot',ownerOrNot);
const thereviewReverse=(thereview)=>{
    let result =[];
    for(let i = thereview.length-1;i>=0;i--){
      result.push(thereview[i]);
    }
    // console.log('result',result)
    return result;
}
 
    return (
        <>
       
        {sessionUser&& userReview.length===0 && ownerOrNot?<CreateAReviewButton spotId={spotId}/>:null}
        {
            thereview.length>0?
            
            thereviewReverse(thereview).map((el,index)=>{
                return (
                    <div key={index} className="singleReviewContainer">
                     <div >
                        {el.User? <p id='singleReviewContainername'>{el.User.firstName}</p>:null}
                        <p id='singleReviewContainerdate'>{el.createdAt.slice(0,7)}</p>
                        <p id='singleReviewContainerreview'>{el.review}</p>
                    </div>
                    {
                        sessionUser? el.userId===sessionUser.id?
                        <div className="updateNdelete">
                        <UpdateAReviewButton reviewid={el.id} spotId={spotId} theReview={{
                            "stars":el.stars,
                           "review":el.review
                        }}/>
                        <DeleteAReviewButton reviewid={el.id} spotId={spotId}/>
                       </div>
                            :null
                            :null
                            
                    }
                   
                    </div>
                  

                )
            })
            :<p>Be the first to post a review!</p>
        }
        </>
    )
}
export default SingleSpotReview;