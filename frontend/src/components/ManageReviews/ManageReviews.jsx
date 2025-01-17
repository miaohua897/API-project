import { useDispatch, useSelector } from "react-redux";
import ManageReviewUpdateButton from './ManageReviewUpdateButton';
import ManageReviewDeleteButton from './ManageReviewDeleteButton';
import {getCurrentReviews} from '../../store/review';
import { useEffect } from "react";
import './ManageReviewUpdate.css';
function ManageReviews(){
    const dispatch = useDispatch();
   
    const reviews = useSelector(state=>state.review.currentReview);
    useEffect(()=>{
        dispatch(getCurrentReviews())
    },[]);
    return (<>
    <h1>Manage Reviews</h1>
    {
        reviews.length>0?

            reviews.map((el,index)=>{
                return (
                    <div key={index} className="updateReviewContainer">
                        <h2 id='updateReviewContainername'>{el.Spot.name}</h2>
                        <p id='updateReviewContainerdate'>{el.createdAt.slice(0,7)}</p>
                        <p id='updateReviewContainerreview'>{el.review}</p>
                        <div className="updateNdelete">
                        <ManageReviewUpdateButton reviewid={el.id} 
                        spotId={el.Spot.id}
                        theReview={{
                            "stars":el.stars,
                           "review":el.review
                        }}/>
                        <ManageReviewDeleteButton reviewid={el.id} />
                       </div>
                    </div>
                )
            })

        :<h2>You dont&apos; have reviews</h2>
    }
    </>)
}
export default ManageReviews;