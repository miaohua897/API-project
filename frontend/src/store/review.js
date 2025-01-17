import { csrfFetch } from './csrf';

export const updateAReviewFromManageReview=(data)=>async(dispatch)=>{
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
            dispatch(updateReviewFromManageReview(datares));
            return datares;
        }
    }catch(e){
        console.log(e);
    }
}

const updateReviewFromManageReview=(data)=>{
    return {
        type:'UPDATE_Review_FromManageReview',
        payload:data
    }
}

export const removeASpotFromManageReview = (reviewid) => {
    return {
      type: 'REMOVE_A_Spot_FromManageReview',
      payload:reviewid
    };
  };

export const deleteAReviewFromManageReview = (reviewid) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewid}`, {
      method: 'DELETE'
    });
    if(response.ok){
        const data = await response.json();
        dispatch(removeASpotFromManageReview(reviewid));
        return data;
    }

   
};


export const getCurrentReviews=()=>async(dispatch)=>{
    try{
        const res = await csrfFetch('/api/reviews/current');
        if(res.ok){
            const data = await res.json();
            const newdata= data;
            dispatch(loadCurrentReviews(newdata));
            return res
        }
    }catch(e){
        console.log(e);
    }
}

const loadCurrentReviews=(data)=>{
    return {
        type:'LOAD_CURRENT_REVIEWS',
        payload:data
    }
}

const reviewReducer = (state={currentReview:[]},action)=>{
    switch(action.type){
        case 'LOAD_CURRENT_REVIEWS':
            {
                const reviewobj={...state};

                reviewobj.currentReview=action.payload.Reviews;
                return reviewobj;
            }
            // return {...state,'currentReview':action.payload}
        case 'REMOVE_A_Spot_FromManageReview':
            {
                const reviewobj={...state};
                reviewobj.currentReview.map((el,index)=>{
                    if(el.id===action.payload){
                        reviewobj.currentReview.splice(index,1);
                    }
                })
                return reviewobj;
            }
        case 'UPDATE_Review_FromManageReview':
            {
                const reviewobj={...state};
                reviewobj.currentReview=reviewobj.currentReview.map(el=>{
                    if(el.id===action.payload.id){
                        el.review=action.payload.review;
                        el.stars=action.payload.stars;
                        return el;
                        // return action.payload
                    }
                    return el;
                })
                return reviewobj;
            }
        default:
            return state;
    }
}
export default reviewReducer;