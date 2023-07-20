import { useState,useRef, useEffect } from "react";
import { Navbar } from "../Navbar";
import { BannerCounter } from "./BannerCounter";
import { BannerControls } from "./BannerControls";
import { BannerSection } from "./BannerSection";


export const Banner:React.FC = () => {
    const [slideIndex,setIndex] = useState<number>(1);
    const [galleryState,setGalleryState] = useState<"carousel"|"fullsize">("fullsize");    
    const gallerySize = 8;
    const carousel = useRef<null|HTMLDivElement>(null)

    useEffect(()=>{
        if(carousel.current){
            window.addEventListener("wheel",()=>{
                setGalleryState("carousel");
            })
        }
    },[])



    return <section className="banner">
        <Navbar/>
        <BannerControls max={gallerySize} variant="left"  onClick={()=>{
            if(slideIndex<8){
                setIndex(slideIndex+1)

            }}}/>
        <BannerControls max={gallerySize} variant="right" onClick={()=>{
            if(slideIndex>1){
                setIndex(slideIndex-1)
            }}}/>
        <div ref={carousel} className={`carousel--container ${galleryState === "carousel"?"active":"inactive"}`}>
            {new Array(gallerySize).fill(gallerySize).map((el,index)=>{
                return <BannerSection galleryState={galleryState} setGalleryState={setGalleryState}  key={el+index} isHidden={index+1 !== slideIndex} side={index+1>slideIndex?"right":"left"} bgIndex={index}/>
            })}
        </div>

        <BannerCounter current={slideIndex} max={gallerySize}/>
    </section>
} 