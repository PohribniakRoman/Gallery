import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../reducers/combinedReducer";
import { sectionGallery } from "../loader/PhotoPreloader";
import { IoIosArrowUp } from "react-icons/io";
import { content } from "../../content";


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
            <h1 className="section--title">{data.bannerTitle}</h1>
        </div>
        <div className="section--back" onClick={()=>{
            dispatch({type:"DISABLE_SECTION"})
        }}>
            <IoIosArrowUp/>
            <span>back</span>
        </div>
        <div className="section--container">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet a porro temporibus accusantium tempore inventore eum optio vel est perferendis at assumenda eos maiores, saepe veritatis asperiores adipisci. Nemo eaque voluptatum dolorem, reprehenderit ullam animi? Sint, ullam ad. At cupiditate molestiae, consequuntur totam numquam consectetur quas tempora porro repellat, officia perferendis dolore culpa quibusdam corporis iusto distinctio esse fugiat. Aliquam eaque ipsam quibusdam cupiditate earum! Incidunt facere nobis, adipisci beatae eveniet dolore maiores quas, aut velit commodi eius aperiam reiciendis blanditiis voluptate necessitatibus laborum odit in quaerat dolorum nemo tempora eos, odio consectetur suscipit? Magnam molestiae iste asperiores enim deserunt, maiores quae accusamus aspernatur. Dolorum odio placeat rerum, corporis accusantium officia neque ex sapiente voluptatum ducimus incidunt culpa id earum reiciendis tempora facilis totam sunt soluta ratione, aliquid delectus! Hic, autem, ex cum consectetur quasi alias aut voluptatum, distinctio ducimus dolorum in omnis odio officiis illo exercitationem quo repellendus ipsum harum quos molestiae. Quae soluta incidunt deleniti ab, dicta est quibusdam voluptate omnis fuga unde corrupti aliquam, perferendis quidem beatae minima nisi explicabo maxime, laudantium fugit iste doloremque repellat magni? Enim nihil aspernatur cumque a obcaecati asperiores! Deserunt facere magnam blanditiis quo repellendus at, suscipit, sed quam quod natus beatae dolorem minus molestias saepe corrupti maxime voluptate dolore architecto sunt unde ipsum repudiandae odit? Aperiam cum, voluptas libero officiis ipsa excepturi quas atque accusantium delectus sit, amet quo exercitationem sapiente fugit voluptatum assumenda repellendus enim fugiat dicta cumque magni. Optio eius aliquid quis similique, necessitatibus corporis illum, consequuntur maxime sequi consequatur facilis iusto nesciunt. Neque cupiditate ipsam officiis ea in et obcaecati placeat, non eum deleniti incidunt excepturi adipisci blanditiis, minima totam alias ipsum laboriosam ut magni? Officia praesentium doloremque itaque distinctio perferendis, delectus et alias vitae eos. Consectetur earum iusto molestiae voluptatibus iste dolore magni, hic aperiam nobis aut. Ipsum deserunt dolores ipsam sapiente sed alias molestiae delectus rerum velit. Adipisci soluta, placeat sapiente dignissimos hic sit laboriosam mollitia quisquam consectetur praesentium cumque illo quod nemo error impedit rerum inventore, porro ipsum reprehenderit, aut ea unde numquam. Dignissimos saepe voluptates nulla quasi mollitia minima necessitatibus animi eos pariatur vel, et inventore cupiditate architecto veritatis. Distinctio exercitationem atque sit. Et excepturi earum maxime saepe, enim nihil. Totam mollitia numquam molestias esse quia eveniet quam reprehenderit blanditiis sint, aut libero. Ab praesentium excepturi dicta alias quibusdam ratione ipsam exercitationem sapiente nobis, a quam aut qui veritatis iste molestiae magnam mollitia aliquid. Tenetur obcaecati maiores harum porro eligendi commodi ut dolorum explicabo beatae, odio atque pariatur, veniam minus ducimus numquam nihil placeat deleniti laudantium labore id, unde impedit iste fugiat alias! Omnis, alias cum necessitatibus deleniti accusantium unde fugiat delectus modi maiores exercitationem amet. Unde, esse quasi? Quibusdam et qui possimus iste? Excepturi vero ullam repellendus nostrum architecto molestiae consectetur commodi! Suscipit officia dignissimos quos, at nemo voluptatum voluptatem quisquam nobis deleniti cupiditate aut deserunt nostrum unde, omnis voluptate corrupti? Deserunt aperiam perspiciatis ex, aliquid facilis animi, doloremque cumque iste labore accusamus, rem expedita eligendi nam quas repudiandae molestiae pariatur commodi veritatis error. Ipsa, possimus et. Hic vitae corrupti nisi labore tenetur, dolore quos pariatur harum tempore voluptas modi odit, maiores quaerat saepe molestias fugiat nulla consectetur officiis esse nobis repellat, itaque tempora vero ad. Voluptatibus sed at autem aliquid provident earum ipsa repellat suscipit in, ex debitis, fugiat tempore modi rem repudiandae nulla voluptatem ipsam odio, pariatur iste sint nobis praesentium obcaecati. Possimus aliquid deserunt, dolore provident odit optio saepe laborum aperiam voluptate repellendus totam neque quidem amet commodi necessitatibus at enim eveniet omnis. Maiores provident nam commodi a iusto delectus exercitationem totam dolorum quas amet. Corporis quasi voluptatibus libero hic nemo, totam fugit mollitia architecto iure quo ipsam consectetur tempora. Ullam officia voluptatibus velit deleniti. Quibusdam nostrum ab deserunt. Laboriosam sapiente labore atque, dicta adipisci magnam consectetur facere voluptates dignissimos sit ullam vitae autem, nam voluptatem similique! Eum nulla suscipit eius reprehenderit tempora eaque. Harum ab inventore deserunt deleniti consequuntur eaque provident nobis, nemo ducimus repudiandae impedit dignissimos beatae et quod excepturi eos? Similique consectetur perferendis eligendi, atque quo adipisci possimus earum, reiciendis voluptatibus saepe distinctio illum ullam, voluptas doloribus obcaecati. Fugiat dolorum fugit sapiente unde minus quidem, molestias cumque dicta culpa molestiae reiciendis veniam eos at, hic quia expedita animi, blanditiis ipsum accusantium aliquid quibusdam tempore perferendis quaerat. Ab ut velit exercitationem nemo aspernatur at porro excepturi quae asperiores soluta eligendi accusantium nobis alias, maiores, ex repudiandae hic officiis tenetur laboriosam consequatur numquam amet iusto. Nemo expedita illo reiciendis enim quidem a debitis recusandae est voluptates obcaecati porro magnam nam hic dicta tenetur aliquam ab, veniam at consectetur velit ipsam animi corporis et ex! Harum nihil tenetur ipsam hic, voluptas, repudiandae et, perferendis incidunt reiciendis aperiam at nobis corrupti quasi porro maxime ut? Exercitationem inventore esse necessitatibus, suscipit, assumenda praesentium ut tenetur placeat provident quae fuga. Eum quisquam eveniet maxime optio animi deserunt. Dolore aperiam cumque omnis incidunt. Odio nesciunt beatae minima voluptatibus itaque autem praesentium quisquam ex unde! Itaque maxime, sunt inventore dolores minus aut et quis quos magni excepturi optio quia ad? Aperiam praesentium facilis eveniet laboriosam esse, iusto placeat recusandae hic est, id repudiandae consectetur pariatur qui voluptates a eius neque perferendis accusantium delectus ullam, corporis porro suscipit? Magnam laborum autem ipsa at maiores nulla optio tenetur unde ducimus doloremque ratione, deserunt cupiditate molestiae ipsam reprehenderit laboriosam a cumque ea quae consequuntur amet, quos cum temporibus repellat. Debitis officia voluptatibus repellendus consequatur aliquam quia expedita mollitia, eveniet, quasi alias impedit adipisci quod, molestias dicta quibusdam ipsam neque soluta. At repudiandae ut illum rerum nemo temporibus repellat amet, nobis quisquam exercitationem quidem, omnis esse labore tenetur? Quisquam fugiat cupiditate labore tenetur asperiores non! Cupiditate ab natus, quos nihil corrupti dolores ipsam expedita iure ea quaerat voluptatum architecto, sapiente eaque aut, quisquam explicabo nulla nisi perferendis voluptatem. Enim, similique corporis, tempore nostrum rem libero rerum quas, consequuntur in quod fuga sed qui nemo odit earum! Odit exercitationem quasi deserunt, dicta dignissimos repellat culpa sequi eveniet omnis cum quibusdam. Maxime molestias nam, temporibus maiores voluptates obcaecati quos error deserunt.</p>
        </div>
    </section>
}