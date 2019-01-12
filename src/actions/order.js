
export const ADD_ORDER = (data) => {
    return {
        type : "ADD_ORDER",
        payload : data
    }
}

export const RESET_ORDER = () => {
    return {
        type : "RESET_ORDER",
    }
}