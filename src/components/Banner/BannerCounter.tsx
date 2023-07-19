import React, { useEffect, useState } from "react";

export interface BannerCounter{
    current:number,
    max:number
}

export const BannerCounter:React.FC<BannerCounter> = ({current,max}) => {
    const [currentIndex,setCurrentIndex] = useState<number>(current);

    useEffect(()=>{
        if(currentIndex !== current){
            setCurrentIndex(current);
        }
    },[current])

    return <div className="banner--index-container">
    <span className="banner--index-wrapper">
        <span className="banner--index-window" style={{transform:`translateY(-${(currentIndex/max-1/max)*100}%)`}}>
        {new Array(max).fill(1).map((el,index)=>{
            return <span key={index} className="banner--index-counter">{index+el}</span>
        })}
        </span>
    </span>
    <span className="banner--index-dash">-</span>
    <span className="banner--index-max">{max}</span>
</div>
}