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

export const removeASpot = (spotid) => {
    return {
      type: 'REMOVE_A_Spot',
      payload:spotid
    };
  };

export const deleteAReview = (reviewid) => async () => {
    const response = await csrfFetch(`/api/reviews/${reviewid}`, {
      method: 'DELETE'
    });
    // if(response.ok){
    //     const data = await response.json();
    //     dispatch(removeAReview(reviewid))
    //     return response;
    // }
    return response;
   
};

 export const removeAReview = (reviewid) => {
    return {
      type: 'REMOVE_A_Review',
      payload:reviewid
    };
  };

export const getCurrentSpot=()=> async (dispatch)=>{
    try{
        dispatch(loadCurrentSpot({'Spots':[]}));
        const res = await csrfFetch('/api/spots/current');
        if(res.ok){
            const data = await res.json();
            const newdata = data;
            dispatch(loadCurrentSpot(newdata));
            return res;
        }
    }catch(error){
        console.log('error',error);
    
    }
}
const loadCurrentSpot=(data)=>{
    return {
        type:'LOAD_CURRENT_SPOT',
        payload:data
    }
}
export const updateAReview=(data)=>async(dispatch)=>{
    const {
        reviewid,
        review,
        stars
    }=data;
    try{
        const res =  await csrfFetch(`/api/reviews/${reviewid}`, {
            method: "PUT",
            body: JSON.stringify({
                review,
                stars
            })
          });
        if(res.ok){
            const datares = await res.json();
            console.log('datares',datares);
            dispatch(updateReview(datares));
            return datares;
        }
    }catch(e){
        console.log(e);
    }
}

const updateReview=(data)=>{
    return {
        type:'UPDATE_Review',
        payload:data
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
    try{
        const res = await fetch(`/api/spots/${spotId}/reviews`);
        console.log('loadreview',res);
        if(res.ok){
            const data = await res.json();
            const newdata = data;
            dispatch(loadSpotReview(newdata));
            return res;
        }else{
            dispatch(loadSpotReview({
                Reviews:[]
            }))
        }
    }catch(error){
        console.log(error);
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

const spotReducer = (state={currentSpot:[],reviews:{Reviews:[]}},action)=>{
    switch(action.type){
        case 'LOAD_SPOT':
            return {...state,...action.payload};
        case 'LOAD_SPOT_REVIEW':
            return {...state,'reviews':action.payload};
        case 'LOAD_Review':
             {
                // ...state,'newreviews':action.payload
                const objreview ={...state};
                objreview.reviews.Reviews.push(action.payload)
                return objreview;
            }
        case 'UPDATE_Review':
                {
                    const objreviewUpdate ={...state};
                    objreviewUpdate.reviews.Reviews=objreviewUpdate.reviews.Reviews.map(el=>{
                        if(el.id===action.payload.id){
                            return action.payload;
                        }
                        return el;
                    })
                    return objreviewUpdate;
                }
        case 'LOAD_CURRENT_SPOT':
            return {
                ...state,'currentSpot':action.payload
            }
        case 'REMOVE_A_Review':
           {
             // console.log('REMOVE_A_Review',state,action.payload);
             const obj={...state};
             obj.reviews.Reviews.map((el,index)=>{
                 if(el.id===action.payload){
                     // console.log('helloworld')
                     obj.reviews.Reviews.splice(index,1);
                 }
               
             })
             // console.log('REMOVE_A_Review',obj,state)
             return obj;
           }
        case 'REMOVE_A_Spot':
            
              {
                console.log('REMOVE_A_Spot',state,action.payload);
                const obj={...state};
                obj.currentSpot.Spots.map((el,index)=>{
                    if(el.id===action.payload){
                        // console.log('helloworld')
                        obj.currentSpot.Spots.splice(index,1);
                    }
                  
                })
                console.log('REMOVE_A_Spot',obj,state);
                return obj;
              }
            
        
        default:
            return state;
    }
};

export default spotReducer;