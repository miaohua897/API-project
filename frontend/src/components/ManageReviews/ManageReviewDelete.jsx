import {deleteAReviewFromManageReview,getCurrentReviews} from '../../store/review';
import { useDispatch } from 'react-redux';
import './ManageReviewDelete.css';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
function ManageReviewDelete( {isDeleteAReviewButtonModalOpen, 
    closeDeleteAReviewButtonModal,reviewid}){
        // const navigate=useNavigate();
        const dispatch=useDispatch();

         const handlerClickDelete=async()=>{
        // console.log('delete a review',reviewid);
       await  dispatch(deleteAReviewFromManageReview(reviewid));
        // dispatch(removeASpotFromManageReview(reviewid));
        closeDeleteAReviewButtonModal();
        dispatch(getCurrentReviews());
        // navigate('/reviews/current');
        // window.location.reload();
    }

        if(!isDeleteAReviewButtonModalOpen) return null;

        return(
            <div className="delete-review-modal-overlay">
                <div className="deleteareviewModal">
                <button 
                        type="button" 
                        id="closedeleteASpotform"
                        onClick={closeDeleteAReviewButtonModal} 
                 >
                    ✖️
                </button>
                <div className='deleteAReviewConfirm'>
                <h1>Confirm Delete</h1>
                <p>Are you sure you want to delete this review</p>
                <button 
                className='deleteAReviewConfirmButton'
                onClick={handlerClickDelete}
                >
                    Yes (Delete Review)
                </button>
                <button 
                className='nodeleteAReviewConfirmButton'
                onClick={closeDeleteAReviewButtonModal}
                 >
                    No (Keep Review)
                </button>
                </div>
                </div>

            </div>
        )

}
export default ManageReviewDelete;