import { AiOutlinePlus } from "react-icons/ai";
import {useState} from "react";

export interface BannerControls{
    variant:"right"|"left",
    onClick:Function,
    max:number
}

interface rotateState{
   left:number;
   right:number; 
   slide:number;
}

let rotateState = {left:0,right:0,slide:1};

export const BannerControls:React.FC<BannerControls> = ({variant,onClick,max}) =>{
   return <>
    {variant === "left"
    ?<div className="banner--swap right" onClick={()=>{
        if(rotateState.slide<max){
            rotateState = {...rotateState,right:rotateState.right+1,slide:rotateState.slide+1}
        }
        onClick()
    }}>
        <AiOutlinePlus style={{rotate:`${rotateState.right}turn`}}/>
    </div>
    :<div className="banner--swap left" onClick={()=>{
        if(rotateState.slide>1){
            rotateState = {...rotateState,left:rotateState.left+1,slide:rotateState.slide-1}
        }
        onClick()
    }}>
        <AiOutlinePlus style={{rotate:`-${rotateState.left}turn`}}/>
    </div>}
    </>
}