import { useEffect, useState } from "react";
import { slider } from "../loader/PhotoPreloader"

export interface BannerSection{
    bgIndex:number;
    isHidden:boolean;
    side?:"right"|"left";
    galleryState:"carousel"|"fullsize";
    setGalleryState:Function;
}

export const BannerSection:React.FC<BannerSection> = ({bgIndex,galleryState,isHidden,side = "left"}) => {
    const [loaded,setLoaded] = useState<boolean>(false);
    useEffect(()=>{
        if(!loaded){
            setTimeout(()=>setLoaded(true),1000);
        }
    },[])
    
    return  <section className={`banner--section ${galleryState} ${isHidden?`hidden ${side} ${loaded?"":"none-visibility"}`:""}`}>
        <div className="banner--background-wrapper">
            <img src={slider[bgIndex]} className="banner--background-img"/>
        </div>
        <div className="banner--section-container">
            <h1 className="banner--section-title showUp">Front-end Developer</h1>
        </div>
    </section>
}