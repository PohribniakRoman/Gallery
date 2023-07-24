const defaultState = {
    sectionId:12,
    isActive:false,
} as sectionReducer

export interface sectionReducer{
    sectionId:number;
    isActive:boolean;
}

export interface sectionAction{
    type:"ENABLE_SECTION"|"DISABLE_SECTION";
    payload:sectionReducer;
}


export const sectionReducer = (state = defaultState, action: sectionAction) => {
    switch (action.type) {
        case "ENABLE_SECTION":{
            return action.payload            
        };
        case "DISABLE_SECTION":{
            return action.payload            
        };
        default:{
            return state;
        }
    }
}