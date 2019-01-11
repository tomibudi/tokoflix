const initialState = {
    data : {
        isLoggedIn : false,
        data : {}
    },
    isLoading : true,
    isSuccess : false,
    isError : false,
    isLoggedIn : false

}

const Auth = (state = initialState, action) => {
    switch (action.type){
        case "AUTH" :
            return {
                ...state,
                isLoading : false,
                isSuccess: true,
                data : {
                    ...action.payload,
                    isLoggedIn : true
                },
            }
        default : 
            return state
        
    }
}

export default Auth