import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {getSingleSpotDetail} from  '../../store/spot';
import SingleSpotReview from '../SingleSpotReview/SingleSpotReview';
import './SignleSpotDetail.css';
import { FaStar } from 'react-icons/fa6'; 


function SignleSpotDetail(){
    const {spotId} = useParams();
 
    const dispatch=useDispatch();
    console.log('spotId',spotId);
 useEffect(()=>{
    dispatch(getSingleSpotDetail(spotId))
 },[dispatch])
 const thespot = useSelector(state=>state.spot);
 console.log("thespot",thespot);
const handleReserve=()=>{
    alert('Feature coming soon')
}

    return (
        <>     
        <div>
                 <h1 style={{color:"white"}}>{thespot.name}</h1>
                 <div className="theSpotImages">     
                    {thespot.SpotImages?thespot.SpotImages.map((el,index)=>{
                    if(el.preview)
                   return <img src={el.url} key={index} style={{height:200,width:400}}></img>
                }):null}
                <div className="noPreviewImageswithButton">
                <div className="noPreviewImages">
                {thespot.SpotImages?thespot.SpotImages.map((el,index)=>{
                    if(!el.preview)
                   return <img src={el.url} key={index} style={{height:200,width:400}}  id="noPreviewImagesimg"></img>
                }):null}
             
                </div>
                
               <a style={{color:"white"}}>
               <FaStar style={{color:"white"}}/>
                {thespot.avgStarRating?thespot.avgStarRating.toFixed(1):"New"}</a>
                <button style={{color:"red"}} onClick={handleReserve} id="noPreviewImagesimgButton">Reserve</button>
                </div>
               
                 </div>
           
                {thespot.Owner?(
                    <>
                          <p style={{color:"white"}}>{thespot.Owner.firstName}</p>
                          <p style={{color:"white"}}>{thespot.Owner.lastName}</p>
                    </>

                ):null}
          
                <p style={{color:"white"}}>{"Location: "+thespot.city+','+thespot.state+','+thespot.country}</p>
                <p style={{color:"white"}}>{thespot.description}</p>
        </div>
                <h1 style={{color:"white"}}>Reviews:</h1>
                <p style={{color:"white"}}>
               <FaStar style={{color:"white"}}/>
                {thespot.avgStarRating?thespot.avgStarRating.toFixed(1):"New"}</p>
                <SingleSpotReview spotId={spotId}/>
        </>

    )
 
}
export default SignleSpotDetail;