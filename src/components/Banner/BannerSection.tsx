import { useEffect } from "react";
import { slider } from "../loader/PhotoPreloader"
import { galleryState } from "./Banner";

export interface BannerSection{
    bgIndex:number;
    isHidden:boolean;
    side?:"right"|"left";
    galleryState:galleryState;
    setGalleryState:Function;
}

export const BannerSection:React.FC<BannerSection> = ({setGalleryState,bgIndex,galleryState,isHidden,side = "left"}) => {
    useEffect(()=>{
        if(!galleryState.withAnimation){
            setTimeout(()=>setGalleryState((prev:galleryState)=>{return{...prev,withAnimation:true}}),1000);
        }
    },[galleryState])
    
    return  <section 
                className={`banner--section ${galleryState.variant==="carousel"?"":"transition"} ${isHidden?`hidden ${side} ${galleryState.withAnimation?"":"none-visibility"}`:""}`}>
            <img draggable={false} src={slider[bgIndex]} className="banner--background-img"/>
        <div className="banner--section-container">
            <h1 className="banner--section-title showUp">Front-end Developer</h1>
        </div>
    </section>
}