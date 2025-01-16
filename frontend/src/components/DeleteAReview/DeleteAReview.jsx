import {deleteAReview,removeAReview,getSingleSpotDetail} from '../../store/spot';
import { useDispatch } from 'react-redux';
import './DeleteAReview.css';
function DeleteAReview( {isDeleteAReviewButtonModalOpen, 
    closeDeleteAReviewButtonModal,reviewid,spotId}){
        const dispatch=useDispatch();

         const handlerClickDelete=()=>{
        console.log('delete a review',reviewid);
        dispatch(deleteAReview(reviewid));
        // window.location.reload();
        dispatch(removeAReview(reviewid))
        closeDeleteAReviewButtonModal;
          
      dispatch(getSingleSpotDetail(spotId))
     
 
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
export default DeleteAReview;