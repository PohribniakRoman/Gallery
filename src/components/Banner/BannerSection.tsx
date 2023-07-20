import { useEffect } from "react";
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

export const BannerSection:React.FC<BannerSection> = ({translated,setGalleryState,bgIndex,galleryState,isHidden,side = "left"}) => {
    useEffect(()=>{
        if(!galleryState.withAnimation){
            setTimeout(()=>setGalleryState((prev:galleryState)=>{return{...prev,withAnimation:true}}),1000);
        }
    },[galleryState])
    
    return  <section 
                className={`banner--section ${galleryState.variant} ${isHidden?`hidden ${side} ${galleryState.withAnimation?"":"none-visibility"}`:""}`} 
                onClick={()=>{
                    if(galleryState.variant==="carousel"){
                        setGalleryState({variant:"fullsize",index:bgIndex+1,withAnimation:false});
                    }
                }}
              >
            <img draggable={false} style={{objectPosition:`${translated}% center`}} src={slider[bgIndex]} className="banner--background-img"/>
        <div className="banner--section-container">
            <h1 className="banner--section-title showUp">Front-end Developer</h1>
        </div>
    </section>
}