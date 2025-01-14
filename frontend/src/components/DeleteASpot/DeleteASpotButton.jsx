import { useState } from "react";
import DeleteASpot from './DeleteASpot';



function DeleteASpotButton({spotid}){
    const [isDeleteASpotButtonModalOpen,setIsDeleteASpotButtonModalOpen]=useState(false);
    const openDeleteASpotButtonModal=()=>{
        setIsDeleteASpotButtonModalOpen(true);
    }
    const closeDeleteASpotButtonModal=()=>{
        setIsDeleteASpotButtonModalOpen(false);
    }
    return (
        <div>
          <button 
          className="deleteAspotbutton"
          onClick={openDeleteASpotButtonModal}>{isDeleteASpotButtonModalOpen?null:'Delete'}</button> 
          <DeleteASpot 
          isDeleteASpotButtonModalOpen={isDeleteASpotButtonModalOpen} 
          closeDeleteASpotButtonModal={closeDeleteASpotButtonModal} 
          spotid={spotid}
          /> 
        </div>
      );
}
export default DeleteASpotButton;