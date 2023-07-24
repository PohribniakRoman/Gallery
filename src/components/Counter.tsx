import { useEffect, useState,useRef } from "react"

export interface CounterInterface {
    value?:number,
    deley?:number
}


export const Counter:React.FC<CounterInterface> = ({value = 0,deley = 0}) =>{
    const [currentValue,setCurrentValue]= useState<number>(0);
    const once = useRef<boolean>(true);
    
    useEffect(()=>{
        setTimeout(()=>{
                once.current = true;
                const timming = ((value/Math.abs(value-currentValue))*50);
                const count = setInterval(()=>{
                    if(currentValue !== value){
                    value > currentValue
                    ?setCurrentValue(currentValue+1)
                    :setCurrentValue(currentValue-1);
                }
                clearInterval(count)
                },timming)
        },once.current?0:deley)
    },[value,currentValue])
    
    return <span className="counter">{currentValue}</span>
}