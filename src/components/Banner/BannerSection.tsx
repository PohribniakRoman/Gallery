import { slider } from "../loader/PhotoPreloader"

export interface BannerSection{
    bgIndex:number;
    isHidden:boolean;
    side?:"right"|"left";
}

export const BannerSection:React.FC<BannerSection> = ({bgIndex,isHidden,side = "left"}) => {
    
    return  <section className={`banner--section ${isHidden?`hidden ${side}`:""}`}>
        <div className="banner--background-wrapper">
            <img src={slider[bgIndex]} className="banner--background-img"/>
        </div>
        <div className="banner--section-container">
            <h1 className="banner--section-title showUp">Front-end Developer</h1>
        </div>
    </section>
}