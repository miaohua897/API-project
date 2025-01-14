import CreateAReview from './CreateAReview';
import { useState } from 'react';
function CreateAReviewButton({spotId}){
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const openModal = () => {
      setIsModalOpen(true); 
    };
  
    const closeModal = () => {
      setIsModalOpen(false); 
    };
    return (
      <div>
        <button 
        className='createAreviewButton'
        onClick={openModal}>Post Your Review</button> 
        <CreateAReview isCreateReviewOpen={isModalOpen} createReviewonClose={closeModal} spotId={spotId}/> 
      </div>
    );
}
export default CreateAReviewButton;