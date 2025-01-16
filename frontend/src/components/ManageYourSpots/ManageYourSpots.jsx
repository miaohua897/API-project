// import CreateASpotPageButton from '../CreateASpot/CreateASpotPageButton';
import CreateASpotButton from '../CreateASpot/CreateASpotButton';
// import image from '../../../../images/spot_example.png';
import {getCurrentSpot} from '../../store/spot';
import { useSelector }  from 'react-redux';
import {useDispatch} from 'react-redux';
import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6'; 
import DeleteASpotButton from '../DeleteASpot/DeleteASpotButton';
import './ManageYourSpots.css';
import { useNavigate } from 'react-router-dom';
function ManageYourSpots(){
    const navigate=useNavigate();
    const dispatch = useDispatch();
  
    useEffect(()=>{
        dispatch(getCurrentSpot())
    },[]);



    const spots = useSelector(state=>
         state.spot.currentSpot.Spots

    );
    // const spots=[];
   
    
    console.log('managespot',spots);
  const handleimage=(value)=>{
        if(!value) return "https://res.cloudinary.com/dsgfqkf7n/image/upload/eight_mezc8g?_a=BAMCkGfi0";
        else return value;
    }


  
   return (
    <div>
             <h1>Manage Spots</h1>
            <CreateASpotButton />
            <div className='managespotcontainer'>
            {
                 spots?   
                 spots.map(spot=>{
                    return (
                      <div className='managespotletout' key={spot.id}  
           
                      >
                    <div className="tooltip-container">
                    <img 
                        onClick={()=>{
                          navigate(`/spots/${spot.id}`);
                        }}
                      src={handleimage(spot.previewImage
                      )} 
                      style={{height:130,width:260}} 
                      />
                      {/* <p>{spot.previewImage}</p> */}
                       <span className='tooltiptext'>{spot.name}</span>
                    </div>
                       <ul className='SpotInfomation'>
                        <li>{spot.city}{",  "+spot.state}</li>
                        <li >
                         <a 
                    //      style={{
                    //   color: spot.avgRating? 'black': 'lightgray' ,  
                    //   transition: 'color 0.05s ease',
                    //   cursor: 'pointer'  
                    // }}
                    > <FaStar /></a> 
                        {'    '}    {spot.avgRating?
                        // spot.avgRating.toFixed(1)
                             
            (Math.round(spot.avgRating * 10) / 10===5||Math.round(spot.avgRating * 10) / 10===4||Math.round(spot.avgRating * 10) / 10===3||Math.round(spot.avgRating * 10) / 10===2||Math.round(spot.avgRating * 10) / 10===1? `${Math.round(spot.avgRating * 10) / 10}.0`:Math.round(spot.avgRating * 10) / 10)
  
                        :"New"} </li>
                    </ul>
                
                    <p>{"$"+spot.price+"  night"}</p> 
                    <div className='updateDeleteButton'>
                    <button 
                    className='updateAspotbutton'
                    onClick={
                      ()=> navigate(`/spots/${spot.id}/edit`)
                      }>Update</button>
                      {/* <button>Delete</button> */}
                      <DeleteASpotButton spotid={spot.id}/>
                    </div>
                    
                    

                      </div>
                    )    
               }):<p>Create a New Spot</p>
             
                 }
            </div>
             
    </div>
  
   )
}
export default ManageYourSpots;