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
 
    return (
        <>
       
        {sessionUser&&userReview.length===0?<CreateAReviewButton spotId={spotId}/>:null}
        {
            thereview?thereview.map((el,index)=>{
                return (
                    <div key={index}>
                     <div >
                        {el.User? <p style={{color:"white"}}>{el.User.firstName}</p>:null}
                        <p style={{color:"white"}}>{el.createdAt.slice(0,7)}</p>
                        <p style={{color:"white"}}>{el.review}</p>
                    </div>
                    {el.User.id===sessionUser.id?
                    <DeleteAReviewButton reviewid={el.id}/>:null
                    }
                    
                    </div>
                  

                )
            }):null
        }
        </>
    )
}
export default SingleSpotReview;