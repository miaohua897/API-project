import { useState } from "react";
import DeleteAReview from './DeleteAReview';


function DeleteAReviewButton({reviewid}){
    const [isDeleteAReviewButtonModalOpen,setIsDeleteAReviewButtonModalOpen]=useState(false);
    const openDeleteAReviewButtonModal=()=>{
        setIsDeleteAReviewButtonModalOpen(true);
    }
    const closeDeleteAReviewButtonModal=()=>{
        setIsDeleteAReviewButtonModalOpen(false);
    }
    return (
        <div>
          <button onClick={openDeleteAReviewButtonModal}>{isDeleteAReviewButtonModalOpen?null:'Delete'}</button> 
          <DeleteAReview
          isDeleteAReviewButtonModalOpen={isDeleteAReviewButtonModalOpen} 
          closeDeleteAReviewButtonModal={closeDeleteAReviewButtonModal} 
          reviewid={reviewid}
          /> 
        </div>
      );
}
export default DeleteAReviewButton;