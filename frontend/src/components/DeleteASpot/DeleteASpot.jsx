import { useDispatch } from 'react-redux';
import {deleteASpot,removeASpot} from '../../store/spot';
import './DeleteASpot.css';
import { useNavigate } from 'react-router-dom';
function DeleteASpot({isDeleteASpotButtonModalOpen,closeDeleteASpotButtonModal,spotid}){
   const dispatch=useDispatch();
   const navigate=useNavigate();
    if(!isDeleteASpotButtonModalOpen) return null;
    const handlerClickDelete=()=>{
     
        // console.log('delete a spot',spotid);
        dispatch(deleteASpot(spotid));
       dispatch(removeASpot(spotid));
     
      closeDeleteASpotButtonModal();
        navigate('/spots/current');
        
    
    }
 return (
    <div className="delete-modal-overlay">
       
        <div className="deleteaspotModal">
        < >
        <button 
            type="button" 
            id="closedeleteASpotform"
            onClick={closeDeleteASpotButtonModal} 
        >
            ✖️
        </button> 
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot from the listings</p>
        <button 
        className='handledeletespot'
        onClick={handlerClickDelete}>
            Yes (Delete Spot)
        </button>
        <button 
        className='handledNoeletespot'
        onClick={closeDeleteASpotButtonModal} >
            No (Keep Spot)
        </button>
    </>
        </div>
   
    </div>
   
 )
}
export default DeleteASpot;
