import React, { useEffect, useRef, useState } from "react"
import { carouselState, gallerySize, galleryState } from "./Banner"
import { slider } from "../loader/PhotoPreloader";

export interface Carousel{
    galleryState:galleryState;
    setGalleryState:Function;
}

interface cursorPosition{
    x:number;
    y:number;
}


export const Carousel:React.FC<Carousel> = ({galleryState,setGalleryState}) => {
    const [carouselState, setCarouselState] = useState<carouselState>({
        translated: 100 / (gallerySize * 2),
        index: 1,
      });
    const [cursorPosition,setCursorPosition] = useState<cursorPosition>({x:Infinity,y:Infinity})
    const carousel = useRef<null|HTMLDivElement>(null)
    
      useEffect(()=>{
        setGalleryState((prev:galleryState)=>{return{...prev,index:carouselState.index}})
      },[carouselState.index])

    const handleMouseMove = (event:MouseEvent) =>{
        const container = carousel.current;
        if(container){
            if(container.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(container.dataset.mouseDownAt as string) - event.clientX,
                  maxDelta = container.offsetWidth;
            
            const percentage = (mouseDelta / maxDelta) * -100,
                nextPercentageUnconstrained = parseFloat(container.dataset.prevPercentage as string) + percentage;
             let nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 100/-(gallerySize*2)), -100+(100/(gallerySize*2)));
            
            
            container.dataset.percentage = nextPercentage+"";
            setCarouselState({translated:-nextPercentage,index:Math.min(Math.floor((nextPercentage+(100/-gallerySize))/(100/-gallerySize)),gallerySize)})
        }
    }
    
    const handleMouseDown = (event:React.MouseEvent) => {
        const container = carousel.current;
        if(container && galleryState.variant === "carousel"){
            container.dataset.mouseDownAt = event.clientX+"";
            container.addEventListener("mousemove",handleMouseMove)
        }
    }
    
    const handleMouseUp = () => {
        const container = carousel.current;
        
        if(container && galleryState.variant === "carousel"){
            container.dataset.mouseDownAt = "0";
            container.dataset.prevPercentage = container.dataset.percentage;
            container.removeEventListener("mousemove",handleMouseMove)
        }
    }

        window.addEventListener("mouseup",handleMouseUp);


    return <div 
            data-percentage={100/-(gallerySize*2)}
            data-mouse-down-at="0"
            data-prev-percentage="0"
            className={`carousel ${galleryState.variant === "carousel"?"active":"inactive"}`}
            ref={carousel} 
            style={{transform:`translate(-${carouselState.translated}%,-50%)`}}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>
            <div className="carousel--window" style={{marginLeft:-100/(gallerySize)+(galleryState.index/gallerySize)*100+"%"}}/>
        {new Array(gallerySize).fill(gallerySize).map((e,i)=>{
            return <div key={e+i} className={`carousel--item ${i+1 === galleryState.index?"selected":""}`}
                onMouseDown={(event:React.MouseEvent)=>{
                    setCursorPosition({x:event.clientX,y:event.clientY});
                }}
                onMouseUp={(event:React.MouseEvent)=>{
                    if(cursorPosition.x === event.clientX,cursorPosition.y === event.clientY){
                        setGalleryState({variant:"fullsize",index:i+1,withAnimation:false})
                        const percentage = -100/(gallerySize*2)+((i+1)/gallerySize)*100;
                        if(carousel.current){
                            carousel.current.dataset.percentage = -percentage+"";
                        }
                        setCarouselState({translated:percentage,index:i+1})
                    }
                }}
>
                <img 
                draggable={false} 
                style={{objectPosition:`${carouselState.translated}% center`}} 
                src={slider[i]}/>
            </div>
        })}
    </div>
}