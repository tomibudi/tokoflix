const initialState = {
    data : [],
    isLoading : true,
    isSuccess : false,
    isError : false
}

const Genres = (state = initialState, action) => {
    switch (action.type){
        case "ALL_GENRES_PENDING" :
            return {
                ...state,
                isLoading : true,
                isError : false,
                isSuccess : true
            }
        case "ALL_GENRES_FULFILLED" :
            return {
                ...state,
                isLoading : false,
                isSuccess: true,
                data : action.payload.data
            }
        case "ALL_GENRES_REJECTED" :
            return {
                ...state,
                isLoading : false,
                isError: true
            }
        default : 
            return state
        
    }
}

export default Genres