import { galery } from "./PhotoPreloader";

export interface LoaderColumn{
    variant?:"straight"|"reverse",
    hasMain?:boolean,
    galeryIndex:1|2|3,
}

export const LoaderColumn:React.FC<LoaderColumn> = ({variant = "straight",hasMain=false,galeryIndex})=>{
     
    return <section className={`loader--container ${variant}`}>
            <div className={`loader__floating--wrapper ${hasMain?"center":""}`} id="">
                <img src={galery[galeryIndex*4-4]} className={`loader__floating--item ${hasMain?"sideUpperTopSlide":"margin-grow"}`}/>
            </div>
            <div className={`loader__floating--wrapper ${hasMain?"center":""}`}>
                <img src={galery[galeryIndex*4-3]} className={`loader__floating--item ${hasMain?"sideMainTop":"margin-grow"}`}/>
            </div>
            <div className={`loader__floating--wrapper ${hasMain?"center":""}`}>
                <img src={galery[galeryIndex*4-2]} className={`loader__floating--item ${hasMain?"main":"margin-grow"}`}/>
            </div>
            <div className={`loader__floating--wrapper ${hasMain?"center":""}`}>
                <img src={galery[galeryIndex*4-1]} className={`loader__floating--item ${hasMain?"sideMainBottom":"margin-grow"}`}/>
            </div>
    </section>
}