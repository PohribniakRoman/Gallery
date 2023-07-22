import { MouseEvent, useEffect, useState } from "react";
import { slider } from "../loader/PhotoPreloader"
import { galleryState } from "./Banner";

export interface BannerSection{
    bgIndex:number;
    isHidden:boolean;
    side?:"right"|"left";
    galleryState:galleryState;
    setGalleryState:Function;
    translated:number;
}

interface cursorPosition{
    x:number;
    y:number;
}

export const BannerSection:React.FC<BannerSection> = ({translated,setGalleryState,bgIndex,galleryState,isHidden,side = "left"}) => {
    const [cursorPosition,setCursorPosition]=useState<cursorPosition>({x:-1,y:-1})
    useEffect(()=>{
        if(!galleryState.withAnimation){
            setTimeout(()=>setGalleryState((prev:galleryState)=>{return{...prev,withAnimation:true}}),1000);
        }
    },[galleryState])
    
    return  <section 
                className={`banner--section ${galleryState.variant} ${galleryState.variant==="carousel"?"":"transition"} ${isHidden?`hidden ${side} ${galleryState.withAnimation?"":"none-visibility"}`:""}`} 
                onMouseDown={(event:MouseEvent)=>{
                    setCursorPosition({x:event.clientX,y:event.clientY});
                }}
                onMouseUp={(event:MouseEvent)=>{
                    if(galleryState.variant==="carousel" && cursorPosition.x === event.clientX && cursorPosition.y === event.clientY){
                        setGalleryState({variant:"fullsize",index:bgIndex+1,withAnimation:false});
                    }else{
                        setCursorPosition({x:-1,y:-1});
                    }
                }}
              >
            <img draggable={false} style={{objectPosition:`${translated}% center`}} src={slider[bgIndex]} className="banner--background-img"/>
        <div className="banner--section-container">
            <h1 className="banner--section-title showUp">Front-end Developer</h1>
        </div>
    </section>
}