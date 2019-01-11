const initialState = {
    data : [],
    isLoading : true,
    isSuccess : false,
    isError : false
}

const DetailMovie = (state = initialState, action) => {
    switch (action.type){
        case "DETAIL_MOVIE_PENDING" :
            return {
                ...state,
                isLoading : true,
                isError : false,
                isSuccess : true
            }
        case "DETAIL_MOVIE_FULFILLED" :
            return {
                ...state,
                isLoading : false,
                isSuccess: true,
                data : action.payload.data
            }
        case "DETAIL_MOVIE_REJECTED" :
            return {
                ...state,
                isLoading : false,
                isError: true
            }
        default : 
            return state
        
    }
}

export default DetailMovie