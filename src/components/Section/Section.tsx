import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../reducers/combinedReducer";
import { sectionGallery } from "../loader/PhotoPreloader";
import { IoIosArrowUp } from "react-icons/io";
import { content } from "../../content";
import { HiAcademicCap, HiCode, HiCubeTransparent, HiFingerPrint, HiFire, HiGlobeAlt } from "react-icons/hi";


export const Section:React.FC = () =>{
    const [isOutside,setOutside] = useState<boolean|null>(true);
    const [scrolledPrecent,setScrolledPrecent] = useState<number>(0);
    const dispatch = useDispatch();

    const sectionState = useSelector((state:State)=>state.section);

    const data = content.filter(e=>e.id === sectionState.sectionId)[0];
    const bacgroundIndex = content.indexOf(data) 
    
    
    useEffect(()=>{
        if(sectionState.isActive === null){
            setOutside(null);
        }else{
            setOutside(!sectionState.isActive);
        }
    },[sectionState])


    
    return <section className={`section ${isOutside === null?"outside":isOutside?"slideOut":"slideIn"}`} onScroll={(event)=>{
        const element = event.target as HTMLDListElement;
        
        setScrolledPrecent(Math.min(Math.max(element.scrollTop / window.innerHeight*2)*100,100))
    }}>
        <div className="section--scroll" style={{height:scrolledPrecent+"vh"}}/>
        <div style={{backgroundImage:`url(${sectionGallery[bacgroundIndex]})`}} className="section--wrapper">
            <div className="section__content-container">
                <h1 className="section__content--title">{data.bannerTitle}</h1>
                <div className="section__content--underscore"/>
                <p className="section__content--description">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum dolore accusantium eaque inventore in quo maiores molestiae nisi laboriosam animi.
                </p>
                <div className="section__content--grid">
                    <div className="section__content--grid-item">
                        <HiAcademicCap/>
                        <span>
                            Lorem ipsum dolor sit amet.
                        </span>
                    </div>
                    <div className="section__content--grid-item">
                        <HiCode/>
                        <span>
                            Lorem ipsum dolor sit amet.
                        </span>
                    </div>
                    <div className="section__content--grid-item">
                        <HiCubeTransparent/>
                        <span>
                            Lorem ipsum dolor sit amet.
                        </span>
                    </div>
                    <div className="section__content--grid-item">
                        <HiFingerPrint/>
                        <span>
                            Lorem ipsum dolor sit amet.
                        </span>
                    </div>
                    <div className="section__content--grid-item">
                        <HiFire/>
                        <span>
                            Lorem ipsum dolor sit amet.
                        </span>
                    </div>
                    <div className="section__content--grid-item">
                        <HiGlobeAlt/>
                        <span>
                            Lorem ipsum dolor sit amet.
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div className="section--back" onClick={()=>{
            dispatch({type:"DISABLE_SECTION"})
        }}>
            <IoIosArrowUp/>
            <span>back</span>
        </div>
        <div className="section--container">
        </div>
    </section>
}