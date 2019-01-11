const initialState = {
    data : [],
    isLoading : true,
    isSuccess : false,
    isError : false
}

const Trending = (state = initialState, action) => {
    switch (action.type){
        case "ALL_TRENDING_PENDING" :
            return {
                ...state,
                isLoading : true,
                isError : false,
                isSuccess : false
            }
        case "ALL_TRENDING_FULFILLED" :
            return {
                ...state,
                isLoading : false,
                isSuccess: true,
                data : action.payload.data
            }
        case "ALL_TRENDING_REJECTED" :
            return {
                ...state,
                isLoading : false,
                isError: true
            }
        default : 
            return state
        
    }
}

export default Trending