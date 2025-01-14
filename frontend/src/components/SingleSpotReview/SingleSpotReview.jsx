import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getSingleSpotReview} from '../../store/spot';
import CreateAReviewButton from '../CreateAReview/CreateAReviewButton';
import DeleteAReviewButton from '../DeleteAReview/DeleteAReviewButton';
function SingleSpotReview({spotId}){
    const sessionUser = useSelector(state => state.session.user);
    console.log('sessionUserFromSpotdetaiil',sessionUser)
    const dispatch=useDispatch();
 useEffect(()=>{
    dispatch(getSingleSpotReview(spotId))
 },[])

 const thespot =useSelector(state=>state.spot);

 if(Object.keys(thespot).length===0) return ;
 if(thespot.reviews === undefined) 
    return (<CreateAReviewButton spotId={spotId}/>);


 console.log('thespot',thespot)
 const thereview =thespot.reviews.Reviews;
//  const thereview = useSelector(state=>state.spot.reviews.Reviews);
let userReview;
if(thereview &&sessionUser) {
    userReview = thereview.filter(el=>el.User.id===sessionUser.id)
  
} else{
    userReview=[];
}
console.log('thereview',thereview,'userReview',userReview ,'sessionUser',sessionUser);
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
       
        {sessionUser&&userReview.length===0?<CreateAReviewButton spotId={spotId}/>:null}
        {
            thereview?
            
            thereviewReverse(thereview).map((el,index)=>{
                return (
                    <div key={index}>
                     <div >
                        {el.User? <p >{'Name:'+el.User.firstName}</p>:null}
                        <p >{"Date: "+el.createdAt.slice(0,7)}</p>
                        <p>{el.review}</p>
                    </div>
                    {
                        sessionUser? el.User.id===sessionUser.id?
                            <DeleteAReviewButton reviewid={el.id}/>:null
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