import { useState } from "react";
import UpdateAReview from './UpdateAReview';
function UpdateAReviewButton({reviewid,spotId,theReview}){

    const [isUpdateReviewOpen,setIsUpdateReviewOpen]=useState(false);
    const openUpdateReviewButton=()=>{
        setIsUpdateReviewOpen(true);
    }
    const closeUpdateReviewButton=()=>{
        setIsUpdateReviewOpen(false);
    }
    return (<>
    <button className="updateReviewButton"
    onClick={openUpdateReviewButton}
    >{isUpdateReviewOpen?null:"Update"}</button>
    <UpdateAReview
    isUpdateReviewOpen={isUpdateReviewOpen}
    closeUpdateReview={closeUpdateReviewButton}
    reviewid={reviewid}
    spotId={spotId}
    theReview={theReview}
    />
    </>)
}
export default UpdateAReviewButton;