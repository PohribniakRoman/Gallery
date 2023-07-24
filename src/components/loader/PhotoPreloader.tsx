import photo1 from "../../assets/loader/1.jpg";
import photo2 from "../../assets/loader/2.jpg";
import photo3 from "../../assets/loader/3.jpg";
import photo4 from "../../assets/loader/4.jpg";
import photo5 from "../../assets/loader/5.jpg";
import photo6 from "../../assets/loader/6.jpg";
import photo7 from "../../assets/loader/7.jpg";
import photo8 from "../../assets/loader/8.jpg";
import photo9 from "../../assets/loader/9.jpg";
import section1 from "../../assets/section/1.jpg";
import section3 from "../../assets/section/3.jpg";
import slider1 from "../../assets/slider/1.jpg";
import slider2 from "../../assets/slider/2.jpg";
import slider3 from "../../assets/slider/3.jpg";
import slider4 from "../../assets/slider/4.jpg";
import slider5 from "../../assets/slider/5.jpg";
import slider6 from "../../assets/slider/6.jpg";
import slider7 from "../../assets/slider/7.jpg";
import photo10 from "../../assets/loader/10.jpg";
import photo11 from "../../assets/loader/11.jpg";
import photo12 from "../../assets/loader/12.jpg";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { State } from "../../reducers/combinedReducer";


export const galery = [
    photo1,photo2,photo3,photo4,
    photo11,photo12,photo8,photo10,
    photo5,photo7,photo6,photo9
]

export const slider = [
    photo6,slider1,slider2,slider3,slider4,slider5,slider6,slider7
]

export const sectionGallery = [
    section1,section3
] 


export const PhotoPreloader:React.FC = () => {
    const [loadedPrecent,setLoadedPrecent] = useState<number>(0);
    const preloaderState = useSelector((state:State)=>state.loader);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(loadedPrecent === galery.length+slider.length+sectionGallery.length && !preloaderState.loaded){
            dispatch({type:"SET_LOADING",payload:true});
        }
    },[loadedPrecent])
    
    return <section className="loader preloader">
        {galery.map(img=>{
            return <img key={img} width={300} height={300} onLoad={()=>{setLoadedPrecent(prev=>prev+1)}} src={img}/>
        })}
        {slider.map(img=>{
            return <img key={img} width={300} height={300} onLoad={()=>{setLoadedPrecent(prev=>prev+1)}} src={img}/>
        })}
        {sectionGallery.map(img=>{
            return <img key={img} width={300} height={300} onLoad={()=>{setLoadedPrecent(prev=>prev+1)}} src={img}/>
        })}
        <p>
            {Math.round((loadedPrecent/(galery.length + slider.length + sectionGallery.length))*100)}%
        </p>
    </section>
}