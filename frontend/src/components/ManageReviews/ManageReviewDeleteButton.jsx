import { useState } from "react";
import ManageReviewDelete from './ManageReviewDelete';


function DeleteAReviewButton({reviewid,spotId}){
    const [isDeleteAReviewButtonModalOpen,setIsDeleteAReviewButtonModalOpen]=useState(false);
    const openDeleteAReviewButtonModal=()=>{
        setIsDeleteAReviewButtonModalOpen(true);
    }
    const closeDeleteAReviewButtonModal=()=>{
        setIsDeleteAReviewButtonModalOpen(false);
    }
    return (
        <div>
          <button 
          className="DeleteAReviewButtonModal"
          onClick={openDeleteAReviewButtonModal}>{isDeleteAReviewButtonModalOpen?null:'Delete'}</button> 
          <ManageReviewDelete
          isDeleteAReviewButtonModalOpen={isDeleteAReviewButtonModalOpen} 
          closeDeleteAReviewButtonModal={closeDeleteAReviewButtonModal} 
          reviewid={reviewid}
          spotId={spotId}
          /> 
        </div>
      );
}
export default DeleteAReviewButton;