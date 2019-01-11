const initialState = {
    data : [],
    isLoading : true,
    isSuccess : false,
    isError : false
}

const Movies = (state = initialState, action) => {
    switch (action.type){
        case "ALL_MOVIES_PENDING" :
            return {
                ...state,
                isLoading : true,
                isError : false,
                isSuccess : true
            }
        case "ALL_MOVIES_FULFILLED" :
            return {
                ...state,
                isLoading : false,
                isSuccess: true,
                data : action.payload.data
            }
        case "ALL_MOVIES_REJECTED" :
            return {
                ...state,
                isLoading : false,
                isError: true
            }
        default : 
            return state
        
    }
}

export default Movies