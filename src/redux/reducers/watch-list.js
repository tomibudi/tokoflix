const initialState = {
    data : [],
    isLoading : true,
    isSuccess : false,
    isError : false
}

const WatchList = (state = initialState, action) => {
    switch (action.type){
        case "WATCH_LIST" :
            return {
                ...state,
                isLoading : false,
                isError : false,
                isSuccess : true,
                data : action.payload
            }
        default : 
            return state
        
    }
}

export default WatchList