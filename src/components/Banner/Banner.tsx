import { useState } from "react";
import { Navbar } from "../Navbar";
import { BannerCounter } from "./BannerCounter";
import { BannerControls } from "./BannerControls";
import { BannerSection } from "./BannerSection";


export const Banner:React.FC = () => {
    const [slideIndex,setIndex] = useState<number>(1);
    const gallerySize = 8;
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
        {new Array(gallerySize).fill(gallerySize).map((el,index)=>{
            return <BannerSection key={index} isHidden={index+1 !== slideIndex} side={index+1>slideIndex?"right":"left"} bgIndex={index}/>
        })}

        <BannerCounter current={slideIndex} max={gallerySize}/>
    </section>
} 