import { useState } from 'react';
import './CreateASpot.css';
import { useDispatch } from 'react-redux';
import {createSpot} from '../../store/spot';
import { useNavigate } from 'react-router-dom';

function CreateASpotPage(){
 
    const [country,setCountry]=useState('');
    const [address,setAddress] =useState('');
    const [city,setCity] = useState('');
    const [state,setState]=useState('');
    const [description,setDescription]=useState('');
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    // const [lat,setLat]=useState(10);
    // const [lng,setLng]=useState(10);
    const lat =10;
    const lng=10;
    const [previewimage,setPreviewimage]=useState('');
    const [imageOne,setImageOne]=useState('');
    const [imageTwo,setImageTwo]=useState('');
    const [imageThree,setImageThree]=useState('');
    const [imageFour,setImageFour]=useState('');
    const [errors,setErrors]=useState({});

    const dispatch=useDispatch();
    const navigate =useNavigate();
 


    const handlecreateSpotSubmit= async (e)=>{
      e.preventDefault();

      if(name.length>50) {
        const newerror ={...errors};
        newerror['name']="Name must be less than 50 characters";
        setErrors(newerror);
        console.log(errors);
        return ;
      }
      if(Number(price)<=0){
        const newerror ={...errors};
        newerror['price']="Price per day must be a positive number";
        setErrors(newerror);
        console.log(errors);
        return ;
      }
 
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

   
       const newspot =  await dispatch(createSpot({
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
        }))
        console.log('newspot',newspot);
        if(newspot.message !== 'Bad Request'){
          setCountry('');
          setAddress('');
          setCity('');
          setState('');
       
          setDescription('');
          setName('');
          setPrice('');
          setPreviewimage('');
          setImageOne('');
          setImageTwo('');
          setImageThree('');
          setImageFour('');
          setErrors({});
   
          navigate(`/spots/${newspot.id}`);
        }else{
     
          const newerror ={...errors};
              newerror['address']=newspot.errors.address;
              newerror['city']=newspot.errors.city;
              newerror['country']=newspot.errors.country;
              newerror['description']=newspot.errors.description;
              newerror['name']=newspot.errors.name;
              newerror['price']=newspot.errors.price;
              newerror['state']=newspot.errors.state;
             setErrors(newerror);
              console.log('createaspot',errors);
        }
      

    }
  

    return (
     
        <div >
          <div className='createASpotPage'>
        <h1>Create a new Spot</h1>
          <h2 style={{color:'black'}}>Wheres&apos; your place located?</h2>
          <p style={{color:'black'}}>Guests will only get your exact address once they booked a reservation.</p>
            <form className="loginContainer"
            onSubmit={handlecreateSpotSubmit}
            >
            
              <div className="CreateASpotFormContainer">
                <p>Country</p>
                <label style={{color:'black'}}>
                  {/* Country {'                 '} */}
                  <input type="text" 
                   style={{width:800}}
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required />
                </label>
                <p style={{color:'red'}}>{errors.country?errors.country:null}</p>
                <p>Street Address</p>
                <label style={{color:'black'}}>
                  {/* Street Address{'                 '} */}
                  <input type="text" 
                   style={{width:800}}
                   value={address}
                   onChange={(e) => setAddress(e.target.value)}
                  required />
                </label>
                <p style={{color:'red'}}>{errors.address?errors.address:null}</p>
                <div className='cityNstate'>
                <p>City</p>
                <label style={{color:'black'}}>
                  {/* City{'                 '} */}
                  <input type="text" 
                   style={{width:400}}
                     value={city}
                     onChange={(e) => setCity(e.target.value)}
                  required />
                </label>
                <p style={{color:'red'}}>{errors.city?errors.city:null}</p>
                <p>State</p>
                <label style={{color:'black'}}>
                  {/* State{'                 '} */}
                  <input type="text" 
                   value={state}
                   onChange={(e) => setState(e.target.value)}
                  required />
                </label>
                <p style={{color:'red'}}>{errors.state?errors.state:null}</p>
                </div>
                
                <h2 style={{color:'black'}}>Describe your place to guests</h2>
                <p style={{color:'black'}}>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <label style={{color:'black'}}>   
                  <input type="text" 
                   style={{width:800,height:200}}
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  required placeholder='Please write at least 30 characters'/>
                </label>
                <p style={{color:'red'}}>{errors.description?errors.description:null}</p>
                <h2 style={{color:'black'}}>Create a title for your spot</h2>
                <p style={{color:'black'}}>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <label style={{color:'black'}}>   
                  <input type="text" 
                    style={{width:800}}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                  required 
                  placeholder='Name of your spot'/>
                </label>
                <p style={{color:'red'}}>{errors.name?errors.name:null}</p>
                <h2 style={{color:'black'}}>Set a base price for your spot</h2>
                <p style={{color:'black'}}>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <label style={{color:'black'}}>  
                    {'$ * / night' }{'                 '}
                  <input type="number" 
                  min="1"
                    value={price}
                    style={{width:730}}
                    onChange={(e) => setPrice(e.target.value)}
                  required placeholder='Price per night (USD)'/>
                </label>
                <p style={{color:'red'}}>{errors.price?errors.price:null}</p>
                <h2 style={{color:'black'}}>Liven up your spot with photos</h2>
                <p style={{color:'black'}}>Submit a link to at least one photo to publish your spot.</p>
                <label style={{color:'black'}}>   
                  <input type="text" 
                     value={previewimage}
                     style={{width:800}}
                     onChange={(e) => setPreviewimage(e.target.value)}
                  required placeholder='Preview Image URL'/>
                </label>
                <label style={{color:'black'}}>   
                  <input type="text" 
                  style={{width:800}}
                     value={imageOne}
                     onChange={(e) => setImageOne(e.target.value)}
                  required placeholder='Image URL'/>
                </label>
                <label style={{color:'black'}}>   
                  <input type="text" 
                     value={imageTwo}
                     style={{width:800}}
                     onChange={(e) => setImageTwo(e.target.value)}
                  required placeholder='Image URL'/>
                </label>
                <label style={{color:'black'}}>   
                  <input type="text" 
                     value={imageThree}
                     style={{width:800}}
                     onChange={(e) => setImageThree(e.target.value)}
                  required placeholder='Image URL'/>
                </label>
                <label style={{color:'black'}}>   
                  <input type="text" 
                     value={imageFour}
                     style={{width:800}}
                     onChange={(e) => setImageFour(e.target.value)}
                  required placeholder='Image URL'/>
                </label>
                <button 
                className='submitCreateSpot'
                 type="submit">Create Spot</button>
              </div>
            </form>
          </div>
        </div>
      );

}
export default CreateASpotPage;