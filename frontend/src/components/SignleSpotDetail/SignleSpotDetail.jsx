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
        <div className="SingleSpotDetialPage">     
        <div>
                 <h1 style={{color:"black"}}>{thespot.name}</h1>
                 <div className="theSpotImages">     
                    {thespot.SpotImages?thespot.SpotImages.map((el,index)=>{
                    if(el.preview)
                   return <img 
                    // style={{height:500,width:800}} 
                    className='mainSpotImage' src={el.url} key={index} ></img>
                }):null}
                <div className="noPreviewImageswithButton">
                <div className="noPreviewImages">
                {thespot.SpotImages?thespot.SpotImages.map((el,index)=>{
                    if(!el.preview)
                   return <img src={el.url} key={index} style={{height:100,width:200}}  id="noPreviewImagesimg"></img>
                }):null}
             
                </div>
                <div className="priceAndReview">
                <p>
               {'$ '+thespot.price +' /night'}
               </p>
               <p style={{color:"black"}}>
             
               <FaStar style={{color:"black"}}/>
                {thespot.avgStarRating?
                // thespot.avgStarRating.toFixed(1)
                // thespot.avgStarRating

            (Math.round(thespot.avgStarRating * 10) / 10===5||Math.round(thespot.avgStarRating * 10) / 10===4||Math.round(thespot.avgStarRating* 10) / 10===3||Math.round(thespot.avgStarRating * 10) / 10===2||Math.round(thespot.avgStarRating * 10) / 10===1? `${Math.round(thespot.avgStarRating * 10) / 10}.0`:Math.round(thespot.avgStarRating * 10) / 10)
  
                :"New"}</p>
                </div>
           
                <button  onClick={handleReserve} id="noPreviewImagesimgButton">Reserve</button>
                </div>
               
                 </div>
           
                {thespot.Owner?(
                    <>
                          <a style={{color:"black"}}>{'Hosted by:  '+thespot.Owner.firstName}</a>
                          <a style={{color:"black"}}>{thespot.Owner.lastName}</a>
                    </>

                ):null}
          
                <p style={{color:"black"}}>{"Location: "+thespot.city+','+thespot.state+','+thespot.country}</p>
                <p style={{color:"black"}}>{'Description:  '+thespot.description}</p>
        </div>
                <h1 style={{color:"black"}}>Reviews:</h1>
                <p style={{color:"black"}}>
               <FaStar style={{color:"black"}}/>
                {thespot.avgStarRating?
                // thespot.avgStarRating.toFixed(1)
                // thespot.avgStarRating

            (Math.round(thespot.avgStarRating * 10) / 10===5||Math.round(thespot.avgStarRating * 10) / 10===4||Math.round(thespot.avgStarRating* 10) / 10===3||Math.round(thespot.avgStarRating * 10) / 10===2||Math.round(thespot.avgStarRating * 10) / 10===1? `${Math.round(thespot.avgStarRating * 10) / 10}.0`:Math.round(thespot.avgStarRating * 10) / 10)
  
                :"New"}</p>
                <SingleSpotReview spotId={spotId}/>
        </div>

    )
 
}
export default SignleSpotDetail;