const initialState = {
    data : [],
    isLoading : false,
    isSuccess : false,
    isError : false
}

const Balance = (state = initialState, action) => {
    switch (action.type){
        case "BALANCE" :
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

export default Balance