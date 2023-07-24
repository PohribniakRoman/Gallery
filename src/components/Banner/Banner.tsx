import { useState, useEffect } from "react";
import { Navbar } from "../Navbar";
import { BannerCounter } from "./BannerCounter";
import { BannerControls } from "./BannerControls";
import { BannerSection } from "./BannerSection";
import { AiOutlinePlus } from "react-icons/ai";
import { Carousel } from "./Carousel";
import { useSelector } from "react-redux";
import { State } from "../../reducers/combinedReducer";


export interface galleryState{
    variant:"carousel"|"fullsize";
    index:number;
    withAnimation:boolean;
}

export interface carouselState{
    translated:number;
    index:number;
}

export const gallerySize = 8;

export const Banner:React.FC = () => {
    const [galleryState,setGalleryState] = useState<galleryState>({variant:"fullsize",index:1,withAnimation:false});    
    const [carouselState,setCarouselState] = useState<carouselState>({translated:100/(gallerySize*2),index:galleryState.index})
    const [isOutside,setOutside] = useState<boolean>(false);
    const isActive = useSelector((state:State)=>state.section.isActive);
    
    useEffect(()=>{
        setOutside(isActive);
        if(isActive){
            window.removeEventListener("wheel",wheelhandler)
        }
        setGalleryState({...galleryState,withAnimation:false})
    },[isActive])


    const wheelhandler = () =>{
        setGalleryState({...galleryState,variant:"carousel",withAnimation:true});
    }
    

    useEffect(()=>{
        if(galleryState.variant === "fullsize" && !galleryState.withAnimation){
            window.addEventListener("wheel",wheelhandler)
        }else{
            window.removeEventListener("wheel",wheelhandler)
        }
    },[galleryState])
    
    useEffect(()=>{
        setGalleryState({...galleryState,index:carouselState.index})
    },[carouselState])
    

    return <section className={`banner ${isOutside?"outside":""}`}>
        <Navbar/>
        {galleryState.variant === "carousel"?<>
            <div className="carousel--cross">
                <AiOutlinePlus/>
            </div>
        </>:<>
            <BannerControls max={gallerySize} variant="left"  onClick={()=>{
                if(galleryState.index<8){
                    setGalleryState({...galleryState,index:galleryState.index+1});
                }}}/>
            <BannerControls max={gallerySize} variant="right" onClick={()=>{
                if(galleryState.index>1){
                    setGalleryState({...galleryState,index:galleryState.index-1});
                }}}/>
        </>}
            <div className={`banner--fullsize ${galleryState.variant === "carousel"?"inactive":""}`}>
                {new Array(gallerySize).fill(gallerySize).map((el,index)=>{
                    return <BannerSection 
                    key={el+index}            
                    galleryState={galleryState} 
                    setGalleryState={setGalleryState}
                    isHidden={index+1 !== galleryState.index}
                    side={index+1>galleryState.index?"right":"left"}
                    bgIndex={index}/>
                })}
            </div>
            <Carousel 
                setGalleryState={setGalleryState}
                galleryState={galleryState}
                carouselState={carouselState} 
                setCarouselState={setCarouselState}/>
        { 
            galleryState.variant === "carousel"
            ?<BannerCounter current={carouselState.index} max={gallerySize}/>
            :<BannerCounter current={galleryState.index} max={gallerySize}/>
        }
    </section>
} 