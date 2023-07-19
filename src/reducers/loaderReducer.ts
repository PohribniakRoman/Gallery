const defaultState = {
    loaded:false
} as loaderReducer

export interface loaderReducer{
    loaded:boolean;
}

export interface loaderAction{
    type:"SET_LOADING"
    payload:boolean
}


export const loaderReducer = (state = defaultState, action: loaderAction) => {
    switch (action.type) {
        case "SET_LOADING":{
            return {loaded:action.payload}            
        };
        default:{
            return state;
        }
    }
}