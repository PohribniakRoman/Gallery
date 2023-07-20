import { useState,useRef, useEffect } from "react";
import { Navbar } from "../Navbar";
import { BannerCounter } from "./BannerCounter";
import { BannerControls } from "./BannerControls";
import { BannerSection } from "./BannerSection";


export interface galleryState{
    variant:"carousel"|"fullsize";
    index:number;
    withAnimation:boolean;
}
interface carouselState{
    translated:number;
}

export const Banner:React.FC = () => {
    const [galleryState,setGalleryState] = useState<galleryState>({variant:"fullsize",index:1,withAnimation:false});    
    const gallerySize = 8;
    const carousel = useRef<null|HTMLDivElement>(null)
    const [carouselState,setCarouselState] = useState<carouselState>({translated:0})
    const wheelhandler = () =>{
        setGalleryState({...galleryState,variant:"carousel",withAnimation:true});
    }

    const handleMouseMove = (event:MouseEvent) =>{
        const container = carousel.current;
        if(container){
            if(container.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(container.dataset.mouseDownAt as string) - event.clientX,
                  maxDelta = container.offsetWidth;
            
            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(container.dataset.prevPercentage as string) + percentage,
                nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

            container.dataset.percentage = nextPercentage+"";
            setCarouselState({translated:-nextPercentage})
        }
    }

    const handleMouseDown = (event:React.MouseEvent) => {
        const container = carousel.current;
        if(container){
            container.dataset.mouseDownAt = event.clientX+"";
            container.addEventListener("mousemove",handleMouseMove)
        }
    }

    const handleMouseUp = () => {
        const container = carousel.current;
        
        if(container){
            container.dataset.mouseDownAt = "0";
            container.dataset.prevPercentage = container.dataset.percentage;
            container.removeEventListener("mousemove",handleMouseMove)
        }
    }

    useEffect(()=>{
        if(carousel.current && !galleryState.withAnimation){
            window.addEventListener("wheel",wheelhandler)
        }else{
            window.removeEventListener("wheel",wheelhandler)
        }
    },[galleryState])

    window.addEventListener("mouseup",handleMouseUp);

    return <section className="banner">
        <Navbar/>
        {galleryState.variant === "carousel"?<></>:<>
            <BannerControls max={gallerySize} variant="left"  onClick={()=>{
                if(galleryState.index<8){
                    setGalleryState({...galleryState,index:galleryState.index+1});
                }}}/>
            <BannerControls max={gallerySize} variant="right" onClick={()=>{
                if(galleryState.index>1){
                    setGalleryState({...galleryState,index:galleryState.index-1});
                }}}/>
        </>}
        <div 
            ref={carousel} 
            data-percentage="0"
            data-mouse-down-at="0"
            data-prev-percentage="0"
            style={{transform:`translate(-${carouselState.translated}%,-25vh)`}}
            className={`carousel--container ${galleryState.variant === "carousel"?"active":"inactive"}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>
            {new Array(gallerySize).fill(gallerySize).map((el,index)=>{
                return <BannerSection 
                            key={el+index}            
                            translated={carouselState.translated} 
                            galleryState={galleryState} 
                            setGalleryState={setGalleryState}
                            isHidden={index+1 !== galleryState.index}
                            side={index+1>galleryState.index?"right":"left"}
                            bgIndex={index}/>
            })}
            <div className="banner--shadow"/>
        </div>

        <BannerCounter current={galleryState.index} max={gallerySize}/>
    </section>
} 