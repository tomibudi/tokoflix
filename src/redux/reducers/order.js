const initialState = {
    data : [],
    isLoading : true,
    isSuccess : false,
    isError : false
}

const order = (state = initialState, action) => {
    switch (action.type){
        case "HISTORY_ORDER" :
            return {
                ...state,
                isSuccess : true,
                data : action.payload
            }
        case "ADD_ORDER" : 
            return {
                ...state,
                isSuccess: true,
                data : [
                    action.payload,
                    ...state.data
                ]
            }
        case "RESET_ORDER" : 
            return {
                ...state,
                isSuccess : true,
                data : []
            }
        default : 
            return state
        
    }
}

export default order