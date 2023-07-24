import { useEffect } from "react";
import { slider } from "../loader/PhotoPreloader"
import { galleryState } from "./Banner";
import { Counter } from "../Counter";
import { useDispatch } from "react-redux";
import { content } from "../../content";

export interface BannerSection{
    bgIndex:number;
    isHidden:boolean;
    side?:"right"|"left";
    galleryState:galleryState;
    setGalleryState:Function;
}



export const BannerSection:React.FC<BannerSection> = ({setGalleryState,bgIndex,galleryState,isHidden,side = "left"}) => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(!galleryState.withAnimation){
            setTimeout(()=>setGalleryState((prev:galleryState)=>{return{...prev,withAnimation:true}}),1000);
        }
    },[galleryState])
    
    return  <section className={`banner--section ${galleryState.variant==="carousel"?"":"transition"} ${isHidden?`hidden ${side} ${galleryState.withAnimation?"":"none-visibility"}`:""}`}>
            <img draggable={false} src={slider[bgIndex]} className="banner--background-img"/>
            <div className="banner--section-container">
                <h1 className="banner--section-title showUp" onClick={()=>{
                    dispatch({type:"ENABLE_SECTION",payload:{isActive:true,sectionId:content[bgIndex].id}})
                }}>{content[bgIndex].bannerTitle}</h1>
                <p className="banner--section-id"><Counter deley={4000} value={content[bgIndex].id}/></p>
            </div>
    </section>
}