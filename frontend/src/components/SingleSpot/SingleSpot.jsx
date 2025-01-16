import './SingleSpot.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getSpot} from '../../store/spot';
import { FaStar } from 'react-icons/fa6'; 
import { useNavigate } from 'react-router-dom';
import {loadSpotReview} from '../../store/spot';




function SingleSpotPage(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
   
    useEffect(()=>{
        dispatch(getSpot())
    },[]);
    useEffect(()=>{
      dispatch(loadSpotReview({}))
    },[])

    const spots = useSelector(state=>
        state.spot.Spots
    );
    // console.log('spots',spots);
    const handleimage=(value)=>{
        if(!value) return "https://res.cloudinary.com/dsgfqkf7n/image/upload/eight_mezc8g?_a=BAMCkGfi0";
        else return value.url;
    }
  

    return (
    <div className='SpotsContainer'>
     
    {/* <div className='SingleSpotletout'>
        <img src={image} 
        />
         <ul className='SpotInfomation'>
            <li>name</li>
            <li>review</li>
        </ul>
        <p>price</p> 
    </div> */}
  
     {
     spots?   
     spots.map(spot=>{
        return (
          <div className='SingleSpotletout' key={spot.id}  onClick={()=>{
            navigate(`/spots/${spot.id}`);
          }}>
        <div className="tooltip-container">
        <img 
        style={{width:270,height:130}}
          src={handleimage(spot.previewImage)} 
          />
           <span className='tooltiptext'>{spot.name}</span>
        </div>
           <ul className='SpotInfomation'>
            <li>{spot.city}{",  "+spot.state}</li>
            <li >
             <a style={{
          color: spot.avgRating? 'black': 'lightgray' ,  
          transition: 'color 0.05s ease',
          cursor: 'pointer'  
        }}> <FaStar /></a> 
            {'    '}   
             {spot.avgRating?
           
            (Math.round(spot.avgRating * 10) / 10===5||Math.round(spot.avgRating * 10) / 10===4||Math.round(spot.avgRating * 10) / 10===3||Math.round(spot.avgRating * 10) / 10===2||Math.round(spot.avgRating * 10) / 10===1? `${Math.round(spot.avgRating * 10) / 10}.0`:Math.round(spot.avgRating * 10) / 10)
  
            :"New"} 
            </li>
        </ul>
    
        <p>{"$"+spot.price+"  night"}</p> 

          </div>
        )    
   }):null
 
     }
  
    </div>)
}
export default SingleSpotPage