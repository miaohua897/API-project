import { useDispatch } from 'react-redux';
import {deleteASpot} from '../../store/spot';
import './DeleteASpot.css';
function DeleteASpot({isDeleteASpotButtonModalOpen,closeDeleteASpotButtonModal,spotid}){
   const dispatch=useDispatch();
    if(!isDeleteASpotButtonModalOpen) return null;
    const handlerClickDelete=()=>{
        // console.log('delete a spot',spotid);
        dispatch(deleteASpot(spotid));
        window.location.reload();
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
