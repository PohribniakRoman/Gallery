const defaultState = {
    sectionId:12,
    isActive:null,
} as sectionReducer

export interface sectionReducer{
    sectionId:number;
    isActive:boolean|null;
}

export interface sectionAction{
    type:"ENABLE_SECTION"|"DISABLE_SECTION";
    payload:sectionReducer;
}


export const sectionReducer = (state = defaultState, action: sectionAction) => {
    switch (action.type) {
        case "ENABLE_SECTION":{
            return {isActive:true,sectionId:action.payload}            
        };
        case "DISABLE_SECTION":{
            return {...state,isActive:false}            
        };
        default:{
            return state;
        }
    }
}