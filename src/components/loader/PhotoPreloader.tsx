import photo1 from "../../assets/loader/1.jpg";
import photo2 from "../../assets/loader/2.jpg";
import photo3 from "../../assets/loader/3.jpg";
import photo4 from "../../assets/loader/4.jpg";
import photo5 from "../../assets/loader/5.jpg";
import photo6 from "../../assets/loader/6.jpg";
import photo7 from "../../assets/loader/7.jpg";
import photo8 from "../../assets/loader/8.jpg";
import photo9 from "../../assets/loader/9.jpg";
import photo10 from "../../assets/loader/10.jpg";
import photo11 from "../../assets/loader/11.jpg";
import photo12 from "../../assets/loader/12.jpg";
import { useState,useRef } from "react";
import { Loader } from "./Loader";

export const galery = [
    photo1,photo2,photo3,photo4,
    photo11,photo12,photo8,photo10,
    photo5,photo7,photo6,photo9
]

export interface PhotoPreloader{
    Element:React.FC<Loader>
}

export const PhotoPreloader:React.FC<PhotoPreloader> = ({Element}) => {
    const [loadedPrecent,setLoadedPrecent] = useState<number>(0);
    const galeryPhotos = useRef<null>(null)
    return <>
    {loadedPrecent !== galery.length+1?
        <section ref={galeryPhotos} className="loader preloader">
        <img className="none" onLoad={()=>{setLoadedPrecent(prev=>prev+1)}} src={photo6}/>
        {galery.map(img=>{
            return <img key={img} className="none" onLoad={()=>{setLoadedPrecent(prev=>prev+1)}} src={img}/>
        })}

        <p>
            {Math.round((loadedPrecent/galery.length)*100)}%
        </p>
    </section>:<Element galery={galeryPhotos.current}/>}
    </>
}