const initialState = {
    data : [],
    isLoading : true,
    isSuccess : false,
    isError : false
}

const RelatedMovie = (state = initialState, action) => {
    switch (action.type){
        case "RELATED_MOVIE_PENDING" :
            return {
                ...state,
                isLoading : true,
                isError : false,
                isSuccess : true
            }
        case "RELATED_MOVIE_FULFILLED" :
            return {
                ...state,
                isLoading : false,
                isSuccess: true,
                data : action.payload.data
            }
        case "RELATED_MOVIE_REJECTED" :
            return {
                ...state,
                isLoading : false,
                isError: true
            }
        default : 
            return state
        
    }
}

export default RelatedMovie