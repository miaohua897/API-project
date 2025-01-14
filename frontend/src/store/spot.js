import { csrfFetch } from './csrf';

export const getSpot=()=> async (dispatch)=>{
    const res = await fetch('/api/spots');
    if(res.ok){
        const data = await res.json();
        const newdata = data;
        dispatch(loadSpot(newdata));
        return res;
    }
}
export const deleteASpot = (spotid) => async () => {
    const response = await csrfFetch(`/api/spots/${spotid}`, {
      method: 'DELETE'
    });

    return response;
};
export const deleteAReview = (reviewid) => async () => {
    const response = await csrfFetch(`/api/reviews/${reviewid}`, {
      method: 'DELETE'
    });

    return response;
};

//   const removeASpot = (data) => {
//     return {
//       type: 'REMOVE_A_SPOT',
//       payload:data
//     };
//   };

export const getCurrentSpot=()=> async (dispatch)=>{
    const res = await fetch('/api/spots/current');
    if(res.ok){
        const data = await res.json();
        const newdata = data;
        dispatch(loadSpot(newdata));
        return res;
    }
}

const loadReview=(data)=>{
    return {
        type:'LOAD_Review',
        payload:data
    }
}
export const createAReview=(data)=> async (dispatch)=>{
    const {
        spotId,
        review,
        stars
      } = data;
      try{
        const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
            method: "POST",
            body: JSON.stringify({
                review,
                stars
            })
          });
        
        // console.log('newreview',response);
        if(response.ok){
            const data = await response.json();
            const newdata = data;
        
            dispatch(loadReview(newdata));
            return newdata;

        }
      }catch(error){
        console.log('newreviewerror',error);
      }

    
}

export const updateSpot=(data,spotId)=> async (dispatch)=>{
    const {
        name,
        address,
        city,
        state,
        country,
        description,
        price,
        lat,
        lng
       
      } = data;
      
    try{
        const res = await csrfFetch(`/api/spots/${spotId}`,{
            method: "PUT",
            body: JSON.stringify({
                name,
                address,
                city,
                state,
                country,
                description,
                price,
                lat,
                lng
            })
        })
    
        if(res.ok){
            const data = await res.json();
            const newdata = data;
            console.log('create a spot',newdata);
            dispatch(loadSpot(newdata));
        }
    }catch(e){
        console.log(e);
    }
}

export const createSpot=(data)=> async (dispatch)=>{
    const {
        name,
        address,
        city,
        state,
        country,
        description,
        price,
        lat,
        lng,
        previewimagedata,
        imageOnedata,
          imageTwodata,
          imageThreedata,
          imageFourdata
      } = data;
      const {
        url,
        preview
    }=previewimagedata;
    try{
        const res = await csrfFetch('/api/spots',{
            method: "POST",
            body: JSON.stringify({
                name,
                address,
                city,
                state,
                country,
                description,
                price,
                lat,
                lng
            })
        })
    
        if(res.ok){
            const data = await res.json();
            const newdata = data;
            console.log('create a spot',newdata);
            dispatch(loadSpot(newdata));
    
        //  const respreviewimage = 
         await csrfFetch(`/api/spots/${newdata.id}/images`,{
            method: "POST",
            body: JSON.stringify({
                url,
                preview
              })
        });
        // const resimageOne = 
        await csrfFetch(`/api/spots/${newdata.id}/images`,{
            method: "POST",
            body: JSON.stringify({
                'url':imageOnedata.url,
                'preview':false
              })
        });
        // const resimageTwo = 
        await csrfFetch(`/api/spots/${newdata.id}/images`,{
            method: "POST",
            body: JSON.stringify({
                'url':imageTwodata.url,
                'preview':false
              })
        });
        // const resimageThree = 
        await csrfFetch(`/api/spots/${newdata.id}/images`,{
            method: "POST",
            body: JSON.stringify({
                'url':imageThreedata.url,
                'preview':false
              })
        });
        // const resimageFour = 
        await csrfFetch(`/api/spots/${newdata.id}/images`,{
            method: "POST",
            body: JSON.stringify({
                'url':imageFourdata.url,
                'preview':false
              })
        });
        // console.log('respreviewimage ',respreviewimage,resimageOne );
            return newdata;
        }
    }catch(e){
        console.log('e',e);
        const e_data = await e.json();
        return e_data;
    }
  

}

export const getSingleSpotDetail=(spotId)=> async (dispatch)=>{
    const res = await fetch(`/api/spots/${spotId}`);
    if(res.ok){
        const data = await res.json();
        const newdata = data;
        dispatch(loadSpot(newdata));
        return res;
    }
}
export const getSingleSpotReview=(spotId)=> async (dispatch)=>{
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    if(res.ok){
        const data = await res.json();
        const newdata = data;
        dispatch(loadSpotReview(newdata));
        return res;
    }
}

const loadSpot=(data)=>{
    return {
        type:'LOAD_SPOT',
        payload:data
    }
}
export const loadSpotReview=(data)=>{
    return {
        type:'LOAD_SPOT_REVIEW',
        payload:data
    }
}

const spotReducer = (state={},action)=>{
    switch(action.type){
        case 'LOAD_SPOT':
            return {...state,...action.payload};
        case 'LOAD_SPOT_REVIEW':
            return {...state,'reviews':action.payload};
        case 'LOAD_Review':
            return {
                ...state,'newreviews':action.payload
            }
        default:
            return state;
    }
};

export default spotReducer;