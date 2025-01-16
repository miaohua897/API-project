import { useEffect, useState } from 'react';
import {updateSpot} from '../../store/spot';
import { useDispatch,useSelector  } from 'react-redux';
import './UpdateASpot.css';
import {getSingleSpotDetail} from  '../../store/spot';
import { useNavigate, useParams } from 'react-router-dom';
function UpdateASpot(){
    const {id}= useParams();
    const dispatch=useDispatch();
   useEffect(()=>{
      dispatch(getSingleSpotDetail(id))
   },[dispatch])
   const thespot = useSelector(state=>state.spot);
   console.log("Updateaspot",thespot);
   const initCountry =thespot.country;
   const initAddress = thespot.address;
   const initCity =thespot.city;
   const initState =thespot.state;
   const initDescription = thespot.description;
   const initName =thespot.name;
   const initPrice = thespot.price;
    const [country,setCountry]=useState(thespot.country);
    const [address,setAddress] =useState(thespot.address);
    const [city,setCity] = useState(thespot.city);
    const [state,setState]=useState(thespot.state);
    const [description,setDescription]=useState(thespot.description);
    const [name,setName]=useState(thespot.name);
    const [price,setPrice]=useState(thespot.price);
    // const [lat,setLat]=useState(10);
    // const [lng,setLng]=useState(10);
    const lat =10;
    const lng=10;
    const [previewimage,setPreviewimage]=useState('');
    const [imageOne,setImageOne]=useState('');
    const [imageTwo,setImageTwo]=useState('');
    const [imageThree,setImageThree]=useState('');
    const [imageFour,setImageFour]=useState('');
    // const [errors,setErrors]=useState({});

   console.log(country,address,city,state,description,name,price);
    const navigate =useNavigate();
    const handleupdateSpotSubmit= async (e)=>{
        e.preventDefault();
        const previewimagedata={
            "url": `${previewimage}`,
            "preview": true
          };
          const imageOnedata={
            "url": `${imageOne}`,
            "preview": false
          }
          const imageTwodata={
            "url": `${imageTwo}`,
            "preview": false
          }
          const imageThreedata={
            "url": `${imageThree}`,
            "preview": false
          }
          const imageFourdata={
            "url": `${imageFour}`,
            "preview": false
          }
        const updateinfo ={
            name,
            address,
            city,
            state,
            country,
            description,
            "price":Number(price),
            lat,
            lng,
            previewimagedata,
            imageOnedata,
            imageTwodata,
            imageThreedata,
            imageFourdata
          };
        console.log(updateinfo,id);
       dispatch(updateSpot(updateinfo,id))
        navigate(`/spots/${id}`);
       
    }
    const handleBackMangeSpot=()=>{
      navigate('/spots/current');
    }
    return (
     
        <div className='updateSpot'>
          <button onClick={handleBackMangeSpot}
          className='BackMangeSpotButton'
          >✖️</button>
          <div className="updataeASpotFormModal">
          <h1 style={{color:'white'}}>Update your Spot</h1>
          <p style={{color:'white'}}>Guests will only get your exact address once they booked a reservation.</p>
            <form className="updataeASpotContainer"
            onSubmit={handleupdateSpotSubmit}
            >
             
              <div className="updataeASpotFormContainer">
                <p  style={{color:'white'}}>Country</p>
                <label
                style={{color:'white'}}
                >
                  {/* Country
                  <br></br> */}
                  <input type="text" 
                  style={{width:800}}
                  value={country||initCountry}
                  onChange={(e) => setCountry(e.target.value)}
                  required />
                </label>
                {/* <p style={{color:'red'}}>{errors.country?errors.country:null}</p> */}
                <p  style={{color:'white'}}> Street Address</p>
                <label
                style={{color:'white'}}
                >
                  {/* Street Address
                  <br></br> */}
                  <input type="text" 
                    style={{width:800}}
                   value={address||initAddress}
                   onChange={(e) => setAddress(e.target.value)}
                  required />
                </label>
                {/* <p style={{color:'red'}}>{errors.address?errors.address:null}</p> */}
                <div className='cityNstateUpdate'>
                  <div>
                  <p style={{color:'white'}}>City</p>
                <label
                style={{color:'white'}}
                >
                  {/* City
                  <br></br> */}
                  <input type="text" 
                   style={{width:600}}
                     value={city||initCity}
                     onChange={(e) => setCity(e.target.value)}
                  required />
                </label>
                {/* <p style={{color:'red'}}>{errors.city?errors.city:null}</p> */}
                  </div>
                  <div>
  
                  <p style={{color:'white'}}>State</p>
                <label
                style={{color:'white'}}
                >
                  {/* State
                  <br></br> */}
                  <input type="text" 
                    style={{width:180}}
                   value={state||initState}
                   onChange={(e) => setState(e.target.value)}
                  required />
                </label>
                {/* <p style={{color:'red'}}>{errors.state?errors.state:null}</p> */}
                  </div>
              
                </div>
               
                <h1
                style={{color:'white'}}
                >Describe your place to guests</h1>
                <p
                style={{color:'white'}}
                >Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label style={{color:'white'}}>   
                  <input type="text" 
                   style={{width:800,height:200}}
                     value={description||initDescription}
                     onChange={(e) => setDescription(e.target.value)}
                  required placeholder='Please write at least 30 characters'/>
                </label>
                {/* <p style={{color:'red'}}>{errors.description?errors.description:null}</p> */}
                <h1 style={{color:'white'}}>Create a title for your spot</h1>
                <p style={{color:'white'}}>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <label style={{color:'white'}}>   
                  <input type="text" 
                  style={{width:800}}
                          value={name||initName}
                          onChange={(e) => setName(e.target.value)}
                  required 
                  placeholder='Name of your spot'/>
                </label>
                {/* <p style={{color:'red'}}>{errors.name?errors.name:null}</p> */}
                <h1 style={{color:'white'}}>Set a base price for your spot</h1>
                <p style={{color:'white'}}>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label style={{color:'white'}}>  
                    {'$ * / night           ' }
                  <input type="number" 
                  min='1'
                  style={{width:730}}
                    value={price||initPrice}
                    onChange={(e) => setPrice(e.target.value)}
                  required placeholder='Price per night (USD)'/>
                </label>
                {/* <p style={{color:'red'}}>{errors.price?errors.price:null}</p> */}
                <h1 style={{color:'white'}}>Liven up your spot with photos</h1>
                <p style={{color:'white'}}>Submit a link to at least one photo to publish your spot.</p>
                <div className='updateUrl'>
                <label style={{color:'white'}}>   
                  <input type="text" 
                  style={{width:800}}
                     value={previewimage}
                      className='updateUrlInput'
                     onChange={(e) => setPreviewimage(e.target.value)}
                  // required 
                  placeholder='Preview Image URL'/>
                </label>
                <label style={{color:'white'}}>   
                  <input type="text" 
                            style={{width:800}}
                     value={imageOne}
                     className='updateUrlInput'
                     onChange={(e) => setImageOne(e.target.value)}
                  // required 
                  placeholder='Image URL'/>
                </label>
                <label style={{color:'white'}}>   
                  <input type="text" 
                            style={{width:800}}
                     value={imageTwo}
                     className='updateUrlInput'
                     onChange={(e) => setImageTwo(e.target.value)}
                  // required 
                  placeholder='Image URL'/>
                </label>
                <label style={{color:'white'}}>   
                  <input type="text" 
                            style={{width:800}}
                     value={imageThree}
                     className='updateUrlInput'
                     onChange={(e) => setImageThree(e.target.value)}
                  // required 
                  placeholder='Image URL'/>
                </label>
                <label style={{color:'white'}}>   
                  <input type="text" 
                            style={{width:800}}
                     value={imageFour}
                     className='updateUrlInput'
                     onChange={(e) => setImageFour(e.target.value)}
                  // required 
                  placeholder='Image URL'/>
                </label>
                </div>
            
                <button 
                className='updateSpotButton'
                type="submit">Update Spot</button>
              </div>
            </form>
          </div>
        </div>
      );
}
export default UpdateASpot;