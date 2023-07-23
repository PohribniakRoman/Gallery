import React, { useRef, useEffect, useState } from "react"
import { carouselState, gallerySize, galleryState } from "./Banner"
import { slider } from "../loader/PhotoPreloader";

export interface Carousel{
    galleryState:galleryState;
    setCarouselState:Function;
    carouselState:carouselState;
    setGalleryState:Function;
}

interface cursorPosition{
    x:number;
    y:number;
}


export const Carousel:React.FC<Carousel> = ({galleryState,setCarouselState,carouselState,setGalleryState}) => {
    const [cursorPosition,setCursorPosition] = useState<cursorPosition>({x:Infinity,y:Infinity})
    const carousel = useRef<null|HTMLDivElement>(null)
    
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

    const wheelHandler = (e:WheelEvent) =>{
        setCarouselState((prev:carouselState)=>{
            const nextPercentage = Math.max(Math.min((-prev.translated)-e.deltaY/90, 100/-(gallerySize*2)), -100+(100/(gallerySize*2)));
            const index = Math.min(Math.floor((nextPercentage+(100/-gallerySize))/(100/-gallerySize)),gallerySize);
            return{translated:-nextPercentage,index}})
        }
        
        window.addEventListener("mouseup",handleMouseUp);
        useEffect(()=>{
        if(galleryState.variant === "carousel"){
            window.addEventListener("wheel",wheelHandler);
        }else{
            window.removeEventListener("wheel",wheelHandler);
        }
    },[galleryState.variant])


    return <div 
            data-percentage={100/-(gallerySize*2)}
            data-mouse-down-at="0"
            data-prev-percentage="0"
            className={`carousel ${galleryState.variant === "carousel"?"active":"inactive"}`}
            ref={carousel} 
            style={{transform:`translate(-${carouselState.translated}%,-25vh)`}}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}>
        {new Array(gallerySize).fill(gallerySize).map((e,i)=>{
            return <div key={e+i} className="carousel--item"
                onMouseDown={(event:React.MouseEvent)=>{
                    setCursorPosition({x:event.clientX,y:event.clientY});
                }}
                onMouseUp={(event:React.MouseEvent)=>{
                    if(cursorPosition.x === event.clientX,cursorPosition.y === event.clientY){
                        setGalleryState((prev:galleryState)=>{return{...prev,variant:"fullsize",index:i+1}})
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